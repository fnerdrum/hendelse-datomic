package no.bekk.hendelse.services;

import no.bekk.hendelse.domain.Henvendelse;

public interface HenvendelseSocketService {
    void send(Henvendelse message);
}
