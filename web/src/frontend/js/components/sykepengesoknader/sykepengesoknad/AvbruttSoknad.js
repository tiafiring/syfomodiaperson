import React from 'react';
import { getLedetekst, Varselstripe, SykmeldingNokkelOpplysning, toDatePrettyPrint } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';

const Verktoylinje = () => {
    return (<div>
        <div className="verktoylinje">
            <div className="verktoylinje__element">
                <button disabled className="rammeknapp rammeknapp--mini">{getLedetekst('sykepengesoknad.gjenapne.knapp')}</button>
            </div>
        </div>
    </div>);
};

const AvbruttSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <div className="panel blokk--l">
            <Varselstripe ikon="/sykefravaer/img/svg/avbryt-sykmelding.svg">
                <div>
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
            </Varselstripe>
        </div>
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

AvbruttSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default AvbruttSoknad;
