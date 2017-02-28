import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import TextField from '../../components/TextField';
import TextFieldLocked from '../../components/TextFieldLocked';
import FyllUtVirksomhet from './FyllUtVirksomhet';
import ArbeidsgiverDropdown from './ArbeidsgiverDropdown';
import { getLedetekst } from 'digisyfo-npm';

export const FyllUtLeder = ({ FieldComponent = TextField, ledetekster }) => {
    return (<div>
        <div className="navInput blokk">
            <label htmlFor="js-ledernavn">{getLedetekst('mote.bookingskjema.lederfields.ledernavn', ledetekster)}</label>
            <Field id="js-ledernavn" component={FieldComponent} name="deltakere[0].navn" className="input--xxl" />
        </div>
        <div className="navInput blokk">
            <label htmlFor="js-lederepost">{getLedetekst('mote.bookingskjema.lederfields.epost', ledetekster)}</label>
            <Field id="js-lederepost" component={FieldComponent} type="email" name="deltakere[0].epost" className="input--xxl" />
        </div>
    </div>);
};

FyllUtLeder.propTypes = {
    FieldComponent: PropTypes.func,
    ledetekster: PropTypes.object,
};

export const PreutfyltLeder = ({ ledetekster }) => {
    return <FyllUtLeder FieldComponent={TextFieldLocked} ledetekster={ledetekster} />;
};

PreutfyltLeder.propTypes = {
    ledetekster: PropTypes.object,
};

export const ManuellUtfyltLeder = ({ ledetekster }) => {
    return (<div>
        <FyllUtLeder ledetekster={ledetekster} />
        <FyllUtVirksomhet ledetekster={ledetekster} />
    </div>);
};

ManuellUtfyltLeder.propTypes = {
    ledetekster: PropTypes.object,
};

export default class LederFields extends Component {
    componentDidUpdate(prevProps) {
        const valgtArbeidsgiverType = this.props.arbeidsgiverType.input.value;
        const forrigeArbeidsgiverType = prevProps.arbeidsgiverType.input.value;
        if (valgtArbeidsgiverType !== forrigeArbeidsgiverType) {
            this.setLederfelter(valgtArbeidsgiverType);
        }
    }

    setLederfelter(valgtArbeidsgiverType) {
        const { ledere, untouch } = this.props;
        if (valgtArbeidsgiverType === 'VELG') {
            this.fyllUtLederfelter();
        } else if (valgtArbeidsgiverType === 'manuell') {
            this.fyllUtLederfelter();
            untouch('deltakere[0].navn', 'deltakere[0].epost', 'deltakere[0].orgnummer');
        } else {
            const leder = ledere.filter((l) => {
                return `${l.id}` === valgtArbeidsgiverType;
            })[0];
            this.fyllUtLederfelter(leder.navn, leder.epost, leder.orgnummer);
        }
    }

    fyllUtLederfelter(navn = '', epost = '', orgnummer = '') {
        const { autofill } = this.props;
        autofill('deltakere[0].navn', navn);
        autofill('deltakere[0].epost', epost);
        autofill('deltakere[0].orgnummer', orgnummer);
    }

    render() {
        const { ledetekster, arbeidsgiverType } = this.props;
        const value = arbeidsgiverType.input.value;
        const visInputfelter = value && value !== 'VELG';

        return (<div>
            <ArbeidsgiverDropdown {...arbeidsgiverType} ledere={this.props.ledere} ledetekster={ledetekster} />
            { visInputfelter && value !== 'manuell' && <PreutfyltLeder ledetekster={ledetekster} />}
            { visInputfelter && value === 'manuell' && <ManuellUtfyltLeder ledetekster={ledetekster} />}
        </div>);
    }
}

LederFields.propTypes = {
    arbeidsgiverType: PropTypes.object,
    nullstillVirksomhet: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    autofill: PropTypes.func,
    virksomhet: PropTypes.object,
    ledetekster: PropTypes.object,
    untouch: PropTypes.func,
    ledere: PropTypes.array,
};
