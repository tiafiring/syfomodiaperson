import React, { PropTypes } from 'react';
import { getLedetekst, toDatePrettyPrint, Varselstripe } from 'digisyfo-npm';

const OppfoelgingsPlanerOversikt = ({ fnr, aktiveDialoger, inaktiveDialoger, ledetekster }) => {
    aktiveDialoger.sort((a, b) => {
        return new Date(a.godkjentPlan.deltMedNavTidspunkt) < new Date(b.godkjentPlan.deltMedNavTidspunkt) ? 1 : -1;
    });

    inaktiveDialoger.sort((a, b) => {
        return new Date(a.godkjentPlan.deltMedNavTidspunkt) < new Date(b.godkjentPlan.deltMedNavTidspunkt) ? 1 : -1;
    });

    return (<div>
        <div className="blokk--l">
            <h2>{getLedetekst('fss.oppfoelgingsdialog.oversikt.aktuelle')}</h2>
            { aktiveDialoger.length === 0 && <div className="panel varselstripe--override"><Varselstripe>
                <p>{getLedetekst('fss.oppfoelgingsdialog.oversikt.aktuelle--ingen')}</p>
            </Varselstripe></div>}
            {
                aktiveDialoger.map((aktivDialog, index) => {
                    return (<a key={index} className="panel navigasjonspanel"
                        href={`/sykefravaer/${fnr}/oppfoelgingsplaner/${aktivDialog.id}`}>
                        <h3>{aktivDialog.virksomhetsnavn}</h3>
                        <p>{getLedetekst('fss.oppfoelgingsdialog.oversikt.deltmednav', ledetekster, {
                            '%DELT_MED_NAV_DATO%': toDatePrettyPrint(aktivDialog.godkjentPlan.deltMedNAVTidspunkt),
                        })}</p>
                    </a>);
                })
            }
        </div>
        <h2>{getLedetekst('fss.oppfoelgingsdialog.oversikt.inaktive')}</h2>
        { inaktiveDialoger.length === 0 && <div className="panel varselstripe--override"><Varselstripe>
            <p>{getLedetekst('fss.oppfoelgingsdialog.oversikt.inaktive--ingen')}</p>
        </Varselstripe></div>}
        {
            inaktiveDialoger.map((inaktivDialog, index) => {
                return (<a key={index} className="panel navigasjonspanel"
                    href={`/sykefravaer/${fnr}/oppfoelgingsplaner/${inaktivDialog.id}`}>
                    <h3>{inaktivDialog.virksomhetsnavn}</h3>
                    <p>{getLedetekst('fss.oppfoelgingsdialog.oversikt.deltmednav', ledetekster, {
                        '%DELT_MED_NAV_DATO%': toDatePrettyPrint(inaktivDialog.godkjentPlan.deltMedNAVTidspunkt),
                    })}</p>
                </a>);
            })
        }
    </div>);
};

OppfoelgingsPlanerOversikt.propTypes = {
    fnr: PropTypes.string,
    aktiveDialoger: PropTypes.array.isRequired,
    inaktiveDialoger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
};

export default OppfoelgingsPlanerOversikt;
