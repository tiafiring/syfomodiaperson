import React from 'react';
import { getLedetekst, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import Statuspanel, { Statusopplysninger, StatusNokkelopplysning } from '../Statuspanel';
import { soknad as soknadPt } from '../../propTypes';
import { VerktoyKnapp } from '../Verktoylinje';
import { Verktoylinje } from '../Verktoylinje';

export const soknadKanGjenapnes = (opprettetDato) => {
    const ETT_AAR_SIDEN = new Date();
    ETT_AAR_SIDEN.setYear(ETT_AAR_SIDEN.getFullYear() - 1);
    return opprettetDato >= ETT_AAR_SIDEN;
};

const GjenapneSoknad = ({ soknad }) => {
    return soknadKanGjenapnes(soknad.opprettetDato)
        ? (<Verktoylinje>
            <VerktoyKnapp>{getLedetekst('sykepengesoknad.gjenapne.knapp')}</VerktoyKnapp>
        </Verktoylinje>)
        : null;
};

GjenapneSoknad.propTypes = {
    soknad: soknadPt,
};

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
        <GjenapneSoknad soknad={soknad} />
    </Statuspanel>);
};

AvbruttSoknadSelvstendigStatuspanel.propTypes = {
    soknad: soknadPt,
};

export default AvbruttSoknadSelvstendigStatuspanel;
