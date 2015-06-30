package no.bekk.hendelse.config;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.jms.ConnectionFactory;

@Configuration
public class JMSConfig {

    @Value("${jms.url}")
    public String brokerURL;

    @Bean
    public ConnectionFactory connectionFactory() {
        return new ActiveMQConnectionFactory(brokerURL);
    }
}
