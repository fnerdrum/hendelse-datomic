package no.bekk.hendelse.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static java.util.Comparator.comparing;

public class Henvendelse {
    public final String behandlingsId;
    public final List<Hendelse> hendelseList = new ArrayList<>();

    public Henvendelse(String behandlingsId) {
        this.behandlingsId = behandlingsId;
    }

    public Instant getLastUpdate() {
        return hendelseList.stream()
                .max(comparing(Hendelse::getTime))
                .get().getTime();
    }

}
