package no.bekk.hendelse.db;

import clojure.lang.PersistentVector;
import datomic.Connection;
import datomic.Entity;
import datomic.Peer;
import datomic.Util;
import no.bekk.hendelse.App;
import no.bekk.hendelse.domain.Hendelse;
import no.bekk.hendelse.domain.Henvendelse;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;

@Service
public class Datomic implements Database {
    @Override
    public List<Henvendelse> getAll() {
        Connection conn = Peer.connect(App.DATOMIC_URI);
        datomic.Database db = conn.db();
        Object results = Peer.query("[:find ?e ?tx-time ?v :where [?e :henvendelse/behandlingsId ?v ?tx _] [?tx :db/txInstant ?tx-time]]", db);

        Map<Object, List<PersistentVector>> grouped = ((Set<PersistentVector>) results).stream()
                .collect(groupingBy(pv -> pv.nth(2)));

        return grouped.values().stream().map(pv -> {
            String behandlingsId = (String) pv.get(0).nth(2);
            Henvendelse henvendelse = new Henvendelse(behandlingsId);
            List<Hendelse> hendelser = pv.stream().map(vector -> {
                Instant time = Instant.ofEpochMilli(((Date) vector.get(1)).getTime());
                Entity entity = db.entity(vector.nth(0));
                String type = (String) entity.get(":henvendelse/type");
                String value = (String) entity.get(":henvendelse/value");
                return new Hendelse().setBehandlingsId(behandlingsId).setType(type).setValue(value).setTime(time);

            }).sorted((h1, h2) -> h2.getTime().compareTo(h1.getTime()))
                .collect(toList());
            henvendelse.hendelseList.addAll(hendelser);
            return henvendelse;
        }).collect(toList());
    }

    @Override
    public Henvendelse addHendelse(Hendelse hendelse) {
        Connection conn = Peer.connect(App.DATOMIC_URI);

        Object id = Peer.tempid(":db.part/user");
        List tx = Util.list(Util.map(
                ":db/id", id,
                ":henvendelse/behandlingsId", hendelse.getBehandlingsId(),
                ":henvendelse/type", hendelse.getType(),
                ":henvendelse/value", hendelse.getValue()
        ));
        conn.transact(tx);

        return getAll().stream().filter(h -> h.behandlingsId.equals(hendelse.getBehandlingsId())).findAny().get();

    }

}
