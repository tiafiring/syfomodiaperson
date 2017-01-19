import React, {PropTypes} from "react";
import TextField from "../../components/TextField";
import {Field} from "redux-form";
import {formaterTid, formaterDato} from "../../utils/index";

const Tidspunkt = ({ tidspunkt, tidspunktNummerOffset }) => {
    const offset = tidspunktNummerOffset || 0;
    const datoName = `tidspunkter[${tidspunkt}].dato`;
    const klokkeslettName = `tidspunkter[${tidspunkt}].klokkeslett`;

    return (<div key={tidspunkt} className="motetidspunkter__tidspunkt blokk js-tidspunkt">
        <h4 className="typo-element blokk--s">Alternativ {tidspunkt + 1 + offset}</h4>
        <div className="blokk">
            <div className="grid">
                <div className="unit half">
                    <label htmlFor={`dato-${tidspunkt}`}>Dato</label>
                    <Field parse={(e) => {
                        return formaterDato(e);
                    }} id={`dato-${tidspunkt}`} component={TextField} name={datoName} className="input-m"
                        placeholder="dd.mm.åååå" />
                </div>
                <div className="unit half">
                    <label htmlFor={`klokkeslett-${tidspunkt}`}>Klokkeslett</label>
                    <Field parse={(e) => {
                        return formaterTid(e);
                    }} id={`klokkeslett-${tidspunkt}`} component={TextField} name={klokkeslettName} className="input-m"
                        placeholder="F.eks: 09.30" />
                </div>
            </div>
        </div>
    </div>);
};

Tidspunkt.propTypes = {
    tidspunkt: PropTypes.number,
    tidspunktNummerOffset: PropTypes.number,
};


export default Tidspunkt;
