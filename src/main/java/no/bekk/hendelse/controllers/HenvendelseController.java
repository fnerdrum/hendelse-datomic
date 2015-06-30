package no.bekk.hendelse.controllers;

import no.bekk.hendelse.db.Database;
import no.bekk.hendelse.domain.Henvendelse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/henvendelse")
public class HenvendelseController {

    @Autowired
    private Database database;

    @RequestMapping(method = RequestMethod.GET)
    public List<Henvendelse> getAll() {
        return database.getAll();
    }

}
