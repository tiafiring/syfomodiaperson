import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    getHtmlLedetekst,
} from 'digisyfo-npm';
import Side from '../sider/Side';
import MotebookingSkjemaContainer from './MotebookingSkjemaContainer';
import MotestatusContainer from './MotestatusContainer';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as moterActions from '../actions/moter_actions';
import { MOETEPLANLEGGER } from '../enums/menypunkter';
import { hentBegrunnelseTekst } from '../utils/tilgangUtils';

export class MotebookingSide extends Component {
    constructor(props = false) {
        super(props);
        this.props.hentMoter(this.props.fnr);
    }

    render() {
        const {
            fnr,
            henter,
            hentingFeilet,
            mote,
            tilgang,
            ledetekster,
            moterTilgang,
        } = this.props;
        return (<Side fnr={fnr} tittel="Møteplanlegger" aktivtMenypunkt={MOETEPLANLEGGER}>
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
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (moterTilgang.harTilgang === false) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(moterTilgang.begrunnelse), ledetekster)}
                        />);
                    }
                    if (mote) {
                        return <MotestatusContainer fnr={fnr} moteUuid={mote.moteUuid} />;
                    }
                    return <MotebookingSkjemaContainer {...this.props} />;
                })()
            }
        </Side>);
    }
}

MotebookingSide.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
    tilgang: PropTypes.object,
    virksomhet: PropTypes.object,
    hentMoter: PropTypes.func,
    hentLedere: PropTypes.func,
    nullstillVirksomhet: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    henter: PropTypes.bool,
    ledetekster: PropTypes.object,
    hentingFeilet: PropTypes.bool,
    hentLedereFeiletBool: PropTypes.bool,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
    moterTilgang: PropTypes.object,
};

export const mapStateToProps = (state, ownProps) => {
    const aktivtMote = state.moter.data.filter((mote) => {
        return mote.status !== 'AVBRUTT';
    })[0];

    return {
        fnr: ownProps.params.fnr,
        mote: aktivtMote,
        henter: state.moter.henter || state.ledetekster.henter || state.ledere.henter || state.tilgang.henter,
        sender: state.moter.sender,
        ledetekster: state.ledetekster.data,
        hentingFeilet: state.moter.hentingFeilet || state.tilgang.hentingFeilet || state.ledere.hentingFeilet || state.ledetekster.hentingFeilet,
        sendingFeilet: state.moter.sendingFeilet,
        tilgang: state.tilgang.data,
        moterTilgang: state.moter.tilgang,
    };
};

const MotebookingContainer = connect(mapStateToProps, moterActions)(MotebookingSide);

export default MotebookingContainer;
