import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import DatePicker from 'nav-datepicker';

class DatepickerField extends Component {
    render () {
        return <input ref="jsDatePicker" type="text" className="input--s" {...this.props.input} />
    }
}

const Tidspunker = ({ fields }) => {
    const tidspunkter = [{}, {}];
    return (<div>
        {
            tidspunkter.map((tidspunkt, index) => {
                return (<div key={index}>
                    <h4>Alternativ {index + 1}</h4>
                    <div className="blokk">
                        <div className="rad">
                            <div className="kolonne kolonne--auto">    
                                <label htmlFor={`dato-${index}`}>Dato</label>
                                <Field id={`dato-${index}`} component={DatepickerField} type="date" name={`tidspunkter[${index}].dato`} className="datovelger input--s" />
                            </div>
                            <div className="kolonne">
                                <label htmlFor={`klokkeslett-${index}`}>Klokkeslett</label>
                                <Field id={`klokkeslett-${index}`} component="input" type="text" name={`tidspunkter[${index}].klokkeslett`} className="input--xs" />
                            </div>
                        </div>
                    </div>
                </div>)
            })
        }
    </div>);
}

class MotebookingSkjema extends Component {

    handleSubmit (data) {
        const { fnr } = this.props;
        this.props.opprettMote(fnr, data);
    }

    render () {
        const { handleSubmit } = this.props;
        console.log(this.props)
        return (<form className="panel" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <h3 className="typo-innholdstittel">Book møte</h3>

            <fieldset className="blokk-xl">
                <legend>Arbeidsgiveren</legend>
                <div className="nav-input">
                    <label htmlFor="navn">Navn</label>
                    <Field id="navn" component="input" type="text" name="naermesteLeder.navn" className="input--l" />
                </div>
                <div className="nav-input">
                    <label htmlFor="navn">E-post</label>
                    <Field id="navn" component="input" type="email" name="naermesteLeder.epost" className="input--l" />
                </div>
            </fieldset>

            <fieldset className="blokk-xl">
                <legend>Møte</legend>
                <Tidspunker />
                <label htmlFor="sted">Sted</label>
                <Field id="sted" component="input" type="text" name="sted" className="input--l" />
            </fieldset>

            <input type="submit" className="knapp" value="Send møteforespørsel" />

        </form>)
    }

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validate(values) {
    let feilmeldinger = {};
    let lederFeilmeldinger = {};
    let tidspunkterFeilmeldinger = [{}, {}]

    if (!values.naermesteLeder || !values.naermesteLeder.navn) {
        lederFeilmeldinger.navn = "Vennligst fyll ut nærmeste leders navn";
    }

    if (!values.naermesteLeder || !values.naermesteLeder.epost) {
        lederFeilmeldinger.epost = "Vennligst fyll ut nærmeste leders e-post-adresse";
    } else if (!validateEmail(values.naermesteLeder.epost)) {
        lederFeilmeldinger.epost = "Vennligst fyll ut en gyldig e-post-adresse";
    }

    if (lederFeilmeldinger !== {}) {
        feilmeldinger.naermesteLeder = lederFeilmeldinger;
    }

    if(!values.tidspunkter || !values.tidspunkter.length) {
        tidspunkterFeilmeldinger = [{
            dato: "Vennligst angi dato",
            klokkeslett: "Vennligst angi klokkeslett"
        }, {
            dato: "Vennligst angi dato",
            klokkeslett: "Vennligst angi klokkeslett"
        }];
    } else {
        tidspunkterFeilmeldinger = tidspunkterFeilmeldinger.map((tidspunkt, index) => {
            const tidspunktValue = values.tidspunkter[index];
            const feil = {};
            if (!tidspunktValue || !tidspunktValue.klokkeslett) {
                feil.klokkeslett = "Vennligst angi klokkeslett";
            }
            if (!tidspunktValue || !tidspunktValue.dato) {
                feil.dato = "Vennligst angi dato";
            }
            return feil;
        });
    }

    if (tidspunkterFeilmeldinger !== [{}, {}]) {
        feilmeldinger.tidspunkter = tidspunkterFeilmeldinger;
    }

    if (!values.moetested) {
        feilmeldinger.moetested = "Vennligst angi møtested";
    }

    return feilmeldinger;
}

MotebookingSkjema = reduxForm({
    form: 'opprettMote',
    validate,
})(MotebookingSkjema);

export default MotebookingSkjema;
