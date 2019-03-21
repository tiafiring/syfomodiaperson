import React from 'react';
import PropTypes from 'prop-types';
import { tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import { Checkbox } from 'nav-frontend-skjema';
import { erFriskmeldingInformasjon } from '../../utils/sykmeldingUtils';

const tekster = {
    tilbakeIArbeid: {
        medArbeidsgiver: {
            header: '8 uker: Pasient med arbeidsgiver, utdypende opplysninger',
            returSammeArbeidsgiver: 'Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver',
            datoSporsmaal: 'Når tror du dette kan skje?',
            returAnnenArbeidsgiver: 'Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver',
            usikkerDatoSporsmaal: 'Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?',
        },
        utenArbeidsgiver: {
            header: '8 uker: Pasient uten arbeidsgiver, utdypende opplysninger',
            retur: 'Jeg antar at pasienten på sikt kan komme tilbake i arbeid',
            usikkerDatoSporsmaal: 'Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?',
        },
    },
};

export const TilbakeIArbeid = (
    {
        sykmelding,
    }) => {
    const harArbeidsgiver = sykmelding.mottakendeArbeidsgiver;
    const friskmelding = sykmelding.friskmelding;
    const skalVise = erFriskmeldingInformasjon(sykmelding);
    return (
        skalVise && <div className="sykmeldingMotebehovVisning__avsnitt">
            {
                !!harArbeidsgiver
                    ? (<div>
                        <h5 className="undertittel">{tekster.tilbakeIArbeid.medArbeidsgiver.header}</h5>
                        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.tilbakeIArbeid.medArbeidsgiver.returSammeArbeidsgiver} checked={friskmelding.antarReturSammeArbeidsgiver} disabled />
                        <h6 className="sporsmaal">{tekster.tilbakeIArbeid.medArbeidsgiver.datoSporsmaal}</h6>
                        <p>{tilLesbarDatoMedArstall(friskmelding.antattDatoReturSammeArbeidsgiver)}</p>

                        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.tilbakeIArbeid.medArbeidsgiver.returAnnenArbeidsgiver} checked={friskmelding.antarReturAnnenArbeidsgiver} disabled />
                        <h6 className="sporsmaal">{tekster.tilbakeIArbeid.medArbeidsgiver.usikkerDatoSporsmaal}</h6>
                        <p>{tilLesbarDatoMedArstall(friskmelding.tilbakemeldingReturArbeid)}</p>
                    </div>)
                    : (<div>
                        <h5 className="undertittel">{tekster.tilbakeIArbeid.utenArbeidsgiver.header}</h5>
                        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.tilbakeIArbeid.utenArbeidsgiver.retur} checked={friskmelding.utenArbeidsgiverAntarTilbakeIArbeid} disabled />
                        <h6 className="sporsmaal">{tekster.tilbakeIArbeid.utenArbeidsgiver.usikkerDatoSporsmaal}</h6>
                        <p>{tilLesbarDatoMedArstall(friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato)}</p>
                    </div>)
            }
        </div>);
};

TilbakeIArbeid.propTypes = {
    sykmelding: PropTypes.object,
};

export default TilbakeIArbeid;
