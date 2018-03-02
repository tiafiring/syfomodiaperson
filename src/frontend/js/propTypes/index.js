import PropTypes from 'prop-types';
import * as arbeidssituasjoner from '../enums/arbeidssituasjoner';

export { sykepengesoknad, sykmelding } from 'digisyfo-npm';

export const arbeidssituasjon = PropTypes.oneOf([
    arbeidssituasjoner.ARBEIDSTAKER,
    arbeidssituasjoner.NAERINGSDRIVENDE,
    arbeidssituasjoner.FRILANSER,
    arbeidssituasjoner.ARBEIDSLEDIG,
    arbeidssituasjoner.ANNET]);

export const brodsmule = PropTypes.shape({
    sti: PropTypes.string,
    tittel: PropTypes.string,
    sisteSmule: PropTypes.bool,
    erKlikkbar: PropTypes.bool,
});

export const naermesteLeder = PropTypes.shape({
    navn: PropTypes.string,
    epost: PropTypes.string,
    mobil: PropTypes.string,
    orgnummer: PropTypes.string,
    organisasjonsnavn: PropTypes.string,
    aktivTom: PropTypes.string,
});

export const arbeidsgiver = PropTypes.shape({
    navn: PropTypes.string,
    orgnummer: PropTypes.string,
    naermesteLeder,
});
