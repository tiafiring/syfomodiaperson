import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { formaterOrgnr } from '../../utils';
import { restdatoTilLesbarDato } from '../../utils/datoUtils';
import PersonkortFeilmelding from './PersonkortFeilmelding';
import PersonkortInformasjon from './PersonkortInformasjon';
import kanskjeBooleanTilJaNeiKanskje from './kanskjeBooleanTilJaNeiKanskje';
import PersonkortElement from './PersonkortElement';

const PersonkortLedere = ({ ledere }) => {
    const informasjonNokkelTekster = new Map([
        ['navn', getLedetekst('modiafront.personkort.visning.nokkeltekster.navn')],
        ['tlf', getLedetekst('modiafront.personkort.visning.nokkeltekster.tlf')],
        ['epost', getLedetekst('modiafront.personkort.visning.nokkeltekster.epost')],
        ['orgnummer', getLedetekst('modiafront.personkort.visning.nokkeltekster.orgnummer')],
        ['fomDato', getLedetekst('modiafront.personkort.visning.nokkeltekster.leder_fom')],
        ['arbeidsgiverForskuttererLoenn', getLedetekst('modiafront.personkort.visning.nokkeltekster.forskutterer')],
    ]);
    return ledere.length === 0
        ? (<PersonkortFeilmelding>
            {getLedetekst('modiafront.personkort.visning.leder.feilmelding.ingen-ledere')}
        </PersonkortFeilmelding>)
        : ledere.map((leder, idx) => {
            const valgteElementer = (({ navn, epost, tlf, orgnummer, fomDato, arbeidsgiverForskuttererLoenn }) => {
                return {
                    navn,
                    epost,
                    tlf,
                    orgnummer: formaterOrgnr(orgnummer),
                    fomDato,
                    arbeidsgiverForskuttererLoenn,
                };
            })(Object.assign({},
                leder,
                {
                    fomDato: leder.fomDato && restdatoTilLesbarDato(leder.fomDato),
                    arbeidsgiverForskuttererLoenn: kanskjeBooleanTilJaNeiKanskje(leder.arbeidsgiverForskuttererLoenn),
                }));

            return (
                <PersonkortElement
                    key={idx}
                    tittel={leder.organisasjonsnavn}
                    imgUrl="/sykefravaer/img/svg/fabrikk.svg"
                    antallKolonner={3}
                >
                    {
                        !leder.erOppgitt
                            ? (<PersonkortFeilmelding>
                                {getLedetekst('modiafront.personkort.visning.leder.feilmelding.ingen-leder')}
                            </PersonkortFeilmelding>)
                            : (<PersonkortInformasjon
                                informasjonNokkelTekster={informasjonNokkelTekster}
                                informasjon={valgteElementer} />)
                    }
                </PersonkortElement>);
        });
};

PersonkortLedere.propTypes = {
    ledere: PropTypes.array,
};

export default PersonkortLedere;
