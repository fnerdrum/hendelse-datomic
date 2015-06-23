package no.bekk.hendelse.services;

import no.bekk.hendelse.domain.Hendelse;

public interface HendelseSocketService {
    void send(Hendelse message);
}
