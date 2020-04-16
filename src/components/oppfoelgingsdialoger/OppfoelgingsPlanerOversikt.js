import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';
import Sidetopp from '../Sidetopp';
import { restdatoTilLesbarDato } from '../../utils/datoUtils';

const texts = {
    titles: {
        relevantOppfolgingsplaner: 'Aktive oppfølgingsplaner',
        inactiveOppfolgingsplaner: 'Tidligere oppfølgingsplaner',
    },
    alertMessages: {
        noRelevantOppfolgingsplaner: 'Det er ingen aktive oppfølgingsplaner.',
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

export class OppfoelgingsPlanerOversikt extends Component {
    componentDidMount() {
        const {
            actions,
            aktiveDialoger,
            inaktiveDialoger,
        } = this.props;
        const virksomhetsnummerSet = new Set();
        aktiveDialoger.forEach((plan) => {
            virksomhetsnummerSet.add(plan.virksomhet.virksomhetsnummer);
        });
        inaktiveDialoger.forEach((plan) => {
            virksomhetsnummerSet.add(plan.virksomhet.virksomhetsnummer);
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
            return new Date(b.godkjentPlan.deltMedNAVTidspunkt) - new Date(a.godkjentPlan.deltMedNAVTidspunkt);
        });

        inaktiveDialoger.sort((a, b) => {
            return new Date(b.godkjentPlan.deltMedNAVTidspunkt) - new Date(a.godkjentPlan.deltMedNAVTidspunkt);
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
