import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'nav-frontend-grid';
import Datovelger from '../../components/datovelger/Datovelger';
import KlokkeslettField from '../../components/KlokkeslettField';
import { Field } from 'redux-form';
import { formaterTid } from '../../utils';

const Tidspunkt = ({ tidspunkt, skjemanavn }) => {
    const datoName = `tidspunkter[${tidspunkt}].dato`;
    const klokkeslettName = `tidspunkter[${tidspunkt}].klokkeslett`;
    const tidligsteFom = new Date();

    return (<div className="motetidspunkter__tidspunkt blokk js-tidspunkt">
        <h4 className="typo-element blokk--s">Nytt tidspunkt</h4>
        <div className="blokk">
            <Row>
                <Column className="col-xs-12 col-sm-6">
                    <label className="skjemaelement__label" htmlFor={`dato-${tidspunkt}`}>Dato</label>
                    <Datovelger
                        tidligsteFom={tidligsteFom}
                        id={`dato-${tidspunkt}`}
                        name={datoName}
                        placeholder="dd.mm.åååå"
                        skjemanavn={skjemanavn} />
                </Column>
                <Column className="col-xs-12 col-sm-6">
                    <label className="skjemaelement__label" htmlFor={`klokkeslett-${tidspunkt}`}>Klokkeslett</label>
                    <Field
                        parse={(e) => {
                            return formaterTid(e);
                        }}
                        id={`klokkeslett-${tidspunkt}`}
                        component={KlokkeslettField}
                        name={klokkeslettName}
                        className="input--s"
                        placeholder="F.eks: 09.30" />
                </Column>
            </Row>
        </div>
    </div>);
};

Tidspunkt.propTypes = {
    tidspunkt: PropTypes.number,
    skjemanavn: PropTypes.string.isRequired,
};

export default Tidspunkt;
