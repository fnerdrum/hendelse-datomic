package no.bekk.hendelse.services;

import no.bekk.hendelse.domain.Hendelse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
public class HendelseSocketServiceImpl implements HendelseSocketService {

    private SimpMessageSendingOperations messageTemplate;

    @Autowired
    public HendelseSocketServiceImpl(SimpMessageSendingOperations messageTemplate) {
        this.messageTemplate = messageTemplate;
    }

    @Override
    public void send(Hendelse hendelse) {
        messageTemplate.convertAndSend("/hendelse/hendelser", hendelse);
    }
}
