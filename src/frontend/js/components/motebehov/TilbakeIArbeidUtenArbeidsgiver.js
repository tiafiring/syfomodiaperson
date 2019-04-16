import React from 'react';
import PropTypes from 'prop-types';
import TilbakeIArbeidCheckboxMedSporsmaalOgDato from './TilbakeIArbeidCheckboxMedSporsmaalOgDato';

const tekster = {
    header: '8 uker: Pasient uten arbeidsgiver, utdypende opplysninger',
    retur: 'Jeg antar at pasienten på sikt kan komme tilbake i arbeid',
    returDatoSporsmaal: 'Anslå når du tror dette kan skje',
    usikkerCheckboxLabel: 'Jeg er usikker på om pasienten kan komme tilbake i arbeid',
    usikkerDatoSporsmaal: 'Når antar du å kunne gi tilbakemelding på dette?',
};

const getTilbakeIArbeidCheckbox = (returDato) => {
    return (<TilbakeIArbeidCheckboxMedSporsmaalOgDato
        checkboxLabel={tekster.retur}
        sporsmaal={tekster.returDatoSporsmaal}
        returDato={returDato}
    />);
};

const getUsikkerIArbeidCheckbox = (returDato) => {
    return (<TilbakeIArbeidCheckboxMedSporsmaalOgDato
        checkboxLabel={tekster.usikkerCheckboxLabel}
        sporsmaal={tekster.usikkerDatoSporsmaal}
        returDato={returDato}
    />);
};

const TilbakeIArbeidUtenArbeidsgiver = (
    {
        friskmelding,
    }) => {
    const skalVise = friskmelding.utenArbeidsgiverAntarTilbakeIArbeid || friskmelding.utenArbeidsgiverTilbakemelding;
    const antarTilbakeIArbeid = friskmelding.utenArbeidsgiverAntarTilbakeIArbeid;
    const tilbakeIArbeidCheckbox = getTilbakeIArbeidCheckbox(friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato);
    const usikkerIArbeidCheckbox = getUsikkerIArbeidCheckbox(friskmelding.utenArbeidsgiverTilbakemelding);
    return (skalVise && <div className="sykmeldingMotebehovVisning__tilbakeIArbeid--utenArbeidsgiver">
        <h5 className="undertittel">{tekster.header}</h5>
        {
            antarTilbakeIArbeid
                ? tilbakeIArbeidCheckbox
                : usikkerIArbeidCheckbox
        }
    </div>);
};

TilbakeIArbeidUtenArbeidsgiver.propTypes = {
    friskmelding: PropTypes.object,
};

export default TilbakeIArbeidUtenArbeidsgiver;
