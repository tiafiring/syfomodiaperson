import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import { getLedetekst } from 'digisyfo-npm';
import Epostmottakere from './Epostmottakere';
import { connect } from 'react-redux';
import { proptypes as motePropTypes } from 'moter-npm';
import Innholdsviser from './Innholdsviser';
import { mapStateToInnholdsviserProps } from './AvbrytMote';

export const InnholdsviserContainer = connect(mapStateToInnholdsviserProps)(Innholdsviser);

const BekreftMoteSkjema = (props) => {
    const { mote, ledetekster, bekrefter, bekreftFeilet, onSubmit, avbrytHref, hentEpostinnhold, arbeidstaker } = props;

    return (<div className="epostinnhold">
        <h2 className="epostinnhold__tittel">{getLedetekst('mote.bekreftmote.lightbox-overskrift', ledetekster)}</h2>
        <Epostmottakere mote={mote} ledetekster={ledetekster} arbeidstaker={arbeidstaker} />
        <InnholdsviserContainer mote={mote} hentEpostinnhold={hentEpostinnhold} ledetekster={ledetekster} />
        <div aria-live="polite" role="alert">
            { bekreftFeilet && (<div className="blokk">
                <AlertStripe
                    type="advarsel">
                    <p>{getLedetekst('mote.bekreftmote.feil', ledetekster)}</p>
                </AlertStripe>
            </div>)}
        </div>
        <div className="blokk--s">
            <KnappBase
                type="hoved"
                spinner={bekrefter}
                disabled={bekrefter}
                className="blokk--s knapp--enten"
                onClick={onSubmit}>
                {getLedetekst('mote.bekreftmote.lightbox-send-knapp', ledetekster)}
            </KnappBase>
            <Link to={avbrytHref} className="lenke">{getLedetekst('mote.bekreftmote.lightbox-avbryt-knapp', ledetekster)}</Link>
        </div>
    </div>);
};
BekreftMoteSkjema.propTypes = {
    ledetekster: PropTypes.object,
    arbeidstaker: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
    mote: motePropTypes.mote,
    bekrefter: PropTypes.bool,
    bekreftFeilet: PropTypes.bool,
    hentEpostinnhold: PropTypes.func,
};

export default BekreftMoteSkjema;
