import React from 'react';
import {
    getLedetekst,
    Utvidbar,
    sykmelding as sykmeldingPt,
    tilLesbarDatoMedArstall,
    getHtmlLedetekst,
    SykmeldingNokkelOpplysning,
} from 'digisyfo-npm';
import PropTypes from 'prop-types';
import Oppsummeringsvisning from '../soknad-felles-oppsummering/Oppsummeringsvisning';
import { soknad as soknadPt } from '../../propTypes';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';
import SoknadSpeiling from '../sykepengesoknad-felles/SoknadSpeiling';
import { FREMTIDIG, NY } from '../../enums/soknadstatuser';
import IkkeInnsendtSoknad from '../sykepengesoknad-felles/IkkeInnsendtSoknad';
import { VerktoyKnapp, Verktoylinje } from '../sykepengesoknad-arbeidstaker/EndreSendKnapperad';

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

const SykepengesoknadSelvstendig = (props) => {
    const { soknad, fnr } = props;
    switch (soknad.status) {
        case NY:
        case FREMTIDIG: {
            return <IkkeInnsendtSoknad fnr={fnr} />;
        }
        default: {
            return (<SoknadSpeiling {...props}>
                <SendtSoknadSelvstendigStatuspanel soknad={props.soknad} />
                <Utvidbar tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')} className="blokk js-soknad-oppsummering" erApen>
                    <Oppsummeringsvisning
                        soknad={Object.assign({}, soknad, {
                            sporsmal: soknad.sporsmal.filter((s) => {
                                return s.tag !== VAER_KLAR_OVER_AT;
                            }),
                        })} />
                </Utvidbar>
                <div className="panel">
                    <Oppsummeringsvisning
                        soknad={Object.assign({}, soknad, {
                            sporsmal: soknad.sporsmal.filter((s) => {
                                return s.tag === VAER_KLAR_OVER_AT;
                            }),
                        })} />
                </div>
            </SoknadSpeiling>);
        }
    }
};

SykepengesoknadSelvstendig.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    fnr: PropTypes.string,
};

export default SykepengesoknadSelvstendig;
