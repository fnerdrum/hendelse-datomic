package no.bekk.hendelse.db;

import datomic.Connection;
import datomic.Util;

import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.util.List;

public class Utils {
    public static void transactAll(Connection conn, Reader reader) {
        List<List> txes = Util.readAll(reader);
        for (java.util.Iterator<List> it = txes.iterator(); it.hasNext(); ) {
            List tx = it.next();
            try {
                conn.transact(tx).get();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static URL resource(String name) {
        return Thread.currentThread().getContextClassLoader().getResource(name);
    }

    public static void transactAllFromResource(Connection conn, String resource) {
        URL url = resource(resource);
        try {
            transactAll(conn, new InputStreamReader(url.openStream()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
