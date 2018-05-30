import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    konstanter,
    proptypes as motePropTypes,
} from 'moter-npm';
import BekreftMoteSkjema from './BekreftMoteSkjema';
import BekreftMoteUtenSvarSkjema from './BekreftMoteUtenSvarSkjema';

const { ARBEIDSGIVER } = konstanter;

class BekreftMote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bekreftet: false,
        };
    }

    componentWillMount() {
        if (this.moteBesvart(this.props.mote, this.props.alternativ)) {
            this.props.bekreftMote();
        }
    }

    moteBesvart(mote, alternativ) {
        let arbeidsgiverHarSvart = false;

        const arbeidsgiver = mote.deltakere.filter((d) => {
            return d.type === ARBEIDSGIVER;
        })[0];
        arbeidsgiver.svar.forEach((s) => {
            if (arbeidsgiver.svartidspunkt !== null && s.valgt && s.id === alternativ.id) {
                arbeidsgiverHarSvart = true;
            }
        });
        return arbeidsgiverHarSvart;
    }

    render() {
        if (this.props.moteBekreftet) {
            return (
                <BekreftMoteSkjema
                    arbeidstaker={this.props.arbeidstaker}
                    onSubmit={this.props.onSubmit}
                    mote={this.props.mote}
                    ledetekster={this.props.ledetekster}
                    avbrytHref={this.props.avbrytHref}
                    bekrefter={this.props.bekrefter}
                    hentEpostinnhold={this.props.hentEpostinnhold}
                    bekreftFeilet={this.props.bekreftFeilet} />
            );
        }
        return (
            <BekreftMoteUtenSvarSkjema
                mote={this.props.mote}
                ledetekster={this.props.ledetekster}
                avbrytHref={this.props.avbrytHref}
                bekrefter={this.props.bekrefter}
                bekreftFeilet={this.props.bekreftFeilet}
                bekreftMoteUtenSvar={this.props.bekreftMote} />
        );
    }
}
BekreftMote.propTypes = {
    arbeidstaker: PropTypes.object,
    ledetekster: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
    mote: motePropTypes.mote,
    bekrefter: PropTypes.bool,
    bekreftFeilet: PropTypes.bool,
    hentEpostinnhold: PropTypes.func,
    alternativ: PropTypes.object,
    bekreftMote: PropTypes.func,
    moteBekreftet: PropTypes.bool,
};

export default BekreftMote;
