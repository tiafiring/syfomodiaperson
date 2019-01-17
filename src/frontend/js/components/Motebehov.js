import React from 'react';
import PropTypes from 'prop-types';
import Sidetopp from './Sidetopp';
import MotebehovKvittering from './MotebehovKvittering';
import BehandleMotebehovKnapp from './BehandleMotebehovKnapp';

const Motebehov = (
    {
        actions,
        fnr,
        ledereData,
        ledereUtenInnsendtMotebehov,
        motebehovListe,
        oppgaver,
        sykmeldt,
        ufiltrertMotebehovListeTilOppgavebehandling,
        veilederinfo,
    }) => {
    return (<div className="motebehovSide">
        <Sidetopp tittel={'Avklaring dialogmøte'} />
        <MotebehovKvittering
            ledereData={ledereData}
            ledereUtenInnsendtMotebehov={ledereUtenInnsendtMotebehov}
            motebehovListe={motebehovListe}
            sykmeldt={sykmeldt}
        />
        <BehandleMotebehovKnapp
            actions={actions}
            fnr={fnr}
            motebehovListe={ufiltrertMotebehovListeTilOppgavebehandling}
            oppgaver={oppgaver}
            veilederinfo={veilederinfo}
        />
    </div>);
};

Motebehov.propTypes = {
    actions: PropTypes.object,
    fnr: PropTypes.string,
    ledereData: PropTypes.arrayOf(PropTypes.object),
    ledereUtenInnsendtMotebehov: PropTypes.arrayOf(PropTypes.object),
    motebehovListe: PropTypes.arrayOf(PropTypes.object),
    oppgaver: PropTypes.arrayOf(PropTypes.object),
    sykmeldt: PropTypes.object,
    ufiltrertMotebehovListeTilOppgavebehandling: PropTypes.arrayOf(PropTypes.object),
    veilederinfo: PropTypes.object,
};

export default Motebehov;
