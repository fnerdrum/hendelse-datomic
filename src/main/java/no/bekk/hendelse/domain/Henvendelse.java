package no.bekk.hendelse.domain;

import java.util.ArrayList;
import java.util.List;

public class Henvendelse {
    public final String behandlingsId;
    public final List<Hendelse> hendelseList = new ArrayList<>();

    public Henvendelse(String behandlingsId) {
        this.behandlingsId = behandlingsId;
    }
}
