import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';
import TextField from '../../components/TextField';
import TextFieldLocked from '../../components/TextFieldLocked';

export const ArbeidsgiverDropdown = ({ meta, input, ledere }) => {
    return (<div className="blokk--xl">
        <label htmlFor="velg-arbeidsgiver">Velg arbeidsgiver</label>
        <div className="selectContainer input--xxl">
            <select className={meta.touched && meta.error ? 'input--feil' : ''} id="velg-arbeidsgiver" {...input}>
                <option value="VELG">Velg arbeidsgiver</option>
                {
                    ledere
                    .sort((a, b) => {
                        if (a.navn > b.navn) {
                            return 1;
                        } else if (b.navn > a.navn) {
                            return -1;
                        }
                        return 0;
                    })
                    .sort((a, b) => {
                        if (a.organisasjonsnavn > b.organisasjonsnavn) {
                            return 1;
                        } else if (b.organisasjonsnavn > a.organisasjonsnavn) {
                            return -1;
                        }
                        return 0;
                    })
                    .map((leder, idx) => {
                        return <option value={leder.id} key={idx}>{leder.organisasjonsnavn}</option>;
                    })
                }
                <option value="manuell">Ikke oppgitt &ndash; fyll inn manuelt</option>
            </select>
        </div>
        <p className="skjema__feilmelding" aria-live="polite">{meta.touched && meta.error}</p>
    </div>);
};

ArbeidsgiverDropdown.propTypes = {
    meta: PropTypes.object,
    input: PropTypes.object,
    virksomhet: PropTypes.object,
    ledere: PropTypes.array,
};

export const hentVirksomhetHvis9Siffer = (e, hentVirksomhet, nullstillVirksomhet) => {
    const input = e.target.value;
    if (input.length === 9 && !isNaN(input)) {
        hentVirksomhet(input);
    } else {
        nullstillVirksomhet();
    }
};

const virksomhetsnavn = (virksomhet) => {
    if (!virksomhet) {
        return '';
    }
    if (virksomhet.hentingFeilet) {
        return 'Fant ikke virksomhet';
    } else if (virksomhet.henter) {
        return 'henter virksomhet...';
    } else if (virksomhet.nullstilt) {
        return '';
    }
    return virksomhet.data.navn;
};

export const FyllUtLeder = ({ FieldComponent = TextField, virksomhet, hentVirksomhet, nullstillVirksomhet }) => {
    return (<div>
        <div className="navInput blokk--xl">
            <label htmlFor="js-ledernavn">Nærmeste leders navn</label>
            <Field id="js-ledernavn" component={FieldComponent} name="deltakere[0].navn" className="input--xxl" />
        </div>
        <div className="navInput">
            <label htmlFor="js-lederepost">E-post</label>
            <Field id="js-lederepost" component={FieldComponent} type="email" name="deltakere[0].epost" className="input--xxl" />
        </div>
        <div className="navInput">
            <label htmlFor="js-orgnummer">Org. nummer</label>
            <Field id="js-orgnummer" component={FieldComponent} name="deltakere[0].orgnummer" className="input--xxl" skjulRedigerKnapp
                onKeyUp={ (e) => { hentVirksomhetHvis9Siffer(e, hentVirksomhet, nullstillVirksomhet); }} />
        </div>
        <p name="virksomhet">{ virksomhetsnavn(virksomhet) } </p>
    </div>);
};

FyllUtLeder.propTypes = {
    FieldComponent: PropTypes.func,
    virksomhet: PropTypes.object,
    hentVirksomhet: PropTypes.func,
    nullstillVirksomhet: PropTypes.func,
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
        const { ledere, untouch, nullstillVirksomhet } = this.props;
        if (valgtArbeidsgiverType === 'VELG') {
            this.fyllUtLederfelter();
        } else if (valgtArbeidsgiverType === 'manuell') {
            this.fyllUtLederfelter();
            untouch('deltakere[0].navn', 'deltakere[0].epost', 'deltakere[0].orgnummer');
            nullstillVirksomhet();
        } else {
            const leder = ledere.filter((l) => {
                return `${l.id}` === valgtArbeidsgiverType;
            })[0];
            this.fyllUtLederfelter(leder.navn, leder.epost, leder.orgnummer);
            nullstillVirksomhet();
        }
    }

    fyllUtLederfelter(navn = '', epost = '', orgnummer = '') {
        const { autofill } = this.props;
        autofill('deltakere[0].navn', navn);
        autofill('deltakere[0].epost', epost);
        autofill('deltakere[0].orgnummer', orgnummer);
    }

    render() {
        const value = this.props.arbeidsgiverType.input.value;
        const visInputfelter = value && value !== 'VELG';
        const FieldComponent = value === 'VELG' || value === 'manuell' ? TextField : TextFieldLocked;
        return (<div>
            <ArbeidsgiverDropdown {...this.props.arbeidsgiverType} ledere={this.props.ledere} />
            { visInputfelter && <FyllUtLeder FieldComponent={FieldComponent} nullstillVirksomhet={this.props.nullstillVirksomhet} hentVirksomhet={this.props.hentVirksomhet} virksomhet={this.props.virksomhet} />}
        </div>);
    }
}

LederFields.propTypes = {
    arbeidsgiverType: PropTypes.object,
    nullstillVirksomhet: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    autofill: PropTypes.func,
    virksomhet: PropTypes.object,
    untouch: PropTypes.func,
    ledere: PropTypes.array,
};
