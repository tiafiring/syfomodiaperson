import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    getHtmlLedetekst,
} from 'digisyfo-npm';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as motebehovActions from '../actions/motebehov_actions';
import { MOETEPLANLEGGER } from '../menypunkter';
import { hentBegrunnelseTekst } from '../utils/tilgangUtils';
import { MotebehovKvittering } from '../components/MotebehovKvittering';

export class MotebehovSide extends Component {
    constructor(props = false) {
        super(props);
        this.props.hentMotebehov(this.props.fnr);
    }

    render() {
        const {
            fnr,
            henter,
            hentingFeilet,
            motebehovet,
            tilgang,
            ledetekster,
            motebehovTilgang,
        } = this.props;
        return (<Side fnr={fnr} tittel="Møtebehov" aktivtMenypunkt={MOETEPLANLEGGER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (!tilgang.harTilgang) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(tilgang.begrunnelse), ledetekster)}
                        />);
                    }
                    if (motebehovTilgang.harTilgang === false) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(motebehovTilgang.begrunnelse), ledetekster)}
                        />);
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (motebehovet && motebehovet.motebehovSvar) {
                        return <MotebehovKvittering ledetekster={ledetekster} motebehov={motebehovet} />;
                    }
                    return (<Feilmelding
                        tittel={getLedetekst('mote.motebehov.feilmelding.tittel', ledetekster)}
                        melding={getHtmlLedetekst('mote.motebehov.feilmelding.ikkeFunnet', ledetekster)}
                    />);
                })()
            }
        </Side>);
    }
}

MotebehovSide.propTypes = {
    fnr: PropTypes.string,
    motebehovet: PropTypes.object,
    hentMotebehov: PropTypes.func,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    tilgang: PropTypes.object,
    ledetekster: PropTypes.object,
    motebehovTilgang: PropTypes.object,
};

export const mapStateToProps = (state, ownProps) => {
    return {
        fnr: ownProps.params.fnr,
        motebehovet: state.motebehov.data[0],
        henter: state.motebehov.henter || state.ledetekster.henter,
        hentingFeilet: state.motebehov.hentingFeilet || state.ledetekster.hentingFeilet,
        tilgang: state.tilgang.data,
        ledetekster: state.ledetekster.data,
        motebehovTilgang: state.motebehov.tilgang,
    };
};

const MotebehovContainer = connect(mapStateToProps, motebehovActions)(MotebehovSide);

export default MotebehovContainer;
