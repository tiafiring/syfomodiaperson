import React, { Component, PropTypes } from 'react';
import AppSpinner from '../components/AppSpinner';
import Lightbox from '../components/Lightbox';
import Feilmelding from '../components/Feilmelding';
import Side from '../sider/Side';
import AvbrytMote from '../mote/components/AvbrytMote';
import history from '../history';
import * as moterActions from '../mote/actions/moter_actions';
import { connect } from 'react-redux';

export class AvbrytMoteSide extends Component {
    constructor(props) {
        super(props);
        this.hentInnhold();
    }

    componentDidUpdate() {
        const { hentingFeiletBool } = this.props;
        if (!hentingFeiletBool) {
            this.hentInnhold();
        }
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
        }
    }

    avbrytMote() {
        const { avbrytMote, mote, fnr } = this.props;
        avbrytMote(mote.moteUuid, fnr);
    }

    render() {
        const { avbryter, avbrytFeilet, hentingFeiletBool, fnr, mote, henterMoterBool, ledetekster } = this.props;
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
                            return (<AvbrytMote ledetekster={ledetekster} avbrytFeilet={avbrytFeilet} sykmeldtDeltaker={sykmeldtDeltaker} avbryter={avbryter} deltaker={arbeidsgiverDeltaker} onSubmit={() => {
                                this.avbrytMote();
                            }} avbrytHref={`/sykefravaer/${fnr}/mote`} />);
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
    mote: PropTypes.object,
    ledetekster: PropTypes.object,
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
        ledetekster: state.ledetekster.data,
        avbrytFeilet: state.moter.avbrytFeilet,
        henterMoterBool: state.moter.henter || state.ledetekster.henter,
        hentingFeiletBool: state.moter.hentingFeilet,
    };
}

const AvbrytMoteContainer = connect(mapStateToProps, Object.assign({}, moterActions))(AvbrytMoteSide);

export default AvbrytMoteContainer;
