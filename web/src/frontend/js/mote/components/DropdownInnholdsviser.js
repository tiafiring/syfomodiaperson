import React, { PropTypes, Component } from 'react';
import { Varselstripe } from 'digisyfo-npm';
import AppSpinner from '../../components/AppSpinner';
import { proptypes as moterPropTypes } from 'moter-npm';

export const Innhold = ({ emne, innhold }) => {
    return (<div className="blokk">
        <div className="epostinnhold__forhandsvis">
            <p>{emne}</p>
        </div>
        <div className="epostinnhold__forhandsvis">
            <div dangerouslySetInnerHTML={{ __html: innhold }}></div>
        </div>
    </div>);
};

Innhold.propTypes = {
    emne: PropTypes.string,
    innhold: PropTypes.string,
};

const Feil = ({ melding = 'Beklager, det oppstod en feil' }) => {
    return (<div className="blokk">
        <Varselstripe type="feil" fylt>
            <p>{melding}</p>
        </Varselstripe>
    </div>);
};

Feil.propTypes = {
    melding: PropTypes.string,
};

class DropdownInnholdsviser extends Component {
    componentDidMount() {
        this.props.hentEpostinnhold(this.getDeltaker(this.props.type).deltakerUuid, this.props.mote.bekreftetAlternativ.id);
    }

    getDeltaker(type) {
        return this.props.mote.deltakere.filter((d) => {
            return d.type === type;
        })[0];
    }

    render() {
        const { henter, hentingFeilet, epostinnhold } = this.props;
        if (henter) {
            return <AppSpinner />;
        }
        if (hentingFeilet) {
            return (<Feil melding="Beklager, det oppstod en feil ved uthenting av innhold i e-posten" />);
        }
        if (epostinnhold) {
            return (<div>
                <Innhold {...epostinnhold} />
            </div>);
        }
        return (<Feil />);
    }
}

DropdownInnholdsviser.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    epostinnhold: PropTypes.object,
    type: PropTypes.string,
    hentEpostinnhold: PropTypes.func,
    ledetekster: PropTypes.object,
    mote: moterPropTypes.mote,
};

export default DropdownInnholdsviser;
