import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    getHtmlLedetekst,
    keyValue,
    toDatePrettyPrint,
} from 'digisyfo-npm';
import { tilDatoMedUkedagOgMaanedNavn } from '../utils/datoUtils';
import { Checkbox } from 'nav-frontend-skjema';
import Sidetopp from './Sidetopp';

export const finnRiktigLeder = (motebehov, ledere) => {
    return ledere.filter(leder => {
        return leder.orgnummer === motebehov.virksomhetsnummer;
    })[0];
};

export const MotebehovKvitteringHeader = (
    {
        motebehov,
        ledetekster,
        ledere,
    }) => {
    const riktigLeder = finnRiktigLeder(motebehov, ledere);
    return (<div className="motebehovKvitteringHeader" >
        {
            motebehov.opprettetDato && <p className="datoLinje">{tilDatoMedUkedagOgMaanedNavn(motebehov.opprettetDato)}</p>
        }
        {
            riktigLeder ?
                <p className="fraLinje">
                    {
                        getLedetekst('mote.motebehovSvar.innsendtAv', ledetekster, {
                            '%NAERMESTELEDER%': riktigLeder.navn,
                            '%ORGANISASJONSNAVN%': riktigLeder.organisasjonsnavn,
                        })
                    }
                </p>
                :
                <p className="fraLinje">
                    {
                        getLedetekst('mote.motebehovSvar.innsendtAv.ingenLeder', ledetekster)
                    }
                </p>
        }
    </div>);
};

MotebehovKvitteringHeader.propTypes = {
    motebehov: PropTypes.object,
    ledetekster: keyValue,
    ledere: PropTypes.array,
};

export const MotebehovSpeilBilde = (
    {
        ledetekster,
    }) => {
    const bildeSti = '/sykefravaer/img/svg/nav-ansatt--mannlig.svg';
    const bildeAlt = 'nav-ansatt--mannlig';
    return (<div className="motebehovSpeilBilde">
        <img src={bildeSti} alt={bildeAlt} />
        <span>{getLedetekst('mote.motebehov.dialogmoteInfo.bjorn', ledetekster)}</span>
    </div>);
};

MotebehovSpeilBilde.propTypes = {
    ledetekster: keyValue,
};

export const MotebehovSpeilInfo = (
    {
        ledetekster,
    }) => {
    return (<div className="motebehovSpeilInfo">
        <p className="forSvar">Før du svarer:</p>
        <div dangerouslySetInnerHTML={getHtmlLedetekst('mote.motebehov.dialogmoteInfo.kulepunkt', ledetekster)} />
        <div dangerouslySetInnerHTML={getHtmlLedetekst('mote.motebehov.dialogmoteInfo', ledetekster)} />
    </div>);
};

MotebehovSpeilInfo.propTypes = {
    ledetekster: keyValue,
};

export const MotebehovSpeil = (
    {
        ledetekster,
    }) => {
    return (<div className="panel motebehovSpeil">
        <MotebehovSpeilBilde ledetekster={ledetekster} />

        <MotebehovSpeilInfo ledetekster={ledetekster} />
    </div>);
};

MotebehovSpeil.propTypes = {
    ledetekster: keyValue,
};

export const MotebehovKvitteringInnhold = (
    {
        ledetekster,
        motebehov,
    }) => {
    const motebehovSvar = motebehov.motebehovSvar;
    return (<div className="panel motebehovKvitteringInnhold">
        { motebehovSvar.harMotebehov !== undefined && [
            <label key={0}>{getLedetekst('mote.svarMotebehovSkjema.harMotebehov.spoersmaal', ledetekster)}</label>,
            <p key={1}>
                {`${motebehovSvar.harMotebehov ?
                    getLedetekst('mote.svarMotebehovSkjema.harMotebehov.svar.ja', ledetekster)
                    :
                    getLedetekst('mote.svarMotebehovSkjema.harMotebehov.svar.nei', ledetekster)
                }`}
            </p>,
        ]}

        { motebehovSvar.forklaring && [
            <label key={0}>{getLedetekst('mote.svarMotebehovSkjema.forklaring.spoersmaal')}</label>,
            <p key={1}>{motebehovSvar.forklaring}</p>,
        ]}
    </div>);
};

MotebehovKvitteringInnhold.propTypes = {
    ledetekster: keyValue,
    motebehov: PropTypes.object,
};

const erOppgaveFullfoert = (oppgave) => {
    return oppgave.status === 'FERDIG';
};

const seMotebehovOppgave = (oppgaver, motebehovet) => {
    return oppgaver.filter((oppgave) => {
        return oppgave.type === 'MOTEBEHOV_MOTTATT' && oppgave.uuid === motebehovet.id;
    })[0];
};

export const BehandleMotebehovKnapp = (
    {
        oppgaver,
        veilederinfo,
        fnr,
        actions,
        motebehovet,
    }) => {
    const gjeldendeOppgave = seMotebehovOppgave(oppgaver, motebehovet);
    return (<div className="behandleMotebehovKnapp">
        {gjeldendeOppgave ?
            <div className="skjema__input">
                <Checkbox
                    label={gjeldendeOppgave.status === 'FERDIG' ? `Ferdig behandlet av ${gjeldendeOppgave.sistEndretAv} ${toDatePrettyPrint(gjeldendeOppgave.sistEndret)}` : 'Marker som behandlet'}
                    onClick={() => {
                        actions.behandleOppgave(gjeldendeOppgave.id, {
                            status: 'FERDIG',
                            sistEndretAv: veilederinfo.ident,
                        }, fnr);
                    }}
                    id="marker__utfoert"
                    disabled={erOppgaveFullfoert(gjeldendeOppgave)}
                    checked={erOppgaveFullfoert(gjeldendeOppgave)} />
            </div> : <p>Fant dessverre ingen oppgave knyttet til denne avklaringen</p>
        }
    </div>);
};

BehandleMotebehovKnapp.propTypes = {
    oppgaver: PropTypes.arrayOf(PropTypes.object),
    veilederinfo: PropTypes.object,
    fnr: PropTypes.string,
    actions: PropTypes.object,
    motebehovet: PropTypes.object,
};

export const MotebehovKvittering = (
    {
        ledetekster,
        motebehov,
        oppgaver,
        veilederinfo,
        fnr,
        actions,
        motebehovet,
        ledere,
    }) => {
    return (<div className="motebehovKvittering">
        <Sidetopp tittel={getLedetekst('mote.motebehov.veileder.sidetittel')} />

        <MotebehovKvitteringHeader
            motebehov={motebehov}
            ledetekster={ledetekster}
            ledere={ledere}
        />

        <MotebehovSpeil
            motebehov={motebehov}
        />

        <MotebehovKvitteringInnhold
            ledetekster={ledetekster}
            motebehov={motebehov}
        />

        <BehandleMotebehovKnapp
            oppgaver={oppgaver}
            veilederinfo={veilederinfo}
            fnr={fnr}
            actions={actions}
            motebehovet={motebehovet}
        />
    </div>);
};

MotebehovKvittering.propTypes = {
    ledetekster: keyValue,
    motebehov: PropTypes.object,
    oppgaver: PropTypes.arrayOf(PropTypes.object),
    veilederinfo: PropTypes.object,
    fnr: PropTypes.string,
    actions: PropTypes.object,
    motebehovet: PropTypes.object,
    ledere: PropTypes.array,
};

export default MotebehovKvittering;
