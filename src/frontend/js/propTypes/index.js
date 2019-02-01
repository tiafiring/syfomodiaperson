import PropTypes from 'prop-types';
import * as arbeidssituasjoner from '../enums/arbeidssituasjoner';
import * as svartyper from '../enums/svartyper';
import { sykepengesoknad } from '@navikt/digisyfo-npm';

export { sykepengesoknad, sykmelding } from '@navikt/digisyfo-npm';

export * from './moteProptypes';

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

export const svartypePt = PropTypes.oneOf(Object.values(svartyper));

export const svar = PropTypes.arrayOf(PropTypes.shape({
    verdi: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
}));

const sporsmalShape = {
    id: PropTypes.string,
    kriterieForVisningAvUndersporsmal: PropTypes.string,
    max: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
    min: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
    sporsmalstekst: PropTypes.string,
    svar,
    svartype: svartypePt,
    tag: PropTypes.string,
    undertekst: PropTypes.string,
    pavirkerAndreSporsmal: PropTypes.bool,
};

sporsmalShape.undersporsmal = PropTypes.arrayOf(PropTypes.shape(sporsmalShape));

export const sporsmal = PropTypes.shape(sporsmalShape);

export const soknad = PropTypes.shape({
    id: PropTypes.string,
    sykmeldingId: PropTypes.string,
    soknadstype: PropTypes.string,
    status: PropTypes.string,
    fom: PropTypes.instanceOf(Date),
    tom: PropTypes.instanceOf(Date),
    opprettetDato: PropTypes.instanceOf(Date),
    InnsendtDato: PropTypes.instanceOf(Date),
    sporsmal: PropTypes.arrayOf(sporsmal),
});

export const oppsummeringSporsmal = {
    svar,
    sporsmalstekst: PropTypes.string,
    tag: PropTypes.string,
};

export const soknadEllerSykepengesoknad = PropTypes.oneOfType([soknad, sykepengesoknad]);
