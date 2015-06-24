package no.bekk.hendelse.domain;


public class Hendelse {

    public final String behandlingsId, type, value;

    public Hendelse(String behandlingsId, String type, String value) {
        this.behandlingsId = behandlingsId;
        this.type = type;
        this.value = value;
    }
}
