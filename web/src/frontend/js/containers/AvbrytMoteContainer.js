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
        const { epostinnhold, mote } = this.props;
        if (!epostinnhold && mote) {
            this.props.hentAvbrytMoteEpostinnhold(this.getArbeidsgiverDeltaker().deltakerUuid);
        } else if (!mote) {
            this.props.hentMoter(this.props.fnr);
        }
    }

    avbrytMote() {
        const { avbrytMote, mote, fnr } = this.props;
        avbrytMote(mote.moteUuid, fnr);
    }

    render() {
        const { avbryter, avbrytFeilet, hentingFeiletBool, fnr, mote, henterMoterBool, innhold, valgtDeltaker, valgtKanal, setValgtKanal, setValgtDeltaker } = this.props;
        const arbeidsgiverDeltaker = this.getArbeidsgiverDeltaker();
        const sykmeldtDeltaker = this.getSykmeldtDeltaker();

        return (<Side tittel="Avbryt møteforespørsel">
        {
            (() => {
                if (hentingFeiletBool) {
                    return <Feilmelding />;
                }
                if (henterMoterBool) {
                    return <AppSpinner />;
                } else if (mote) {
                    return (<Lightbox onClose={() => {
                        history.replace(`/sykefravaer/${fnr}/mote`);
                    }}>
                        {(() => {
                            return (<AvbrytMote
                                avbrytFeilet={avbrytFeilet}
                                sykmeldtDeltaker={sykmeldtDeltaker}
                                avbryter={avbryter}
                                deltaker={arbeidsgiverDeltaker}
                                setValgtKanal={setValgtKanal}
                                setValgtDeltaker={setValgtDeltaker}
                                onSubmit={() => { this.avbrytMote(); }}
                                avbrytHref={`/sykefravaer/${fnr}/mote`}
                            innhold={innhold} valgtDeltaker={valgtDeltaker} valgtKanal={valgtKanal} />);
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
    henterMoterBool: PropTypes.bool,
    hentingFeiletBool: PropTypes.bool,
    innhold: PropTypes.object,
    valgtDeltaker: PropTypes.object,
    valgtKanal: PropTypes.string,
    mote: PropTypes.object,
    hentMoter: PropTypes.func,
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
        avbrytFeilet: state.moter.avbrytFeilet,
        henterMoterBool: state.moter.henter,
        henterEpostinnholdBool: state.epostinnhold.henter,
        hentingFeiletBool: state.moter.hentingFeilet || state.epostinnhold.hentingFeilet,
        innhold: state.epostinnhold.data,
    };
}

const AvbrytMoteContainer = connect(mapStateToProps, Object.assign({}, moterActions, epostinnholdActions))(AvbrytMoteSide);

export default AvbrytMoteContainer;
