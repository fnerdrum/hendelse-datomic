package no.bekk.hendelse.controllers;

import no.bekk.hendelse.db.Database;
import no.bekk.hendelse.domain.Hendelse;
import no.bekk.hendelse.domain.Henvendelse;
import no.bekk.hendelse.services.HenvendelseSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hendelse/receive")
public class ReceiveHendelseController {

    @Autowired
    private Database database;
    @Autowired
    private HenvendelseSocketService henvendelseSocketService;

    @RequestMapping(method = RequestMethod.POST)
    public void receive(Hendelse hendelse) {

        Henvendelse henvendelse = database.addHendelse(hendelse);

        henvendelseSocketService.send(henvendelse);
    }
}

