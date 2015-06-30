package no.bekk.hendelse.services;

import no.bekk.hendelse.domain.Henvendelse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
public class HenvendelseSocketServiceImpl implements HenvendelseSocketService {

    private SimpMessageSendingOperations messageTemplate;

    @Autowired
    public HenvendelseSocketServiceImpl(SimpMessageSendingOperations messageTemplate) {
        this.messageTemplate = messageTemplate;
    }

    @Override
    public void send(Henvendelse henvendelse) {
        messageTemplate.convertAndSend("/henvendelse/henvendelser", henvendelse);
    }
}
