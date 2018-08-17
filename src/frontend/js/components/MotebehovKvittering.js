import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
    toDatePrettyPrint,
} from 'digisyfo-npm';
import { tilDatoMedUkedagOgMaanedNavn } from '../utils/datoUtils';
import { Checkbox } from 'nav-frontend-skjema';

export const MotebehovKvitteringInnhold = (
    {
        ledetekster,
        motebehov,
    }) => {
    const motebehovSvar = motebehov.motebehovSvar;
    return (<div className="panel motebehovKvittering">
        { motebehov.opprettetDato &&
            <h3>{tilDatoMedUkedagOgMaanedNavn(motebehov.opprettetDato)}</h3>
        }

        { motebehovSvar.friskmeldingForventning && [
            <label key={0}>{getLedetekst('mote.svarMotebehovSkjema.friskmeldingForventning.spoersmaal', ledetekster)}</label>,
            <p key={1}>{motebehovSvar.friskmeldingForventning}</p>,
        ]}

        { motebehovSvar.tiltak && [
            <label key={0}>{getLedetekst('mote.svarMotebehovSkjema.tiltak.spoersmaal', ledetekster)}</label>,
            <p key={1}>{motebehovSvar.tiltak}</p>,
        ]}

        { motebehovSvar.tiltakResultat && [
            <label key={0}>{getLedetekst('mote.svarMotebehovSkjema.tiltakResultat.spoersmaal', ledetekster)}</label>,
            <p key={1}>{motebehovSvar.tiltakResultat}</p>,
        ]}

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
    return (<div>
        {gjeldendeOppgave ?
            <div className="skjema__input behandleMotebehovKnapp">
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
    }) => {
    return (<div className="avklaring">
        <div className="panel motebehovKvittering__header">
            <h1>
                {getLedetekst('mote.motebehov.veileder.sidetittel', ledetekster)}
            </h1>
        </div>

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
};

export default MotebehovKvittering;
