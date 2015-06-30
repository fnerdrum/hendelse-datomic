package no.bekk.hendelse.jms;

import no.bekk.hendelse.db.Database;
import no.bekk.hendelse.domain.Hendelse;
import no.bekk.hendelse.domain.Henvendelse;
import no.bekk.hendelse.services.HenvendelseSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class JMSReceiver {
    @Autowired
    private Database database;
    @Autowired
    private HenvendelseSocketService henvendelseSocketService;

    @JmsListener(destination = "henvendelse")
    public void receiveHendelse(Hendelse hendelse) {
        Henvendelse henvendelse = database.addHendelse(hendelse);

        henvendelseSocketService.send(henvendelse);
    }
}
