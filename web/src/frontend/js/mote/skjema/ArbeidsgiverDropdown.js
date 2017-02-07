import React, { PropTypes } from 'react';

const ArbeidsgiverDropdown = ({ meta, input, ledere }) => {
    return (<div className="blokk">
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

export default ArbeidsgiverDropdown;
