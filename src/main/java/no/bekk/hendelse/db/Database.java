package no.bekk.hendelse.db;

import no.bekk.hendelse.domain.Hendelse;
import no.bekk.hendelse.domain.Henvendelse;

import java.util.List;

public interface Database {
    List<Henvendelse> getAll();
    Henvendelse getHenvendelse(String behandlingsId);
    Henvendelse addHendelse(Hendelse hendelse);
}
