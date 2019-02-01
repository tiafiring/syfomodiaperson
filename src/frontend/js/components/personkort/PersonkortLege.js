import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { restdatoTilLesbarDato } from '../../utils/datoUtils';
import PersonkortFeilmelding from './PersonkortFeilmelding';
import PersonkortElement from './PersonkortElement';
import PersonkortInformasjon from './PersonkortInformasjon';

export const hentTekstFastlegeNavn = (fastlege) => {
    return fastlege ? `${fastlege.fornavn} ${fastlege.etternavn}` : '';
};

export const TidligereLeger = ({ tidligereFastleger }) => {
    const fastlegerMedPasientforhold = tidligereFastleger.filter((lege) => {
        return lege.pasientforhold;
    });
    return fastlegerMedPasientforhold.length > 0
        ? (<PersonkortElement tittel="Tidligere fastleger" imgUrl="/sykefravaer/img/svg/medisinboks.svg">
            <ul>
                {
                    fastlegerMedPasientforhold.map((lege, idx) => {
                        return (<li key={idx}>
                            {
                                getLedetekst('modiafront.personkort.visningTidligereLeger.pasientforhold', {
                                    '%FOM%': restdatoTilLesbarDato(lege.pasientforhold.fom),
                                    '%TOM%': restdatoTilLesbarDato(lege.pasientforhold.tom),
                                    '%LEGENAVN%': lege.navn,
                                })
                            }
                        </li>);
                    })
                }
            </ul>
        </PersonkortElement>)
        : null;
};

TidligereLeger.propTypes = {
    tidligereFastleger: PropTypes.array,
};

const PersonkortLege = ({ fastleger }) => {
    const informasjonNokkelTekster = new Map([
        ['fom', getLedetekst('modiafront.personkort.visning.nokkeltekster.lege_fom')],
        ['navn', getLedetekst('modiafront.personkort.visning.nokkeltekster.legekontor')],
        ['telefon', getLedetekst('modiafront.personkort.visning.nokkeltekster.tlf')],
    ]);
    const aktivFastlege = fastleger.aktiv;
    const valgteElementerKontor = aktivFastlege.fastlegekontor && (({ navn, telefon }) => {
        return { navn, telefon };
    })(aktivFastlege.fastlegekontor);
    const valgteElementerPasientforhold = aktivFastlege.pasientforhold && (({ fom }) => {
        return { fom };
    })(Object.assign({}, aktivFastlege.pasientforhold, {
        fom: aktivFastlege.pasientforhold.fom && restdatoTilLesbarDato(aktivFastlege.pasientforhold.fom),
    }));
    const valgteElementer = Object.assign({}, valgteElementerPasientforhold, valgteElementerKontor);
    return fastleger.ikkeFunnet
        ? (<PersonkortFeilmelding>
            {getLedetekst('modiafront.personkort.visning.fastlege.feilmelding')}
        </PersonkortFeilmelding>)
        : ([<PersonkortElement tittel={hentTekstFastlegeNavn(aktivFastlege)} imgUrl="/sykefravaer/img/svg/medisinskrin.svg">
            <PersonkortInformasjon informasjonNokkelTekster={informasjonNokkelTekster} informasjon={valgteElementer} />
        </PersonkortElement>,
            <TidligereLeger tidligereFastleger={fastleger.tidligere} />]);
};

PersonkortLege.propTypes = {
    fastleger: PropTypes.object,
};

export default PersonkortLege;
