import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import MotestatusContainer from '../mote/containers/MotestatusContainer';
import * as moterActions from '../mote/actions/moter_actions';
import AppSpinner from '../components/AppSpinner';
import Lightbox from '../components/Lightbox';
import history from '../history';

export class BekreftMoteSide extends Component {
    constructor(props) {
        super(props);
        this.props.hentMoter(this.props.fnr);
    }

    render() {
        const { mote, tidspunkt, henter, fnr } = this.props;
        return (<Side tittel="Bekreft møte">
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (mote) {
                        return (<div>
                            <Lightbox onClose={() => {
                                history.replace(`/sykefravaer/${fnr}/mote`);
                            }}>
                                <h2 className="typo-innholdstittel">Send møteresultat</h2>
                                <div className="knapperad">
                                    <button className="knapp">Send møteresultat</button>
                                </div>
                            </Lightbox>
                            <MotestatusContainer moteUuid={mote.moteUuid} />
                        </div>);
                    }
                })()
            }
        </Side>);
    }
}

export const mapStateToProps = (state, ownProps) => {
    const mote = state.moter.data.filter((mote) => {
        return mote.status === 'OPPRETTET';
    })[0];

    const alternativId = ownProps.params.alternativId;
    const tidspunkt = mote ? mote.alternativer.filter((alternativ) => {
        return `${alternativ.id}` === `${alternativId}`;
    })[0] : {}
    const fnr = state.navbruker.data.fnr;

    return {
        fnr,
        mote,
        henter: state.moter.henter,
        tidspunkt,
    };
};

const BekreftMoteContainer = connect(mapStateToProps, moterActions)(BekreftMoteSide);

export default BekreftMoteContainer;
