import React, { Component, PropTypes } from 'react';
import AppSpinner from '../components/AppSpinner';
import Lightbox from '../components/Lightbox';
import Feilmelding from '../components/Feilmelding';
import Side from '../sider/Side';
import AvbrytMote from '../mote/components/AvbrytMote';
import history from '../history';
import * as moterActions from '../mote/actions/moter_actions';
import * as epostinnholdActions from '../mote/actions/epostinnhold_actions';
import { connect } from 'react-redux';

export class AvbrytMoteSide extends Component {
    constructor(props) {
        super(props);
        this.hentInnhold();
    }

    getArbeidsgiverDeltaker() {
        const { mote } = this.props;
        if (!mote) {
            return undefined;
        }
        return mote.deltakere.filter((deltaker) => {
            return deltaker.type === 'arbeidsgiver';
        })[0];
    }

    getSykmeldtDeltaker() {
        const { mote } = this.props;
        if (!mote) {
            return undefined;
        }
        return mote.deltakere.filter((deltaker) => {
            return deltaker.type === 'Bruker';
        })[0];
    }

    hentInnhold() {
        const { mote } = this.props;
        if (!mote) {
            this.props.hentMoter(this.props.fnr);
        } else {
            this.props.hentAvbrytMoteEpostinnhold(this.getArbeidsgiverDeltaker().deltakerUuid);
        }
    }

    avbrytMote() {
        const { avbrytMote, mote, fnr } = this.props;
        avbrytMote(mote.moteUuid, fnr);
    }

    render() {
        const { ledetekster, avbryter, avbrytFeilet, henterInnhold,
            hentingFeiletBool, fnr, mote, henter, varselinnhold,
            hentAvbrytMoteEpostinnhold, valgtDeltaker = this.getArbeidsgiverDeltaker(),
            setValgtDeltaker } = this.props;
        return (<Side tittel="Avbryt møteforespørsel">
        {
            (() => {
                if (hentingFeiletBool) {
                    return <Feilmelding />;
                }
                if (henter) {
                    return <AppSpinner />;
                } else if (mote) {
                    return (<Lightbox onClose={() => {
                        history.replace(`/sykefravaer/${fnr}/mote`);
                    }}>
                        {(() => {
                            return (<AvbrytMote
                                ledetekster={ledetekster}
                                henterInnhold={henterInnhold}
                                avbrytFeilet={avbrytFeilet}
                                sykmeldt={this.getSykmeldtDeltaker()}
                                avbryter={avbryter}
                                arbeidsgiver={this.getArbeidsgiverDeltaker()}
                                setValgtDeltaker={setValgtDeltaker}
                                hentAvbrytMoteEpostinnhold={hentAvbrytMoteEpostinnhold}
                                onSubmit={() => { this.avbrytMote(); }}
                                avbrytHref={`/sykefravaer/${fnr}/mote`}
                                varselinnhold={varselinnhold} valgtDeltaker={valgtDeltaker} />);
                        })()}
                    </Lightbox>);
                }
                return <Feilmelding />;
            })()
        }
        </Side>);
    }
}

AvbrytMoteSide.propTypes = {
    avbryter: PropTypes.bool,
    fnr: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeiletBool: PropTypes.bool,
    henterInnhold: PropTypes.bool,
    varselinnhold: PropTypes.object,
    valgtDeltaker: PropTypes.object,
    mote: PropTypes.object,
    ledetekster: PropTypes.object,
    hentMoter: PropTypes.func,
    setValgtDeltaker: PropTypes.func,
    hentAvbrytMoteEpostinnhold: PropTypes.func,
    avbrytMote: PropTypes.func,
    avbrytFeilet: PropTypes.bool,
};

export function mapStateToProps(state, ownProps) {
    const mote = state.moter.data.filter((m) => {
        return m.moteUuid === ownProps.params.moteUuid;
    })[0];
    return {
        fnr: state.navbruker.data.fnr,
        mote,
        avbryter: state.moter.avbryter,
        ledetekster: state.ledetekster.data,
        avbrytFeilet: state.moter.avbrytFeilet,
        henter: state.moter.henter || state.ledetekster.henter,
        henterInnhold: state.epostinnhold.henter,
        valgtDeltaker: state.epostinnhold.valgtDeltaker,
        valgtKanal: state.epostinnhold.valgtKanal,
        hentingFeiletBool: state.moter.hentingFeilet || state.epostinnhold.hentingFeilet,
        varselinnhold: state.epostinnhold.data,
    };
}


const AvbrytMoteContainer = connect(mapStateToProps, Object.assign({}, moterActions, epostinnholdActions))(AvbrytMoteSide);

export default AvbrytMoteContainer;

