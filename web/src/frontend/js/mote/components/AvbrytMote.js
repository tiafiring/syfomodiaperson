import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Varselstripe, getLedetekst } from 'digisyfo-npm';
import { proptypes as moterPropTypes } from 'moter-npm';
import { connect } from 'react-redux';
import * as epostinnholdActions from '../../actions/epostinnhold_actions';
import Innholdsviser from './Innholdsviser';
import Epostmottakere from './Epostmottakere';

export const mapStateToInnholdsviserProps = (state) => {
    return {
        epostinnhold: state.epostinnhold.data,
        arbeidstaker: state.navbruker.data,
        henter: state.epostinnhold.henter || state.navbruker.henter,
        hentingFeilet: state.epostinnhold.hentingFeilet || state.navbruker.henter,
    };
};

const actions = Object.assign({}, epostinnholdActions, {
    hentEpostinnhold: epostinnholdActions.hentAvbrytMoteEpostinnhold,
});

export const InnholdsviserContainer = connect(mapStateToInnholdsviserProps, actions)(Innholdsviser);

const AvbrytMote = (props) => {
    const { ledetekster, mote, avbrytFeilet, avbryter, avbrytHref, onSubmit, arbeidstaker } = props;

    return (<div className="epostinnhold">
        <h2 className="epostinnhold__tittel">{getLedetekst('mote.avbrytmote.overskrift', ledetekster)}</h2>
        <Epostmottakere mote={mote} ledetekster={ledetekster} arbeidstaker={arbeidstaker} />
        <InnholdsviserContainer mote={mote} ledetekster={ledetekster} />
        <div aria-live="polite" role="alert">
            { avbrytFeilet && (<div className="blokk">
                <Varselstripe type="feil">
                    <p>{getLedetekst('mote.avbrytmote.feil', ledetekster)}</p>
                </Varselstripe>
            </div>)}
        </div>
        <div className="blokk--s">
            <button
                disabled={avbryter}
                className="knapp knapp--enten"
                onClick={onSubmit}>{getLedetekst('mote.avbrytmote.knapp.submit', ledetekster)}
                    { avbryter && <span className="knapp__spinner" />}
                </button>
            <Link className="lenke" to={avbrytHref}>{getLedetekst('mote.avbrytmote.knapp.avbryt', ledetekster)}</Link>
        </div>
    </div>);
};

AvbrytMote.propTypes = {
    ledetekster: PropTypes.object,
    arbeidstaker: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
    mote: moterPropTypes.mote,
};

export default AvbrytMote;
