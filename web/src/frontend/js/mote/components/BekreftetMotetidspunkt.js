import React, { PropTypes } from 'react';
import { DatoOgTid, SvarMedIkon, konstanter, proptypes as moterPropTypes } from 'moter-npm';
import FlereTidspunktSkjema from '../skjema/FlereTidspunktSkjema';
const { ARBEIDSGIVER, BRUKER } = konstanter;

const BekreftetMotetidspunkt = (props) => {
    const mote = props.mote;
    const arbeidsgiver = mote.deltakere.filter((d) => {
        return d.type === ARBEIDSGIVER;
    })[0];
    const arbeidstaker = mote.deltakere.filter((d) => {
        return d.type === BRUKER;
    })[0];
    const arbeidstakerSvar = arbeidstaker.svar.filter((s) => {
        return s.id === mote.bekreftetAlternativ.id;
    })[0];
    const arbeidsgiversSvar = arbeidsgiver.svar.filter((s) => {
        return s.id === mote.bekreftetAlternativ.id;
    })[0];
    return (<div className="gronnRammeTidspunkt">
        <DatoOgTid tagName="h4" tid={mote.bekreftetAlternativ.tid} />
        <SvarMedIkon bruker={arbeidsgiver} svar={arbeidsgiversSvar} />
        {
            arbeidstaker && arbeidstakerSvar && <SvarMedIkon bruker={arbeidstaker} svar={arbeidstakerSvar} />
        }
        <button className="nyetidspunktknapp" onClick={props.flereAlternativ}>Endre tidspunkt</button>
        {
            props.antallNyeTidspunkt > 0 && <FlereTidspunktSkjema {...props} antallEksisterendeTidspunkter={props.mote.alternativer.length} />
        }

    </div>);
};

BekreftetMotetidspunkt.propTypes = {
    mote: moterPropTypes.mote,
    antallNyeTidspunkt: PropTypes.number,
    flereAlternativ: PropTypes.func,
};

export default BekreftetMotetidspunkt;
