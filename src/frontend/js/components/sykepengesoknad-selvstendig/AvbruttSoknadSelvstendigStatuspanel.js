import React from 'react';
import { getLedetekst, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import { soknad as soknadPt } from '../../propTypes';
import VerktoylinjeGjenapneSoknad from '../sykepengesoknad-felles/VerktoylinjeGjenapneSoknad';

const AvbruttSoknadSelvstendigStatuspanel = ({ soknad }) => {
    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p>{getLedetekst('sykepengesoknad.status.AVBRUTT')}</p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel="Dato avbrutt">
                <p>
                    {tilLesbarDatoMedArstall(soknad.avbruttDato)}
                </p>
            </StatusNokkelopplysning>
        </Statusopplysninger>
        <VerktoylinjeGjenapneSoknad soknad={soknad} />
    </Statuspanel>);
};

AvbruttSoknadSelvstendigStatuspanel.propTypes = {
    soknad: soknadPt,
};

export default AvbruttSoknadSelvstendigStatuspanel;
