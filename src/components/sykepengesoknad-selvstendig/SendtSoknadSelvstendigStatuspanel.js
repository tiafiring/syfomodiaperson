import React from 'react';
import { getHtmlLedetekst, getLedetekst, SykmeldingNokkelOpplysning, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import Statuspanel, { Statusopplysninger, StatusNokkelopplysning } from '../Statuspanel';
import { soknad as soknadPt } from '../../propTypes';
import { VerktoyKnapp, Verktoylinje } from '../Verktoylinje';

const SendtSoknadSelvstendigStatuspanel = ({ soknad }) => {
    const ETT_AAR_SIDEN = new Date();
    ETT_AAR_SIDEN.setYear(ETT_AAR_SIDEN.getFullYear() - 1);
    const visEndreknapp = soknad.opprettetDato >= ETT_AAR_SIDEN;

    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p>{getLedetekst('sykepengesoknad.status.SENDT.til-nav')}</p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.dato.innsendt')}>
                <p>{tilLesbarDatoMedArstall(soknad.innsendtDato)}</p>
            </StatusNokkelopplysning>
            <SykmeldingNokkelOpplysning className="sist" tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel')}>
                <p dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.sykepengeinfo.til-nav')} />
            </SykmeldingNokkelOpplysning>
        </Statusopplysninger>
        {
            visEndreknapp
            && (<Verktoylinje>
                <VerktoyKnapp>Endre søknad</VerktoyKnapp>
            </Verktoylinje>)
        }
    </Statuspanel>);
};

SendtSoknadSelvstendigStatuspanel.propTypes = {
    soknad: soknadPt,
};

export default SendtSoknadSelvstendigStatuspanel;
