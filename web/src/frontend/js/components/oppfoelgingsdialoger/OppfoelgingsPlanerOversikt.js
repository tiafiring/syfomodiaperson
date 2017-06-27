import React, { PropTypes } from 'react';
import { getLedetekst, toDatePrettyPrint, Varselstripe } from 'digisyfo-npm';
import { Link } from 'react-router';

const OppfoelgingsPlanerOversikt = ({ aktiveDialoger, inaktiveDialoger, ledetekster = {}, fnr }) => {
    aktiveDialoger.sort((a, b) => {
        return a.deltMedNav < b.deltMedNav ? 1 : -1;
    });

    inaktiveDialoger.sort((a, b) => {
        return a.deltMedNav < b.deltMedNav ? 1 : -1;
    });

    return (<div>
        <div className="blokk--l">
            <h2>Aktuelle oppfølgingsplaner</h2>
            { aktiveDialoger.length === 0 && <div className="panel varselstripe--override"><Varselstripe>
                <p>Det er ingen aktuelle oppfølgingsplaner.</p>
            </Varselstripe></div>}
            {
                aktiveDialoger.map((aktivDialog, index) => {
                    return (<Link key={index} className="panel navigasjonspanel" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/arbeidsgivere/${aktivDialog.virksomhetsnummer}/${aktivDialog.oppfoelgingsdialogId}/${aktivDialog.versjon}`}>
                        <h3>{aktivDialog.virksomhetsnavn}</h3>
                        <p>{`Delt med NAV: ${toDatePrettyPrint(aktivDialog.deltMedNavDato)}`}</p>
                    </Link>);
                })
            }
        </div>
        <h2>Tidligere oppfølgingsplaner</h2>
        { inaktiveDialoger.length === 0 && <div className="panel varselstripe--override"><Varselstripe>
            <p>Det er ingen tidligere oppfølgingsplaner.</p>
        </Varselstripe></div>}
        {
            inaktiveDialoger.map((inaktivDialog, index) => {
                return (<Link key={index} className="panel navigasjonspanel" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/arbeidsgivere/${inaktivDialog.virksomhetsnummer}/${inaktivDialog.oppfoelgingsdialogId}/${inaktivDialog.versjon}`}>
                    <h3>{inaktivDialog.virksomhetsnavn}</h3>
                    <p>{`Delt med NAV: ${toDatePrettyPrint(inaktivDialog.deltMedNavDato)}`}</p>
                </Link>);
            })
        }
    </div>);
};

OppfoelgingsPlanerOversikt.propTypes = {
    aktiveDialoger: PropTypes.array.isRequired,
    inaktiveDialoger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
    fnr: PropTypes.string.isRequired,
};

export default OppfoelgingsPlanerOversikt;
