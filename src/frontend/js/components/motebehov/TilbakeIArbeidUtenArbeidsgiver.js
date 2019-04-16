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

const TilbakeIArbeidUtenArbeidsgiver = (
    {
        friskmelding,
    }) => {
    const skalVise = friskmelding.utenArbeidsgiverAntarTilbakeIArbeid || friskmelding.utenArbeidsgiverTilbakemelding;
    const skalViseCheckbox = friskmelding.utenArbeidsgiverAntarTilbakeIArbeid;
    return (skalVise && <div className="sykmeldingMotebehovVisning__tilbakeIArbeid--utenArbeidsgiver">
        <h5 className="undertittel">{tekster.header}</h5>
        {
            skalViseCheckbox
                ? (<TilbakeIArbeidCheckboxMedSporsmaalOgDato
                    checkboxLabel={tekster.retur}
                    sporsmaal={tekster.returDatoSporsmaal}
                    returDato={friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato}
                />)
                : (<TilbakeIArbeidCheckboxMedSporsmaalOgDato
                    checkboxLabel={tekster.usikkerCheckboxLabel}
                    sporsmaal={tekster.usikkerDatoSporsmaal}
                    returDato={friskmelding.utenArbeidsgiverTilbakemelding}
                />)
        }
    </div>);
};

TilbakeIArbeidUtenArbeidsgiver.propTypes = {
    friskmelding: PropTypes.object,
};

export default TilbakeIArbeidUtenArbeidsgiver;
