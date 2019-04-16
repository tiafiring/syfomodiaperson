import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'nav-frontend-skjema';
import TilbakeIArbeidCheckboxMedSporsmaalOgDato from './TilbakeIArbeidCheckboxMedSporsmaalOgDato';

const tekster = {
    header: '8 uker: Pasient med arbeidsgiver, utdypende opplysninger',
    returSammeArbeidsgiver: 'Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver',
    datoSporsmaal: 'Anslå når du tror dette kan skje',
    returAnnenArbeidsgiver: 'Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver',
    usikkerDatoSporsmaal: 'Når antar du å kunne gi tilbakemelding på dette?',
    usikkerCheckboxLabel: 'Jeg er usikker på om pasienten kan komme tilbake i arbeid hos egen eller annen arbeidsgiver',
};

const ReturSammeArbeidsgiver = (
    {
        friskmelding,
    }) => {
    return (<div>
        {
            friskmelding.antarReturSammeArbeidsgiver && <TilbakeIArbeidCheckboxMedSporsmaalOgDato
                checkboxLabel={tekster.returSammeArbeidsgiver}
                sporsmaal={tekster.datoSporsmaal}
                returDato={friskmelding.antattDatoReturSammeArbeidsgiver}
            />
        }
        {
            friskmelding.antarReturAnnenArbeidsgiver &&
                <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={tekster.returAnnenArbeidsgiver} checked disabled />
        }
    </div>);
};

ReturSammeArbeidsgiver.propTypes = {
    friskmelding: PropTypes.object,
};

const TilbakeIArbeidMedArbeidsgiver = (
    {
        friskmelding,
    }) => {
    const skalVise = friskmelding.antarReturSammeArbeidsgiver || friskmelding.antarReturAnnenArbeidsgiver || friskmelding.tilbakemeldingReturArbeid;
    const antarRetur = friskmelding.antarReturSammeArbeidsgiver || friskmelding.antarReturAnnenArbeidsgiver;
    return (skalVise && <div className="sykmeldingMotebehovVisning__tilbakeIArbeid--medArbeidsgiver">
        <h5 className="undertittel">{tekster.header}</h5>
        {
            antarRetur
                ? (<ReturSammeArbeidsgiver friskmelding={friskmelding} />)
                : (<TilbakeIArbeidCheckboxMedSporsmaalOgDato
                    checkboxLabel={tekster.usikkerCheckboxLabel}
                    sporsmaal={tekster.usikkerDatoSporsmaal}
                    returDato={friskmelding.tilbakemeldingReturArbeid}
                />)
        }
    </div>);
};

TilbakeIArbeidMedArbeidsgiver.propTypes = {
    friskmelding: PropTypes.object,
};

export default TilbakeIArbeidMedArbeidsgiver;
