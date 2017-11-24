import React, { PropTypes, Component } from 'react';
import { getLedetekst, toDatePrettyPrint, Varselstripe } from 'digisyfo-npm';

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
                {aktiveDialoger.length === 0 && <div className="panel varselstripe--override"><Varselstripe>
                    <p>{getLedetekst('fss.oppfoelgingsdialog.oversikt.aktuelle--ingen')}</p>
                </Varselstripe></div>}
                {
                    aktiveDialoger.map((aktivDialog, index) => {
                        return (<a key={index} className="panel navigasjonspanel" style={{ display: 'block' }}
                            href={`/sykefravaer/${fnr}/oppfoelgingsplaner/${aktivDialog.id}`}>
                            <h3>{aktivDialog.virksomhet.navn}</h3>
                            <p>{`Varighet ${toDatePrettyPrint(aktivDialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDatePrettyPrint(aktivDialog.godkjentPlan.gyldighetstidspunkt.tom)}`}</p>
                        </a>);
                    })
                }
            </div>
            <h2>{getLedetekst('fss.oppfoelgingsdialog.oversikt.inaktive')}</h2>
            {inaktiveDialoger.length === 0 && <div className="panel varselstripe--override"><Varselstripe>
                <p>{getLedetekst('fss.oppfoelgingsdialog.oversikt.inaktive--ingen')}</p>
            </Varselstripe></div>}
            {
                inaktiveDialoger.map((inaktivDialog, index) => {
                    return (<a key={index} className="panel navigasjonspanel" style={{ display: 'block' }} href={`/sykefravaer/${fnr}/oppfoelgingsplaner/${inaktivDialog.id}`}>
                        <h3>{inaktivDialog.virksomhet.navn}</h3>
                        <p>{`Varighet ${toDatePrettyPrint(inaktivDialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDatePrettyPrint(inaktivDialog.godkjentPlan.gyldighetstidspunkt.tom)}`}</p>
                    </a>);
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
    ledetekster: PropTypes.object.isRequired,
};

export default OppfoelgingsPlanerOversikt;
