import React from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';

export const Feilside = () => {
    return (
        <div >
            <Feilmelding tittel="Du mangler bruker" melding={{ __html: "<p>Vi kan ikke se at du har søkt opp en bruker. Søk opp brukeren du ønsker å se i søkefeltet øverst på siden.</p>" }} />
        </div>
    );
};

export function mapStateToProps() {
    return {};
}

const FeilsideContainer = connect(mapStateToProps)(Feilside);

export default FeilsideContainer;
