import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
} from 'digisyfo-npm';
import { tilDatoMedUkedagOgMaanedNavn } from '../utils/datoUtils';

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

export const MotebehovKvittering = (
    {
        ledetekster,
        motebehov,
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
    </div>);
};

MotebehovKvittering.propTypes = {
    ledetekster: keyValue,
    motebehov: PropTypes.object,
};

export default MotebehovKvittering;
