import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import MotebookingSkjema from '../mote/skjema/MotebookingSkjema';
import MotestatusContainer from '../mote/containers/MotestatusContainer';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as moterActions from '../mote/actions/moter_actions';
import * as ledereActions from '../actions/ledere_actions';
import * as virksomhetActions from '../mote/actions/virksomhet_actions';

export class MotebookingSide extends Component {
    constructor(props) {
        super(props);
        this.props.hentMoter(this.props.fnr);
        this.props.hentLedere(this.props.fnr);
    }

    render() {
        const { henter, hentMoterFeiletBool, mote } = this.props;
        return (<Side tittel="Møteplanlegger">
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentMoterFeiletBool) {
                        return <Feilmelding />;
                    }
                    if (mote) {
                        return <MotestatusContainer moteUuid={mote.moteUuid} />;
                    }
                    return <MotebookingSkjema {...this.props} />;
                })()
            }
        </Side>);
    }
}

MotebookingSide.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
    virksomhet: PropTypes.string,
    hentMoter: PropTypes.func,
    hentLedere: PropTypes.func,
    nullstillVirksomhet: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    henter: PropTypes.bool,
    hentMoterFeiletBool: PropTypes.bool,
    hentLedereFeiletBool: PropTypes.bool,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    const fnr = state.navbruker.data.fnr;
    const aktivtMote = state.moter.data.filter((mote) => {
        return mote.status === 'OPPRETTET' || mote.status === 'BEKREFTET';
    })[0];
    const ledere = state.ledere.data.filter((leder) => {
        return leder.erOppgitt;
    });
    const virksomhet = state.virksomhet.navn;

    return {
        fnr,
        mote: aktivtMote,
        ledere,
        virksomhet,
        henter: state.moter.henter || state.ledere.henter,
        sender: state.moter.sender,
        hentMoterFeiletBool: state.moter.hentingFeilet,
        hentLedereFeiletBool: state.ledere.hentingFeilet,
        sendingFeilet: state.moter.sendingFeilet,
    };
};

const MotebookingContainer = connect(mapStateToProps, Object.assign({}, moterActions, ledereActions, virksomhetActions))(MotebookingSide);

export default MotebookingContainer;
