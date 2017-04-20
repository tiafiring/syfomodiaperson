import React from 'react';
import { DatoOgTid, SvarMedIkon, konstanter, proptypes as moterPropTypes } from 'moter-npm';
const { ARBEIDSGIVER, BRUKER } = konstanter;

const BekreftetMotetidspunkt = (props) => {
    const mote = props.mote;
    const arbeidsgiver = mote.deltakere.filter((d) => {
        return d.type === ARBEIDSGIVER;
    })[0];
    const arbeidstaker = mote.deltakere.filter((d) => {
        return d.type === BRUKER;
    })[0];
    const arbeidstakerSvar = arbeidstaker && arbeidstaker.svar.filter((s) => {
        return s.id === mote.bekreftetAlternativ.id;
    })[0];
    const arbeidsgiversSvar = arbeidsgiver && arbeidsgiver.svar.filter((s) => {
        return s.id === mote.bekreftetAlternativ.id;
    })[0];
    return (<div className="gronnRammeTidspunkt">
        <DatoOgTid tagName="h4" tid={mote.bekreftetAlternativ.tid} />
        <SvarMedIkon bruker={arbeidsgiver} svar={arbeidsgiversSvar} />
        {
            arbeidstaker && arbeidstakerSvar && <SvarMedIkon bruker={arbeidstaker} svar={arbeidstakerSvar} />
        }
    </div>);
};

BekreftetMotetidspunkt.propTypes = {
    mote: moterPropTypes.mote,
};

export default BekreftetMotetidspunkt;
