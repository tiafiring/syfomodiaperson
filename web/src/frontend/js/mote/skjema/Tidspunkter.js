import React from 'react';
import TextField from '../../components/TextField';
import { Field } from 'redux-form';
import { formaterTid, formaterDato } from '../../utils';

const Tidspunkter = () => {
    const tidspunkter = [{}, {}];

    return (<div className="motetidspunkter">
        {
            tidspunkter.map((tidspunkt, index) => {
                const datoName = `tidspunkter[${index}].dato`;
                const klokkeslettName = `tidspunkter[${index}].klokkeslett`;

                return (<div key={index} className="motetidspunkter__tidspunkt blokk js-tidspunkt">
                    <h4 className="typo-element blokk--s">Alternativ {index + 1}</h4>
                    <div className="blokk">
                        <div className="grid">
                            <div className="unit half">
                                <label htmlFor={`dato-${index}`}>Dato</label>
                                <Field parse={(e) => {
                                    return formaterDato(e);
                                }} id={`dato-${index}`} component={TextField} name={datoName} className="input-m" placeholder="dd.mm.åååå" />
                            </div>
                            <div className="unit half">
                                <label htmlFor={`klokkeslett-${index}`}>Klokkeslett</label>
                                <Field parse={(e) => {
                                    return formaterTid(e);
                                }} id={`klokkeslett-${index}`} component={TextField} name={klokkeslettName} className="input-m" placeholder="F.eks: 09.30" />
                            </div>
                        </div>
                    </div>
                </div>);
            })
        }
    </div>);
};

export default Tidspunkter;
