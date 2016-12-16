import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import MotestatusContainer from '../mote/containers/MotestatusContainer';
import * as moterActions from '../mote/actions/moter_actions';
import * as epostinnholdActions from '../mote/actions/epostinnhold_actions';
import AppSpinner from '../components/AppSpinner';
import Lightbox from '../components/Lightbox';
import history from '../history';
import BekreftMote from '../mote/components/BekreftMote';
import Feilmelding from '../components/Feilmelding';
import { MOETEPLANLEGGER } from '../menypunkter';

export class BekreftMoteSide extends Component {
    constructor(props) {
        super(props);
        if (!this.props.alternativ) {
            this.props.hentMoter(this.props.fnr);
        } else {
            this.hentMoteInnhold();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.alternativ && this.props.alternativ) {
            this.hentMoteInnhold();
        }
    }

    onSubmit() {
        const { bekreftMote, alternativ, mote, fnr } = this.props;
        bekreftMote(mote.moteUuid, alternativ.id, fnr);
    }

    hentMoteInnhold() {
        this.props.hentBekreftMoteEpostinnhold(this.props.deltaker.deltakerUuid, this.props.alternativ.id);
    }

    render() {
        const { alternativ, henterMoterBool, henterEpostinnholdBool, fnr, mote, epostinnhold, deltaker } = this.props;

        return (<Side tittel="Bekreft møte" aktivtMenypunkt={MOETEPLANLEGGER}>
            {
                (() => {
                    if (henterMoterBool) {
                        return <AppSpinner />;
                    } else if (alternativ) {
                        return (<div>
                            {
                                mote.status === 'OPPRETTET' && <Lightbox onClose={() => {
                                    history.replace(`/sykefravaer/${fnr}/mote`);
                                }}>
                                {
                                    (() => {
                                        if (henterEpostinnholdBool || !epostinnhold) {
                                            return <AppSpinner />;
                                        }
                                        return (<BekreftMote onSubmit={() => {
                                            this.onSubmit();
                                        }} deltaker={deltaker} epostinnhold={epostinnhold} avbrytHref={`/sykefravaer/${fnr}/mote`} />);
                                    })()
                                }
                                </Lightbox>
                            }
                            <MotestatusContainer moteUuid={mote.moteUuid} />
                        </div>);
                    }
                    return <Feilmelding />;
                })()
            }
        </Side>);
    }
}

BekreftMoteSide.propTypes = {
    alternativ: PropTypes.object,
    henterMoterBool: PropTypes.bool,
    henterEpostinnholdBool: PropTypes.bool,
    fnr: PropTypes.string,
    mote: PropTypes.object,
    epostinnhold: PropTypes.object,
    deltaker: PropTypes.object,
    hentMoter: PropTypes.func,
    bekreftMote: PropTypes.func,
    hentBekreftMoteEpostinnhold: PropTypes.func,
};

export const getMoteFraAlternativId = (moter, alternativId) => {
    if (!moter) {
        return null;
    }
    return moter.filter((mote) => {
        if (!mote.alternativer) {
            return false;
        }
        const alternativer = mote.alternativer.filter((alternativ) => {
            return `${alternativ.id}` === alternativId;
        });
        return alternativer.length > 0;
    })[0];
};

export const mapStateToProps = (state, ownProps) => {
    const alternativId = ownProps.params.alternativId;
    const mote = getMoteFraAlternativId(state.moter.data, alternativId);
    const alternativ = mote ? mote.alternativer.filter((alt) => {
        const id = `${alt.id}`;
        return id === `${alternativId}`;
    })[0] : null;
    const deltaker = mote ? mote.deltakere.filter((_deltaker) => {
        return _deltaker.type === 'arbeidsgiver';
    })[0] : null;
    const fnr = state.navbruker.data.fnr;

    return {
        fnr,
        henterMoterBool: state.moter.henter,
        henterEpostinnholdBool: state.epostinnhold.henter,
        alternativ,
        mote,
        deltaker,
        epostinnhold: state.epostinnhold.eposttype === 'BEKREFT_TIDSPUNKT' ? state.epostinnhold.data : undefined,
    };
};

const BekreftMoteContainer = connect(mapStateToProps, Object.assign({}, moterActions, epostinnholdActions))(BekreftMoteSide);

export default BekreftMoteContainer;
