import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
    getLedetekst,
    toDatePrettyPrint,
} from 'digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';

const finnAntallOppgaver = (dialog) => {
    return dialog.oppgaver.filter((oppgave) => {
        return oppgave.type === 'SE_OPPFOLGINGSPLAN' && oppgave.status !== 'FERDIG';
    }).length;
};

export class OppfoelgingsPlanerOversikt extends Component {
    componentWillMount() {
        const { actions, aktiveDialoger, inaktiveDialoger } = this.props;
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
        const { fnr, aktiveDialoger, inaktiveDialoger } = this.props;
        aktiveDialoger.sort((a, b) => {
            return new Date(a.godkjentPlan.deltMedNavTidspunkt) < new Date(b.godkjentPlan.deltMedNavTidspunkt) ? 1 : -1;
        });

        inaktiveDialoger.sort((a, b) => {
            return new Date(a.godkjentPlan.deltMedNavTidspunkt) < new Date(b.godkjentPlan.deltMedNavTidspunkt) ? 1 : -1;
        });

        return (<div>
            <div className="blokk--l">
                <h2>{getLedetekst('fss.oppfoelgingsdialog.oversikt.aktuelle')}</h2>
                {aktiveDialoger.length === 0 && <Alertstripe type="info">
                    <p>{getLedetekst('fss.oppfoelgingsdialog.oversikt.aktuelle--ingen')}</p>
                </Alertstripe>}
                {
                    aktiveDialoger.map((dialog, index) => {
                        const antallOppgaver = finnAntallOppgaver(dialog);
                        return (<Link key={index} className="panel navigasjonspanel" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}>
                            <div className="navigasjonselement">
                                <h3>{dialog.virksomhet.navn}</h3>
                                <p>{`Varighet ${toDatePrettyPrint(dialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDatePrettyPrint(dialog.godkjentPlan.gyldighetstidspunkt.tom)}`}</p>
                            </div>
                            { antallOppgaver > 0 && <label className="antallNytt" style={{ marginTop: '30px', marginBottom: '30px' }}>{finnAntallOppgaver(dialog)}</label> }
                        </Link>);
                    })
                }
            </div>
            <h2>{getLedetekst('fss.oppfoelgingsdialog.oversikt.inaktive')}</h2>
            {inaktiveDialoger.length === 0 && <Alertstripe type="info">
                <p>{getLedetekst('fss.oppfoelgingsdialog.oversikt.inaktive--ingen')}</p>
            </Alertstripe>}
            {
                inaktiveDialoger.map((dialog, index) => {
                    const antallOppgaver = finnAntallOppgaver(dialog);
                    return (<Link key={index} className="panel navigasjonspanel" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}>
                        <div className="navigasjonselement">
                            <h3>{dialog.virksomhet.navn}</h3>
                            <p>{`Varighet ${toDatePrettyPrint(dialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDatePrettyPrint(dialog.godkjentPlan.gyldighetstidspunkt.tom)}`}</p>
                        </div>
                        { antallOppgaver > 0 && <label className="antallNytt" style={{ marginTop: '30px', marginBottom: '30px' }}>{finnAntallOppgaver(dialog)}</label> }
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
