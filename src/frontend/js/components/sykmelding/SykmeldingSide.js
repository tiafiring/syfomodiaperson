import React from 'react';
import PropTypes from 'prop-types';
import { sykmeldingstatuser } from '@navikt/digisyfo-npm';
import DinSykmelding from './DinSykmelding';
import DinSendteSykmelding from './DinSendteSykmelding';
import DinBekreftedeSykmelding from './DinBekreftedeSykmelding';
import DinAvbrutteSykmelding from './DinAvbrutteSykmelding';
import DinUtgaatteSykmelding from './DinUtgaatteSykmelding';
import LenkeTilDineSykmeldinger from './LenkeTilDineSykmeldinger';
import Feilmelding from '../Feilmelding';
import { erDev } from '../../selectors/toggleSelectors';

const SykmeldingSide = ({ dinSykmelding, arbeidsgiversSykmelding, ledetekster, fnr }) => {
    return (
        (() => {
            if (dinSykmelding.status === sykmeldingstatuser.SENDT && (arbeidsgiversSykmelding || erDev())) {
                return (<div>
                    <DinSendteSykmelding
                        dinSykmelding={dinSykmelding}
                        arbeidsgiversSykmelding={arbeidsgiversSykmelding}
                        ledetekster={ledetekster} />
                    <LenkeTilDineSykmeldinger ledetekster={ledetekster} fnr={fnr} />
                </div>);
            } else if (dinSykmelding.status === sykmeldingstatuser.BEKREFTET) {
                return (<div>
                    <DinBekreftedeSykmelding
                        dinSykmelding={dinSykmelding}
                        arbeidsgiversSykmelding={arbeidsgiversSykmelding}
                        ledetekster={ledetekster} />
                    <LenkeTilDineSykmeldinger ledetekster={ledetekster} fnr={fnr} />
                </div>);
            } else if (dinSykmelding.status === sykmeldingstatuser.UTGAATT) {
                return (<div>
                    <DinUtgaatteSykmelding
                        sykmelding={dinSykmelding}
                        ledetekster={ledetekster} />
                    <LenkeTilDineSykmeldinger ledetekster={ledetekster} fnr={fnr} />
                </div>);
            } else if (dinSykmelding.status === sykmeldingstatuser.NY) {
                return (<div>
                    <DinSykmelding
                        sykmelding={dinSykmelding}
                        ledetekster={ledetekster} />
                    <LenkeTilDineSykmeldinger ledetekster={ledetekster} fnr={fnr} />
                </div>);
            } else if (dinSykmelding.status === sykmeldingstatuser.AVBRUTT) {
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
