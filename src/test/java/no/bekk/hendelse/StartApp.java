package no.bekk.hendelse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

@SpringBootApplication
@EnableJms
public class StartApp {
    public static void main(String[] args) {
        configureJMSProperties();

        SpringApplication.run(App.class, args);
    }

    private static void configureJMSProperties() {
        System.setProperty("jms.url", "tcp://127.0.0.1:8001");
    }
}
