package no.bekk.hendelse.domain;


import java.time.Instant;

public class Hendelse {

    public final String behandlingsId, type, value;
    public final Instant time;

    public Hendelse(String behandlingsId, String type, String value) {
        this.behandlingsId = behandlingsId;
        this.type = type;
        this.value = value;
        this.time = Instant.now();
    }
}
