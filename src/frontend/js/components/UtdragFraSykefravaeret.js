import React from 'react';
import PropTypes from 'prop-types';
import {
    senesteTom,
    tidligsteFom,
    tilLesbarPeriodeMedArstall,
} from '@navikt/digisyfo-npm';
import { Utvidbar } from '@navikt/digisyfo-npm';
import SykmeldingMotebehovVisning from './SykmeldingMotebehovVisning';
import {
    erEkstraInformasjonISykmeldingen,
    finnArbeidssituasjonEllerArbeidsgiver,
    finnInnsendteSykmeldinger,
    finnSykmeldingerInnenforOppfolgingstilfellet,
    sorterSykmeldingerPaaUtstedelsesdato,
} from '../utils/sykmeldingUtils';
import { finnMiljoStreng } from '../utils';
import Lenke from 'nav-frontend-lenker';


export const UtdragFraSykefravaeretHeader = () => {
    return (<div className="utdragFraSykefravaeret__header">
        <p>Utdrag fra sykefraværet</p>
    </div>);
};

export const Oppfolgingsplaner = (
    {
        aktiveDialoger,
        fnr,
    }) => {
    return (<div className="utdragFraSykefravaeret__oppfolgingsplaner">
        <h3>Oppfølgingsplan</h3>
        {
            aktiveDialoger && aktiveDialoger.length > 0
                ? aktiveDialoger.map((dialog, index) => {
                    const virksomhetsNavn = dialog.virksomhet.navn;
                    return (<div key={index} className="utdragFraSykefravaeret__oppfolgingsplan">
                        <span>
                            <Lenke className="lenke" href={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}>
                                {
                                    virksomhetsNavn && virksomhetsNavn.length > 0
                                        ? virksomhetsNavn
                                        : dialog.virksomhet.virksomhetsnummer
                                }
                            </Lenke>
                        </span>
                        <span className="gyldighetsperiode">{tilLesbarPeriodeMedArstall(dialog.godkjentPlan.gyldighetstidspunkt.fom, dialog.godkjentPlan.gyldighetstidspunkt.tom)}</span>
                    </div>);
                })
                : <p>Ingen planer er delt med NAV</p>
        }
    </div>);
};

Oppfolgingsplaner.propTypes = {
    aktiveDialoger: PropTypes.arrayOf(PropTypes.object),
    fnr: PropTypes.string,
};

export const UtvidbarTittel = (
    {
        sykmelding,
    }) => {
    const erViktigInformasjon = erEkstraInformasjonISykmeldingen(sykmelding);
    return (<div className="utdragFraSykefravaeret__utvidbarTittel">
        <div>
            <span className="utvidbarTittel__periode">{`Sendt til: ${finnArbeidssituasjonEllerArbeidsgiver(sykmelding)} - ${tilLesbarPeriodeMedArstall(tidligsteFom(sykmelding.mulighetForArbeid.perioder), senesteTom(sykmelding.mulighetForArbeid.perioder))}: `}</span>
            <span className="utvidbarTittel__grad">{` ${sykmelding.mulighetForArbeid.perioder[0].grad}%`}</span>
        </div>
        {
            erViktigInformasjon && <div className="utvidbarTittel__erViktig">
                <img alt="Mer" src={'/sykefravaer/img/svg/merInformasjon.svg'} />
            </div>
        }
    </div>);
};

UtvidbarTittel.propTypes = {
    sykmelding: PropTypes.object,
};

export const Sykmeldinger = (
    {
        oppfolgingstilfelleperioder,
        sykmeldinger,
    }) => {
    const innsendteSykmeldinger = finnInnsendteSykmeldinger(sykmeldinger);
    const sykmeldingerInnenforOppfolgingstilfellet = finnSykmeldingerInnenforOppfolgingstilfellet(innsendteSykmeldinger, oppfolgingstilfelleperioder);
    const sorterteSykmeldinger = sorterSykmeldingerPaaUtstedelsesdato(sykmeldingerInnenforOppfolgingstilfellet);
    return (<div className="utdragFraSykefravaeret__sykmeldinger">
        <h3>Sykmeldinger</h3>
        {
            sorterteSykmeldinger.length > 0
                ? sorterteSykmeldinger.map((sykmelding, index) => {
                    return (<div key={index}>
                        <Utvidbar
                            tittel={<UtvidbarTittel sykmelding={sykmelding} />}
                            visLukkLenke={false}
                            children={<SykmeldingMotebehovVisning sykmelding={sykmelding} />}
                        />
                    </div>);
                })
                : <p>Finner ingen sykmeldinger</p>
        }
    </div>);
};

Sykmeldinger.propTypes = {
    oppfolgingstilfelleperioder: PropTypes.object,
    sykmeldinger: PropTypes.arrayOf(PropTypes.object),
};

export const Samtalereferat = (
    {
        fnr,
    }
) => {
    return (<div className="utdragFraSykefravaeret__samtalereferat">
        <h3>Samtalereferat</h3>
        <Lenke className="lenke" href={`https://modapp${finnMiljoStreng()}.adeo.no/modiabrukerdialog/person/${fnr}?7#!meldinger`} target="_blank" >
            Samtalereferat
        </Lenke>
    </div>);
};

Samtalereferat.propTypes = {
    fnr: PropTypes.string,
};

const UtdragFraSykefravaeret = (
    {
        aktiveDialoger,
        fnr,
        oppfolgingstilfelleperioder,
        sykmeldinger,
    }) => {
    return (<div>
        <UtdragFraSykefravaeretHeader />

        <div className="panel utdragFraSykefravaeret">
            <Oppfolgingsplaner
                aktiveDialoger={aktiveDialoger}
                fnr={fnr}
            />

            <Sykmeldinger
                fnr={fnr}
                oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
                sykmeldinger={sykmeldinger}
            />

            <Samtalereferat
                fnr={fnr}
            />
        </div>
    </div>);
};

UtdragFraSykefravaeret.propTypes = {
    aktiveDialoger: PropTypes.arrayOf(PropTypes.object),
    fnr: PropTypes.string,
    oppfolgingstilfelleperioder: PropTypes.object,
    sykmeldinger: PropTypes.arrayOf(PropTypes.object),
};

export default UtdragFraSykefravaeret;
