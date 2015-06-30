package no.bekk.hendelse.db;

import no.bekk.hendelse.domain.Hendelse;
import no.bekk.hendelse.domain.Henvendelse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemoryDatabase implements Database {

    private final Map<String, Henvendelse> store = new HashMap<>();

    @Override
    public List<Henvendelse> getAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Henvendelse getHenvendelse(String behandlingsId) {
        return store.get(behandlingsId);
    }

    @Override
    public Henvendelse addHendelse(Hendelse hendelse) {
        Henvendelse henvendelse;
        String behandlingsId = hendelse.getBehandlingsId();
        if (store.containsKey(behandlingsId)) {
            henvendelse = store.get(behandlingsId);
            henvendelse.hendelseList.add(hendelse);
            return henvendelse;
        } else {
            henvendelse = new Henvendelse(behandlingsId);
            henvendelse.hendelseList.add(hendelse);
            store.put(behandlingsId, henvendelse);
        }
        return henvendelse;
    }
}
