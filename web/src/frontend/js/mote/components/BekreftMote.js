import React, { Component, PropTypes } from 'react';
import { proptypes as motePropTypes } from 'moter-npm';
import { konstanter } from 'moter-npm';
import BekreftMoteSkjema from './BekreftMoteSkjema';
import BekreftMoteUtenSvarSkjema from './BekreftMoteUtenSvarSkjema';

const { ARBEIDSGIVER } = konstanter;


class BekreftMote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bekreftet: false,
        };
        this.bekreftMote = this.bekreftMote.bind(this);
    }

    componentWillMount() {
        if (this.moteBesvart(this.props.mote, this.props.alternativ)) {
            this.setState({
                bekreftet: !this.state.bekreftet,
            });
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

    bekreftMote() {
        this.setState({
            bekreftet: !this.state.bekreftet,
        });
    }

    render() {
        if (this.state.bekreftet) {
            return (
                <BekreftMoteSkjema
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
                bekreftMoteUtenSvar={this.bekreftMote} />
        );
    }
}
BekreftMote.propTypes = {
    ledetekster: PropTypes.object,
    onSubmit: PropTypes.func,
    avbrytHref: PropTypes.string,
    mote: motePropTypes.mote,
    bekrefter: PropTypes.bool,
    bekreftFeilet: PropTypes.bool,
    hentEpostinnhold: PropTypes.func,
    alternativ: PropTypes.object,
};

export default BekreftMote;
