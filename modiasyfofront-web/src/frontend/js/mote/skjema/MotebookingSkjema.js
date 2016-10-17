import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

const TextField = (props) => {
    const { meta } = props;

    return (<div>
        <input type={props.type || 'text'} id={props.id} className={`${props.className} ${(meta.touched && meta.error && 'input--feil')}`} {...props.input} />
        <p className="skjema__feilmelding" aria-live="polite">{meta.touched && meta.error}</p>
    </div>);
};

TextField.propTypes = {
    meta: PropTypes.object,
    id: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    className: PropTypes.string,
};

const Tidspunkter = () => {
    const tidspunkter = [{}, {}];

    return (<div>
        {
            tidspunkter.map((tidspunkt, index) => {
                const datofelt = `tidspunkter[${index}].dato`;
                const klokkeslettfelt = `tidspunkter[${index}].klokkeslett`;

                return (<div key={index}>
                    <h4>Alternativ {index + 1}</h4>
                    <div className="blokk">
                        <div className="rad">
                            <div className="kolonne kolonne--auto">
                                <label htmlFor={`dato-${index}`}>Dato</label>
                                <Field id={`dato-${index}`} component={TextField} name={datofelt} className="input--s" />
                            </div>
                            <div className="kolonne">
                                <label htmlFor={`klokkeslett-${index}`}>Klokkeslett</label>
                                <Field id={`klokkeslett-${index}`} component={TextField} name={klokkeslettfelt} className="input--xs" />
                            </div>
                        </div>
                    </div>
                </div>);
            })
        }
    </div>);
};

class MotebookingSkjema extends Component {
    handleSubmit(data) {
        const { fnr } = this.props;
        this.props.opprettMote(fnr, data);
    }

    render() {
        const { handleSubmit } = this.props;

        return (<form className="panel" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <h3 className="typo-innholdstittel">Book møte</h3>

            <fieldset className="blokk-xl">
                <legend>Arbeidsgiveren</legend>
                <div className="nav-input">
                    <label htmlFor="navn">Navn</label>
                    <Field id="navn" component={TextField} name="naermesteLederNavn" className="input--l" />
                </div>
                <div className="nav-input">
                    <label htmlFor="navn">E-post</label>
                    <Field id="navn" component={TextField} type="email" name="naermesteLederEpost" className="input--l" />
                </div>
            </fieldset>

            <fieldset className="blokk-xl">
                <legend>Møte</legend>
                <Tidspunkter />
                <label htmlFor="sted">Sted</label>
                <Field id="sted" component={TextField} name="moetested" className="input--l" />
            </fieldset>

            <input type="submit" className="knapp" value="Send møteforespørsel" />

        </form>);
    }
}

MotebookingSkjema.propTypes = {
    fnr: PropTypes.string,
    skjemaData: PropTypes.object,
    handleSubmit: PropTypes.func,
    opprettMote: PropTypes.func,
};

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validate(values) {
    const feilmeldinger = {};
    let tidspunkterFeilmeldinger = [{}, {}];

    if (!values.naermesteLederNavn) {
        feilmeldinger.naermesteLederNavn = 'Vennligst fyll ut nærmeste leders navn';
    }

    if (!values.naermesteLederEpost) {
        feilmeldinger.naermesteLederEpost = 'Vennligst fyll ut nærmeste leders e-post-adresse';
    } else if (!validateEmail(values.naermesteLederEpost)) {
        feilmeldinger.naermesteLederEpost = 'Vennligst fyll ut en gyldig e-post-adresse';
    }

    if (!values.tidspunkter || !values.tidspunkter.length) {
        tidspunkterFeilmeldinger = [{
            dato: 'Vennligst angi dato',
            klokkeslett: 'Vennligst angi klokkeslett',
        }, {
            dato: 'Vennligst angi dato',
            klokkeslett: 'Vennligst angi klokkeslett',
        }];
    } else {
        tidspunkterFeilmeldinger = tidspunkterFeilmeldinger.map((tidspunkt, index) => {
            const tidspunktValue = values.tidspunkter[index];
            const feil = {};
            if (!tidspunktValue || !tidspunktValue.klokkeslett) {
                feil.klokkeslett = 'Vennligst angi klokkeslett';
            }
            if (!tidspunktValue || !tidspunktValue.dato) {
                feil.dato = 'Vennligst angi dato';
            }
            return feil;
        });
    }

    if (tidspunkterFeilmeldinger !== [{}, {}]) {
        feilmeldinger.tidspunkter = tidspunkterFeilmeldinger;
    }

    if (!values.moetested) {
        feilmeldinger.moetested = 'Vennligst angi møtested';
    }

    return feilmeldinger;
}

MotebookingSkjema = reduxForm({
    form: 'opprettMote',
    validate,
})(MotebookingSkjema);

export default MotebookingSkjema;
