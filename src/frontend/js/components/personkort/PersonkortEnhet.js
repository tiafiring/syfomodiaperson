import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import PersonkortElement from './PersonkortElement';
import PersonkortInformasjon from './PersonkortInformasjon';

const PersonkortEnhet = ({ behandlendeEnhet }) => {
    const informasjonNokkelTekster = new Map([
        ['enhetId', getLedetekst('modiafront.personkort.visning.nokkeltekster.enhet')],
    ]);
    const valgteElementer = (({ enhetId }) => {
        return { enhetId };
    })(behandlendeEnhet);
    return (<PersonkortElement
        tittel={behandlendeEnhet.navn}
        imgUrl="/sykefravaer/img/svg/kontorbygg.svg">
        <PersonkortInformasjon
            informasjonNokkelTekster={informasjonNokkelTekster}
            informasjon={valgteElementer} />
    </PersonkortElement>);
};

PersonkortEnhet.propTypes = {
    behandlendeEnhet: PropTypes.object,
};

export default PersonkortEnhet;
