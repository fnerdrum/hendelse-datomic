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

    static tilDato(epochSeconds) {
        return moment.unix(epochSeconds).format('HH:mm:ss.SSS DD MMM YYYY');
    }
}
window.Utils = Utils;

export default Utils;