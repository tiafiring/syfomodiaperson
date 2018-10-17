import React from 'react';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import SykmeldingUtdrag from '../../connected-components/SykmeldingUtdrag';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes/index';
import PropTypes from 'prop-types';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import { VerktoyKnapp } from '../Verktoylinje';
import { Verktoylinje } from '../Verktoylinje';

const VerktoylinjeGjenapne = () => {
    return (<Verktoylinje>
        <VerktoyKnapp>{getLedetekst('sykepengesoknad.gjenapne.knapp')}</VerktoyKnapp>
    </Verktoylinje>);
};

const AvbruttSoknad = ({ sykepengesoknad, fnr }) => {
    return (<div>
        <Statuspanel>
            <Statusopplysninger>
                <StatusNokkelopplysning tittel="Status">
                    <p>
                        {getLedetekst(`sykepengesoknad.status.${sykepengesoknad.status}`)}
                    </p>
                </StatusNokkelopplysning>
                <StatusNokkelopplysning tittel="Dato avbrutt">
                    <p>
                        {toDatePrettyPrint(sykepengesoknad.avbruttDato)}
                    </p>
                </StatusNokkelopplysning>
            </Statusopplysninger>
            <VerktoylinjeGjenapne />
        </Statuspanel>
        <SykmeldingUtdrag soknad={sykepengesoknad} fnr={fnr} erApen />
    </div>);
};

AvbruttSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    fnr: PropTypes.string,
};

export default AvbruttSoknad;
