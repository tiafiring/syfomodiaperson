import React from 'react';
import { getLedetekst, SykmeldingNokkelOpplysning, toDatePrettyPrint } from 'digisyfo-npm';
import KnappBase from 'nav-frontend-knapper';
import SykmeldingUtdrag from '../../connected-components/SykmeldingUtdrag';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes/index';
import PropTypes from 'prop-types';

const Verktoylinje = () => {
    return (<div className="verktoylinje">
        <div className="verktoylinje__element">
            <KnappBase
                type="standard"
                mini
                disabled>
                {getLedetekst('sykepengesoknad.gjenapne.knapp')}
            </KnappBase>
        </div>
    </div>);
};

const AvbruttSoknad = ({ sykepengesoknad, fnr }) => {
    return (<div>
        <div className="panel panel--komprimert blokk">
            <div>
                <div className="statusopplysninger">
                    <SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" Overskrift="h2" tittel="Status">
                        <p>
                            {getLedetekst(`sykepengesoknad.status.${sykepengesoknad.status}`)}
                        </p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" Overskrift="h2" tittel="Dato avbrutt">
                        <p>
                            {toDatePrettyPrint(sykepengesoknad.avbruttDato)}
                        </p>
                    </SykmeldingNokkelOpplysning>
                </div>
            </div>
            <Verktoylinje />
        </div>
        <SykmeldingUtdrag soknad={sykepengesoknad} fnr={fnr} erApen />
    </div>);
};

AvbruttSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    fnr: PropTypes.string,
};

export default AvbruttSoknad;
