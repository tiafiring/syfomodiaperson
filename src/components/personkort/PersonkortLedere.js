import React from 'react';
import PropTypes from 'prop-types';
import { formaterOrgnr } from '../../utils';
import { restdatoTilLesbarDato } from '../../utils/datoUtils';
import PersonkortFeilmelding from './PersonkortFeilmelding';
import PersonkortInformasjon from './PersonkortInformasjon';
import kanskjeBooleanTilJaNeiKanskje from './kanskjeBooleanTilJaNeiKanskje';
import PersonkortElement from './PersonkortElement';
import {
    lederHasActiveSykmelding,
    ledereWithActiveLedereFirst,
    virksomheterWithoutLeder,
} from '../../utils/ledereUtils';

const texts = {
    name: 'Navn',
    phone: 'Telefon',
    email: 'E-post',
    orgnummer: 'Org.nummer',
    startDate: 'Meldt inn',
    forskuttererLonn: 'Forskutterer arbeidsgiver lønn?',
    error: 'Nærmeste leder mangler. Arbeidsgiveren må melde inn nærmeste leder i Altinn.',
    noLeder: 'Nærmeste leder ikke meldt inn av arbeidsgiver',
    activeSykmelding: 'Sykmeldt nå',
};

const PersonkortLedere = ({ ledere, sykmeldinger }) => {
    const virksomheterFromSykmeldinger = virksomheterWithoutLeder(ledere, sykmeldinger);
    const ledereAndVirksomheter = [...ledere, ...virksomheterFromSykmeldinger];
    const ledereWithActiveFirst = ledereWithActiveLedereFirst(ledereAndVirksomheter, sykmeldinger);
    const informasjonNokkelTekster = new Map([
        ['navn', texts.name],
        ['tlf', texts.phone],
        ['epost', texts.email],
        ['orgnummer', texts.orgnummer],
        ['fomDato', texts.startDate],
        ['arbeidsgiverForskuttererLoenn', texts.forskuttererLonn],
    ]);
    return ledereWithActiveFirst.length === 0
        ? (<PersonkortFeilmelding>
            {texts.error}
        </PersonkortFeilmelding>)
        : ledereWithActiveFirst.map((leder, idx) => {
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

            const titleLabelText = lederHasActiveSykmelding(leder, sykmeldinger) && texts.activeSykmelding;

            return (
                <PersonkortElement
                    key={idx}
                    tittel={leder.organisasjonsnavn}
                    imgUrl="/sykefravaer/img/svg/fabrikk.svg"
                    antallKolonner={3}
                    titleLabelText={titleLabelText}
                >
                    {
                        !leder.erOppgitt
                            ? (<PersonkortFeilmelding>
                                {texts.noLeder}
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
    sykmeldinger: PropTypes.arrayOf(PropTypes.object),
};

export default PersonkortLedere;
