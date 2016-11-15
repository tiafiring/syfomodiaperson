import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import MotebookingSkjema from '../mote/skjema/MotebookingSkjema';
import MotebookingStatus from '../mote/components/MotebookingStatus';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import * as moterActions from '../mote/actions/moter_actions';
import * as ledereActions from '../actions/ledere_actions';

export class MotebookingSide extends Component {
    constructor(props) {
        super(props);
        this.props.hentMoter(this.props.fnr);
        this.props.hentLedere(this.props.fnr);
    }

    render() {
        const { henter, hentingFeilet, mote, avbrytMote, avbryter, avbrytFeilet } = this.props;
        return (<Side tittel="Møteplanlegger">
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (mote) {
                        return <MotebookingStatus mote={mote} avbrytMote={avbrytMote} avbryter={avbryter} avbrytFeilet={avbrytFeilet} />;
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
    hentMoter: PropTypes.func,
    hentLedere: PropTypes.func,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    avbrytMote: PropTypes.func,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    const fnr = state.navbruker.data.fnr;
    const aktivtMote = state.moter.data.filter((mote) => {
        return mote.status !== 'AVBRUTT';
    })[0];
    const ledere = state.ledere.data.filter((leder) => {
        return leder.erOppgitt;
    });

    return {
        fnr,
        mote: aktivtMote,
        ledere,
        henter: state.moter.henter || state.ledere.henter,
        sender: state.moter.sender,
        avbryter: state.moter.avbryter,
        hentingFeilet: state.moter.hentingFeilet || state.ledere.hentingFeilet,
        sendingFeilet: state.moter.sendingFeilet,
        avbrytFeilet: state.moter.avbrytFeilet,
    };
};

const MotebookingContainer = connect(mapStateToProps, Object.assign({}, moterActions, ledereActions))(MotebookingSide);

export default MotebookingContainer;
