import moment from 'moment';


class Utils {
    static hash(s) {
        let hash = 0, i, chr, len;
        if (s.length === 0) return hash;
        for (i = 0, len = s.length; i < len; i++) {
            chr = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    }

    static tilDato(instant) {
        return moment
            .unix(instant.epochSecond)
            .add(instant.nano / 1000000, 'ms')
            .format('HH:mm:ss.SSS DD MMM YYYY');
    }

    static datoFraInstant(instant) {
        return moment
            .unix(instant.epochSecond)
            .add(instant.nano / 1000000, 'ms')
            .toDate();
    }
}
window.Utils = Utils;

export default Utils;