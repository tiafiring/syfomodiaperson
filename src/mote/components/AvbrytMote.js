import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
    getLedetekst,
    keyValue,
} from '@navikt/digisyfo-npm';
import * as moterPropTypes from '../../propTypes';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
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
                <AlertStripe
                    type="advarsel">
                    <p>{getLedetekst('mote.avbrytmote.feil', ledetekster)}</p>
                </AlertStripe>
            </div>)}
        </div>
        <div className="blokk--s">
            <KnappBase
                type="hoved"
                spinner={avbryter}
                disabled={avbryter}
                className="knapp--enten"
                onClick={onSubmit}>
                {getLedetekst('mote.avbrytmote.knapp.submit', ledetekster)}
            </KnappBase>
            <Link className="lenke" to={avbrytHref}>{getLedetekst('mote.avbrytmote.knapp.avbryt', ledetekster)}</Link>
        </div>
    </div>);
};

AvbrytMote.propTypes = {
    ledetekster: keyValue,
    arbeidstaker: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
    mote: moterPropTypes.motePt,
};

export default AvbrytMote;
