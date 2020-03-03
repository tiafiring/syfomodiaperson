import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';
import Sidetopp from '../Sidetopp';
import { restdatoTilLesbarDato } from '../../utils/datoUtils';

const texts = {
    titles: {
        relevantOppfolgingsplaner: 'Aktuelle oppfølgingsplaner',
        inactiveOppfolgingsplaner: 'Tidligere oppfølgingsplaner',
    },
    alertMessages: {
        noRelevantOppfolgingsplaner: 'Det er ingen aktuelle oppfølgingsplaner.',
        noInactiveOppfolgingsplaner: 'Det er ingen tidligere oppfølgingsplaner.',
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

const finnAntallOppgaver = (dialog) => {
    return dialog.oppgaver.filter((oppgave) => {
        return oppgave.type === 'SE_OPPFOLGINGSPLAN' && oppgave.status !== 'FERDIG';
    }).length;
};

export class OppfoelgingsPlanerOversikt extends Component {
    componentWillMount() {
        const {
            actions,
            aktiveDialoger,
            inaktiveDialoger,
        } = this.props;
        const virksomhetsnummerSet = new Set();
        aktiveDialoger.forEach((dialog) => {
            virksomhetsnummerSet.add(dialog.virksomhet.virksomhetsnummer);
        });
        inaktiveDialoger.forEach((dialog) => {
            virksomhetsnummerSet.add(dialog.virksomhet.virksomhetsnummer);
        });
        virksomhetsnummerSet.forEach((virksomhetsnummer) => {
            actions.hentVirksomhet(virksomhetsnummer);
        });
    }

    render() {
        const {
            fnr,
            aktiveDialoger,
            inaktiveDialoger,
        } = this.props;
        aktiveDialoger.sort((a, b) => {
            return new Date(a.godkjentPlan.deltMedNavTidspunkt) < new Date(b.godkjentPlan.deltMedNavTidspunkt) ? 1 : -1;
        });

        inaktiveDialoger.sort((a, b) => {
            return new Date(a.godkjentPlan.deltMedNavTidspunkt) < new Date(b.godkjentPlan.deltMedNavTidspunkt) ? 1 : -1;
        });

        return (<div>
            <Sidetopp tittel="Oppfølgingsplaner" />
            <div className="blokk--l">
                <h2 className="typo-systemtittel blokk--xs">{texts.titles.relevantOppfolgingsplaner}</h2>
                {aktiveDialoger.length === 0 && <Alertstripe type="info">
                    <p>{texts.alertMessages.noRelevantOppfolgingsplaner}</p>
                </Alertstripe>}
                {
                    aktiveDialoger.map((dialog, index) => {
                        const antallOppgaver = finnAntallOppgaver(dialog);
                        return (<Link key={index} className="navigasjonspanel navigasjonspanel--stor" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}>
                            <div className="navigasjonselement">
                                <h3 className="panel__tittel navigasjonselement__tittel">{dialog.virksomhet.navn}</h3>
                                <p className="navigasjonselement__undertittel">{durationText(dialog)}</p>
                                <p className="navigasjonselement__undertekst">{deltMedNavText(dialog)}</p>
                            </div>
                            { antallOppgaver > 0 && <i className="antallNytt">{antallOppgaver}</i> }
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
                    const antallOppgaver = finnAntallOppgaver(dialog);
                    return (<Link key={index} className="navigasjonspanel navigasjonspanel--stor" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}>
                        <div className="navigasjonselement">
                            <h3 className="panel__tittel navigasjonselement__tittel">{dialog.virksomhet.navn}</h3>
                            <p className="navigasjonselement__undertittel">{durationText(dialog)}</p>
                            <p className="navigasjonselement__undertekst">{deltMedNavText(dialog)}</p>
                        </div>
                        { antallOppgaver > 0 && <i className="antallNytt">{antallOppgaver}</i> }
                    </Link>);
                })
            }
        </div>);
    }
}

OppfoelgingsPlanerOversikt.propTypes = {
    fnr: PropTypes.string,
    actions: PropTypes.object,
    aktiveDialoger: PropTypes.array.isRequired,
    inaktiveDialoger: PropTypes.array.isRequired,
};

export default OppfoelgingsPlanerOversikt;
