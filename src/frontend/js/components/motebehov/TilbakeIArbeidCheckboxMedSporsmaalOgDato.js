import React from 'react';
import PropTypes from 'prop-types';
import { tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import { Checkbox } from 'nav-frontend-skjema';

const TilbakeIArbeidCheckboxMedSporsmaalOgDato = (
    {
        checkboxLabel,
        sporsmaal,
        returDato,
    }) => {
    return (<div>
        <Checkbox className="sykmeldingMotebehovVisning__checkbox" label={checkboxLabel} checked disabled />
        <h6 className="sporsmaal">{sporsmaal}</h6>
        <p>{tilLesbarDatoMedArstall(returDato)}</p>
    </div>);
};

TilbakeIArbeidCheckboxMedSporsmaalOgDato.propTypes = {
    checkboxLabel: PropTypes.string,
    sporsmaal: PropTypes.string,
    returDato: PropTypes.instanceOf(Date),
};

export default TilbakeIArbeidCheckboxMedSporsmaalOgDato;
