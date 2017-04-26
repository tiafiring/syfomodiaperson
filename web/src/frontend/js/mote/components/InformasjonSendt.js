import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { konstanter, proptypes as moterPropTypes } from 'moter-npm';
import { Utvidbar } from 'digisyfo-npm';
import DropdownInnholdsviser from './DropdownInnholdsviser';
import * as epostinnholdActions from '../actions/epostinnhold_actions';
const { BRUKER, ARBEIDSGIVER } = konstanter;

export const mapStateToInnholdsviserProps = (state) => {
    return {
        epostinnhold: state.epostinnhold.data,
        henter: state.epostinnhold.henter === true,
        hentingFeilet: state.epostinnhold.hentingFeilet === true,
    };
};

const actions = Object.assign({}, epostinnholdActions, {
    hentEpostinnhold: epostinnholdActions.hentBekreftMoteEpostinnhold,
});

export const InnholdsviserContainer = connect(mapStateToInnholdsviserProps, actions)(DropdownInnholdsviser);

const InformasjonSendt = ({ fikkIkkeOpprettetVarsel, mote, ledetekster }) => {
    return (<div>
        <h2>Informasjon sendt:</h2>
        { !fikkIkkeOpprettetVarsel &&
            <Utvidbar erApen={false} tittel="Arbeidstaker"
                ikon="svg/person.svg" ikonHover="svg/person_hover.svg" ikonAltTekst="Arbeidstaker" className="blokk"
                variant="lysebla">
                <InnholdsviserContainer mote={mote} ledetekster={ledetekster} type={ BRUKER } />
            </Utvidbar>
        }
        <Utvidbar erApen={false} tittel="Arbeidsgiver"
            ikon="svg/arbeidsgiver.svg" ikonHover="svg/arbeidsgiver_hover.svg" ikonAltTekst="Arbeidsgiver" className="blokk" variant="lilla">
            <InnholdsviserContainer mote={mote} ledetekster={ledetekster} type={ ARBEIDSGIVER } />
        </Utvidbar>
    </div>);
};

InformasjonSendt.propTypes = {
    mote: moterPropTypes.mote,
    fikkIkkeOpprettetVarsel: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default InformasjonSendt;
