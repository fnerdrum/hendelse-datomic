package no.bekk.hendelse.db;

import no.bekk.hendelse.domain.Hendelse;
import no.bekk.hendelse.domain.Henvendelse;

import java.util.List;

public interface Database {
    List<Henvendelse> getAll();
    Henvendelse addHendelse(Hendelse hendelse);
}
