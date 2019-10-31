import React from 'react';
import { getLedetekst, sykmelding as sykmeldingPt, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import { Frilansersporsmal } from './SykmeldingStatuspanelOpplysning';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import AngreBekreftSykmelding from '../../connected-components/AngreBekreftSykmelding';

const BekreftetSykmeldingStatuspanel = ({ sykmelding }) => {
    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p className="js-status">
                    {getLedetekst(`statuspanel.status.${sykmelding.status}`)} – {tilLesbarDatoMedArstall(sykmelding.sendtdato)}
                </p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel={getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}>
                <p className="js-arbeidssituasjon">
                    {getLedetekst(`din-sykmelding.arbeidssituasjon.alternativ.${sykmelding.valgtArbeidssituasjon.toLowerCase()}`)}
                </p>
            </StatusNokkelopplysning>
            <Frilansersporsmal sykmelding={sykmelding} />
        </Statusopplysninger>
        <AngreBekreftSykmelding sykmelding={sykmelding} />
    </Statuspanel>);
};

BekreftetSykmeldingStatuspanel.propTypes = {
    sykmelding: sykmeldingPt,
};

export default BekreftetSykmeldingStatuspanel;
