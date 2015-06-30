package no.bekk.hendelse;

import datomic.Connection;
import datomic.Peer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

import java.util.UUID;

import static no.bekk.hendelse.db.Utils.transactAllFromResource;

@SpringBootApplication
@EnableJms
public class App {
    public static final String DATOMIC_URI = "datomic:mem://" + UUID.randomUUID();

    public static void main(String[] args) {
        System.setProperty("jms.url", "tcp://127.0.0.1:8001");

        Peer.createDatabase(DATOMIC_URI);
        Connection conn = Peer.connect(DATOMIC_URI);
        transactAllFromResource(conn, "db/schema.edn");

        SpringApplication.run(App.class, args);
    }
}
