import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import {
    tilLesbarPeriodeMedArstall,
    tilLesbarDatoMedArstall,
} from '@navikt/digisyfo-npm';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { SykmeldingMotebehovVisning } from './SykmeldingMotebehovVisning';
import {erEkstraInformasjonISykmeldingen} from "../utils/sykmeldingUtils";

const finnSykmeldingerInnenforMotebehovPeriodenOgOppfolgingstilfellet = ({ sykmeldinger, oppfolgingstilfelleperioder }) => {
    return sykmeldinger.filter((sykmelding) => {
        const tilfelleperioderReducer = oppfolgingstilfelleperioder[sykmelding.orgnummer];
        const sykmeldingStart = new Date(sykmelding.startLegemeldtFravaer).setHours(0);

        const tilfelleStart = tilfelleperioderReducer && tilfelleperioderReducer.data && tilfelleperioderReducer.data[0].fom
            ? new Date(tilfelleperioderReducer.data[0].fom).setHours(0)
            : new Date();

        return sykmeldingStart - tilfelleStart >= 0;
    });
};

export const Sykmeldinger = (
    {
        fnr,
        ledetekster,
        oppfolgingstilfelleperioder,
        sykmeldinger,
    }) => {
    const sykmeldingerInnenforMotebehovPeriodenOgOppfolgingstilfellet = finnSykmeldingerInnenforMotebehovPeriodenOgOppfolgingstilfellet({ sykmeldinger, oppfolgingstilfelleperioder });
    return (<div className="utdragFraSykefravaeret__sykmeldinger">
        <h3>Sykmeldinger</h3>
        {
            sykmeldingerInnenforMotebehovPeriodenOgOppfolgingstilfellet.length > 0
                ? sykmeldingerInnenforMotebehovPeriodenOgOppfolgingstilfellet.map((sykmelding, index) => {
                    const erViktigInformasjon = erEkstraInformasjonISykmeldingen(sykmelding);
                    return (<div key={index}>
                        <Utvidbar
                            tittel={`${sykmelding.arbeidsgiver} ${tilLesbarPeriodeMedArstall(sykmelding.mulighetForArbeid.perioder[0].fom, sykmelding.mulighetForArbeid.perioder[0].tom)}: ${sykmelding.mulighetForArbeid.perioder[0].grad}% ${erViktigInformasjon ? 'VIKTIG!!!!' : ''}`}
                            visLukkLenke={false}
                            children={<SykmeldingMotebehovVisning sykmelding={sykmelding}/>}
                        />
                    </div>);
                })
                : <div><p>Ingenting her!</p></div>
        }
    </div>);
};

Sykmeldinger.propTypes = {
    fnr: PropTypes.string,
    ledetekster: PropTypes.object,
    oppfolgingstilfelleperioder: PropTypes.object,
    sykmeldinger: PropTypes.arrayOf(PropTypes.object),
};

export const Oppfolgingsplaner = (
    {
        aktiveDialoger,
        fnr,
    }) => {
    return (<div>
        <h3>Oppfølgingsplan</h3>
        {
            aktiveDialoger && aktiveDialoger.length > 0
                ? aktiveDialoger.map((dialog, index) => {
                    return (<div key={index} className="utdragFraSykefravaeret__oppfolgingsplan">
                        <span>
                            <Link to={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}>
                                <span className="navn">{dialog.virksomhet.navn}</span>
                            </Link>
                        </span>
                        <span className="gyldighet">{tilLesbarPeriodeMedArstall(dialog.godkjentPlan.gyldighetstidspunkt.fom, dialog.godkjentPlan.gyldighetstidspunkt.tom)}</span>
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

const UtdragFraSykefravaeret = (
    {
        aktiveDialoger,
        fnr,
        oppfolgingstilfelleperioder,
        sykmeldinger,
    }) => {
    return (<div className="panel utdragFraSykefravaeret">
        <Sykmeldinger
            sykmeldinger={sykmeldinger}
            oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
            fnr={fnr}
        />

        <Oppfolgingsplaner
            aktiveDialoger={aktiveDialoger}
            fnr={fnr}
            oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        />
    </div>);
};

UtdragFraSykefravaeret.propTypes = {
    actions: PropTypes.object,
    aktiveDialoger: PropTypes.arrayOf(PropTypes.object),
    fnr: PropTypes.string,
    ledetekster: PropTypes.object,
    oppfolgingstilfelleperioder: PropTypes.object,
    sykmeldinger: PropTypes.arrayOf(PropTypes.object),
};

export default UtdragFraSykefravaeret;
