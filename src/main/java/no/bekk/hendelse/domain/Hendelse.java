package no.bekk.hendelse.domain;

import java.time.Instant;

public class Hendelse {

    private String behandlingsId, type, value;
    private Instant time = Instant.now();

    public String getBehandlingsId() {
        return behandlingsId;
    }

    public Hendelse setBehandlingsId(String behandlingsId) {
        this.behandlingsId = behandlingsId;
        return this;
    }

    public String getType() {
        return type;
    }

    public Hendelse setType(String type) {
        this.type = type;
        return this;
    }

    public String getValue() {
        return value;
    }

    public Hendelse setValue(String value) {
        this.value = value;
        return this;
    }

    public Instant getTime() {
        return time;
    }

    public Hendelse setTime(Instant time) {
        this.time = time;
        return this;
    }
}
