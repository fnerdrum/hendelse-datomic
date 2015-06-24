package no.bekk.hendelse.constrollers;

import no.bekk.hendelse.domain.Hendelse;
import no.bekk.hendelse.services.HendelseSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/hendelse/receive")
public class ReceiveHendelseController {

    @Autowired
    private HendelseSocketService hendelseSocketService;

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody void receive(Hendelse hendelse) {
        hendelseSocketService.send(hendelse);
    }
}

