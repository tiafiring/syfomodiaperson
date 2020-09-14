import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import { tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';
import OppfolgingsplanLPSEtikett from '../oppfolgingsplan/lps/OppfolgingsplanLPSEtikett';
import Sidetopp from '../Sidetopp';
import { restdatoTilLesbarDato } from '../../utils/datoUtils';
import { hentVirksomhet } from '../../actions/virksomhet_actions';

const texts = {
    titles: {
        relevantOppfolgingsplaner: 'Aktive oppfølgingsplaner',
        inactiveOppfolgingsplaner: 'Tidligere oppfølgingsplaner',
        lpsOppfolgingsplaner: 'Oppfølgingsplaner med bistandsbehov',
    },
    alertMessages: {
        noRelevantOppfolgingsplaner: 'Det er ingen aktive oppfølgingsplaner.',
        noInactiveOppfolgingsplaner: 'Det er ingen tidligere oppfølgingsplaner.',
        noLPSOppfolgingsplaner: 'Det er ingen oppfølgingsplaner med bistandsbehov',
    },
    duration: 'Varighet',
    shared: 'Delt med NAV',
};

const durationText = (dialog) => {
    return `${texts.duration} ${tilLesbarPeriodeMedArstall(dialog.godkjentPlan.gyldighetstidspunkt.fom, dialog.godkjentPlan.gyldighetstidspunkt.tom)}`;
};

const deltMedNavText = (dialog) => {
    const sharedDate = dialog.godkjentPlan && restdatoTilLesbarDato(dialog.godkjentPlan.deltMedNAVTidspunkt);
    return `${texts.shared} ${sharedDate}`;
};

const RedDot = styled.span`
  height: 1em;
  width: 1em;
  background-color: #C30000;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5em;
`;

const UnderTittelInline = styled.h3`
  display: inline-block;
`;


const OppfolgingsplanerOversiktLPS = (
    {
        fnr,
        oppfolgingsplanLPSBistandsbehov,
    }
) => {
    return (
        <Link className="navigasjonspanel navigasjonspanel--stor" to={`/sykefravaer/${fnr}/oppfolgingsplan/lps/${oppfolgingsplanLPSBistandsbehov.uuid}`}>
            <div className="navigasjonselement">
                { !oppfolgingsplanLPSBistandsbehov.personoppgave.behandletTidspunkt &&
                    <RedDot />
                }
                <UnderTittelInline className="panel__tittel navigasjonselement__tittel">{oppfolgingsplanLPSBistandsbehov.virksomhetsnavn}</UnderTittelInline>
                <p className="navigasjonselement__undertittel">Mottatt: {restdatoTilLesbarDato(oppfolgingsplanLPSBistandsbehov.opprettet)}</p>
                <OppfolgingsplanLPSEtikett />
            </div>
        </Link>
    );
};
OppfolgingsplanerOversiktLPS.propTypes = {
    fnr: PropTypes.string,
    oppfolgingsplanLPSBistandsbehov: PropTypes.object.isRequired,
};

const OppfoelgingsPlanerOversikt = (
    {
        fnr,
        aktiveDialoger,
        inaktiveDialoger,
        oppfolgingsplanerLPS,
    }
) => {
    const dispatch = useDispatch();

    const oppfolgingsplanerLPSBistandsbehovActive = oppfolgingsplanerLPS.filter((opppfolgingsplanLPS) => {
        return opppfolgingsplanLPS.personoppgave && !opppfolgingsplanLPS.personoppgave.behandletTidspunkt;
    });
    const oppfolgingsplanerLPSBistandsbehovProcessed = oppfolgingsplanerLPS.filter((opppfolgingsplanLPS) => {
        return opppfolgingsplanLPS.personoppgave && opppfolgingsplanLPS.personoppgave.behandletTidspunkt;
    });

    useEffect(() => {
        const virksomhetsnummerSet = new Set();
        aktiveDialoger.forEach((plan) => {
            virksomhetsnummerSet.add(plan.virksomhet.virksomhetsnummer);
        });
        inaktiveDialoger.forEach((plan) => {
            virksomhetsnummerSet.add(plan.virksomhet.virksomhetsnummer);
        });
        oppfolgingsplanerLPS.forEach((planLPS) => {
            virksomhetsnummerSet.add(planLPS.virksomhetsnummer);
        });
        virksomhetsnummerSet.forEach((virksomhetsnummer) => {
            dispatch(hentVirksomhet(virksomhetsnummer));
        });
    }, []);

    aktiveDialoger.sort((a, b) => {
        return new Date(b.godkjentPlan.deltMedNAVTidspunkt) - new Date(a.godkjentPlan.deltMedNAVTidspunkt);
    });

    inaktiveDialoger.sort((a, b) => {
        return new Date(b.godkjentPlan.deltMedNAVTidspunkt) - new Date(a.godkjentPlan.deltMedNAVTidspunkt);
    });

    return (
        <div>
            <Sidetopp tittel="Oppfølgingsplaner" />
            <div className="blokk--l">
                <h2 className="typo-systemtittel blokk--xs">{texts.titles.relevantOppfolgingsplaner}</h2>
                {
                    aktiveDialoger.length === 0 && oppfolgingsplanerLPSBistandsbehovActive.length === 0 && <Alertstripe type="info">
                        <p>{texts.alertMessages.noRelevantOppfolgingsplaner}</p>
                    </Alertstripe>
                }
                {
                    oppfolgingsplanerLPSBistandsbehovActive.map((planLPS, index) => {
                        return (
                            <OppfolgingsplanerOversiktLPS
                                key={index}
                                fnr={fnr}
                                oppfolgingsplanLPSBistandsbehov={planLPS}
                            />
                        );
                    })
                }
                {
                    aktiveDialoger.map((dialog, index) => {
                        return (<Link key={index} className="navigasjonspanel navigasjonspanel--stor" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}>
                            <div className="navigasjonselement">
                                <h3 className="panel__tittel navigasjonselement__tittel">{dialog.virksomhet.navn}</h3>
                                <p className="navigasjonselement__undertittel">{durationText(dialog)}</p>
                                <p className="navigasjonselement__undertekst">{deltMedNavText(dialog)}</p>
                            </div>
                        </Link>);
                    })
                }
            </div>

            <h2 className="typo-systemtittel blokk--xs">{texts.titles.inactiveOppfolgingsplaner}</h2>
            {
                inaktiveDialoger.length === 0 &&
                <Alertstripe type="info">
                    <p>{texts.alertMessages.noInactiveOppfolgingsplaner}</p>
                </Alertstripe>
            }
            {
                inaktiveDialoger.map((dialog, index) => {
                    return (<Link key={index} className="navigasjonspanel navigasjonspanel--stor" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}>
                        <div className="navigasjonselement">
                            <h3 className="panel__tittel navigasjonselement__tittel">{dialog.virksomhet.navn}</h3>
                            <p className="navigasjonselement__undertittel">{durationText(dialog)}</p>
                            <p className="navigasjonselement__undertekst">{deltMedNavText(dialog)}</p>
                        </div>
                    </Link>);
                })
            }
            {
                oppfolgingsplanerLPSBistandsbehovProcessed.map((planLPS, index) => {
                    return (
                        <OppfolgingsplanerOversiktLPS
                            key={index}
                            fnr={fnr}
                            oppfolgingsplanLPSBistandsbehov={planLPS}
                        />
                    );
                })
            }
        </div>
    );
};

OppfoelgingsPlanerOversikt.propTypes = {
    fnr: PropTypes.string,
    aktiveDialoger: PropTypes.array.isRequired,
    inaktiveDialoger: PropTypes.array.isRequired,
    oppfolgingsplanerLPS: PropTypes.array.isRequired,
};

export default OppfoelgingsPlanerOversikt;
