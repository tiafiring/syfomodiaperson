import React from 'react';
import PropTypes from 'prop-types';
import { proptypes as moterPropTypes, BesvarteTidspunkter } from 'moter-npm';
import { getLedetekst, Utvidbar } from 'digisyfo-npm';
import { NAV_VEILEDER } from '../../konstanter';

export const erSamtidig = (createdA, createdB, offset = 1000) => {
    const a = createdA.getTime();
    const b = createdB.getTime();
    const startA = a - offset;
    const endA = a + offset;
    return startA < b && endA > b;
};

const sorterAlternativer = (alternativer) => {
    return alternativer.sort((a, b) => {
        if (a.created.getTime() > b.created.getTime()) {
            return -1;
        } else if (b.created.getTime() > a.created.getTime()) {
            return 1;
        }
        return 0;
    });
};

export const getNyeAlternativer = (mote) => {
    if (!mote.alternativer) {
        return [];
    }
    const alternativer = sorterAlternativer(mote.alternativer);
    const nyesteCreated = alternativer[0].created;
    return mote.alternativer.filter((a) => {
        return erSamtidig(a.created, nyesteCreated);
    }).sort((a, b) => {
        if (a.tid.getTime() > b.tid.getTime()) {
            return 1;
        } else if (b.tid.getTime() > a.tid.getTime()) {
            return -1;
        }
        return 0;
    });
};

export const getGamleAlternativer = (mote) => {
    if (!mote.alternativer) {
        return [];
    }
    const alternativer = sorterAlternativer(mote.alternativer);
    const nyesteCreated = alternativer[0].created;
    return mote.alternativer.filter((a) => {
        return !erSamtidig(a.created, nyesteCreated);
    }).sort((a, b) => {
        if (a.tid.getTime() > b.tid.getTime()) {
            return 1;
        } else if (b.tid.getTime() > a.tid.getTime()) {
            return -1;
        }
        return 0;
    });
};

const Svarstatus = (props) => {
    const { mote, visFlereAlternativ, ledetekster, children, fnr } = props;
    const nyeAlternativer = getNyeAlternativer(mote);
    const gamleAlternativer = getGamleAlternativer(mote);
    return (<div>
        <div className="svarstatus">
            <BesvarteTidspunkter
                mote={mote}
                alternativer={nyeAlternativer}
                deltakertype={NAV_VEILEDER}
                fnr={fnr}
                ledetekster={ledetekster} />
            <button className="nyetidspunktknapp" onClick={visFlereAlternativ}>
                {getLedetekst('mote.bookingstatus.knapp.flere-tidspunkt', ledetekster)}</button>
            {children}
        </div>
        {
            gamleAlternativer.length > 0 && <Utvidbar
                ikon="svg/kalender--sort.svg"
                ikonHover="svg/kalender--blaa.svg"
                className="blokk"
                tittel={getLedetekst('mote.bookingstatus.tidspunkt-foreslatt-tidligere.tittel', ledetekster)}>
                <BesvarteTidspunkter
                    mote={mote}
                    alternativer={gamleAlternativer}
                    deltakertype={NAV_VEILEDER}
                    fnr={fnr}
                    ledetekster={ledetekster} />
            </Utvidbar>
        }
    </div>);
};

Svarstatus.propTypes = {
    mote: moterPropTypes.mote,
    visFlereAlternativ: PropTypes.func,
    ledetekster: PropTypes.object,
    children: PropTypes.object,
    fnr: PropTypes.string,
};

export default Svarstatus;
