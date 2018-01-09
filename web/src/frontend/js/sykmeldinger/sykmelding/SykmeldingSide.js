import React from 'react';
import PropTypes from 'prop-types';
import DinSykmelding from './DinSykmelding';
import DinSendteSykmelding from './DinSendteSykmelding';
import DinBekreftedeSykmelding from './DinBekreftedeSykmelding';
import DinAvbrutteSykmelding from './DinAvbrutteSykmelding';
import DinUtgaatteSykmelding from './DinUtgaatteSykmelding';
import LenkeTilDineSykmeldinger from './LenkeTilDineSykmeldinger';
import Feilmelding from '../../components/Feilmelding';

const SykmeldingSide = ({ dinSykmelding, arbeidsgiversSykmelding, ledetekster, fnr }) => {
    return (
        (() => {
            if (dinSykmelding.status === 'SENDT' && arbeidsgiversSykmelding && arbeidsgiversSykmelding) {
                return (<div>
                    <DinSendteSykmelding
                        dinSykmelding={dinSykmelding}
                        arbeidsgiversSykmelding={arbeidsgiversSykmelding}
                        ledetekster={ledetekster} />
                    <LenkeTilDineSykmeldinger ledetekster={ledetekster} fnr={fnr} />
                </div>);
            } else if (dinSykmelding.status === 'BEKREFTET') {
                return (<div>
                    <DinBekreftedeSykmelding
                        dinSykmelding={dinSykmelding}
                        arbeidsgiversSykmelding={arbeidsgiversSykmelding}
                        ledetekster={ledetekster} />
                    <LenkeTilDineSykmeldinger ledetekster={ledetekster} fnr={fnr} />
                </div>);
            } else if (dinSykmelding.status === 'UTGAATT') {
                return (<div>
                    <DinUtgaatteSykmelding
                        sykmelding={dinSykmelding}
                        ledetekster={ledetekster} />
                    <LenkeTilDineSykmeldinger ledetekster={ledetekster} fnr={fnr} />
                </div>);
            } else if (dinSykmelding.status === 'NY') {
                return (<div>
                    <DinSykmelding
                        sykmelding={dinSykmelding}
                        ledetekster={ledetekster} />
                        <LenkeTilDineSykmeldinger ledetekster={ledetekster} fnr={fnr} />
                    </div>);
            } else if (dinSykmelding.status === 'AVBRUTT') {
                return (<div>
                    <DinAvbrutteSykmelding
                        sykmelding={dinSykmelding}
                        ledetekster={ledetekster} />
                    <LenkeTilDineSykmeldinger ledetekster={ledetekster} fnr={fnr} />
                </div>);
            }
            return <Feilmelding tittel="Sykmeldingen har ukjent status" />;
        })()
        );
};

SykmeldingSide.propTypes = {
    ledetekster: PropTypes.object,
    dinSykmelding: PropTypes.object,
    arbeidsgiversSykmelding: PropTypes.object,
    fnr: PropTypes.string,
};

export default SykmeldingSide;
