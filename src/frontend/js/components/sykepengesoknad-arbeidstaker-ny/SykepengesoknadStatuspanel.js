import React from 'react';
import { getLedetekst, sykepengesoknadstatuser } from '@navikt/digisyfo-npm';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import hentStatustekst from '../../utils/soknad-felles/hentSoknadStatustekst';
import hentSykepengetekst from '../../utils/soknad-felles/hentSykepengetekst';
import { soknad as soknadPt } from '../../propTypes/index';
import { VerktoyKnapp, Verktoylinje } from '../Verktoylinje';

const StatusOgSykepengeopplysninger = ({ soknad }) => {
    return (<Statusopplysninger>
        <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
            <p>{hentStatustekst(soknad)}</p>
        </StatusNokkelopplysning>
        <StatusNokkelopplysning tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel')}>
            <p dangerouslySetInnerHTML={hentSykepengetekst(soknad)} />
        </StatusNokkelopplysning>
    </Statusopplysninger>);
};

StatusOgSykepengeopplysninger.propTypes = {
    soknad: soknadPt,
};

const SykepengesoknadStatuspanel = ({ soknad }) => {
    const ETT_AAR_SIDEN = new Date();
    ETT_AAR_SIDEN.setYear(ETT_AAR_SIDEN.getFullYear() - 1);
    const visEndreknapp = soknad.opprettetDato >= ETT_AAR_SIDEN
        && soknad.status === sykepengesoknadstatuser.SENDT;

    return (<Statuspanel enKolonne>
        <StatusOgSykepengeopplysninger soknad={soknad} />
        {
            visEndreknapp
            && (<Verktoylinje>
                <VerktoyKnapp>Endre søknad</VerktoyKnapp>
            </Verktoylinje>)
        }
    </Statuspanel>);
};

SykepengesoknadStatuspanel.propTypes = {
    soknad: soknadPt,
};

export default SykepengesoknadStatuspanel;
