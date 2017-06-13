import React, { PropTypes } from 'react';
import { getLedetekst, toDatePrettyPrint, Varselstripe } from 'digisyfo-npm';
import { Link } from 'react-router';

const OppfoelgingsPlanerOversikt = ({ oppfoelgingsdialoger, ledetekster = {}, fnr }) => {
    let aktiveDialoger = [];
    let inaktiveDialoger = [];
    let toMndSiden = new Date();
    toMndSiden.setMonth(toMndSiden.getMonth() - 2);

    oppfoelgingsdialoger.forEach((oppfoelgingsdialog) => {
        oppfoelgingsdialog.versjonerteOppfoelgingsdialoger.forEach((versjonertDialog) => {
            new Date(versjonertDialog.opprettetDato) > toMndSiden ? aktiveDialoger.push({oppfoelgingsdialog, versjonertDialog}) : inaktiveDialoger.push({oppfoelgingsdialog, versjonertDialog});
        });
    });

    aktiveDialoger.sort((a, b) => {
        return a.versjonertDialog.opprettetDato < b.versjonertDialog.opprettetDato ? 1 : -1;
    });

    inaktiveDialoger.sort((a, b) => {
        return a.versjonertDialog.opprettetDato < b.versjonertDialog.opprettetDato ? 1 : -1;
    });

    return (<div>
        <div className="blokk--l">
            <h2>Aktive oppfølgingsplaner</h2>
            { aktiveDialoger.length === 0 && <Varselstripe>
                <p>Det er ingen aktive oppfølgingsplaner.</p>
            </Varselstripe>}

            {
                aktiveDialoger.map((aktivDialog, index) => {
                    let evalueresDato = new Date(aktivDialog.versjonertDialog.opprettetDato);
                    evalueresDato.setMonth(evalueresDato.getMonth() + 2);
                    return (<Link key={index} className="panel navigasjonspanel" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/arbeidsgivere/${aktivDialog.oppfoelgingsdialog.virksomhetsnummer}/${aktivDialog.oppfoelgingsdialog.oppfoelgingsdialogId}/${aktivDialog.versjonertDialog.versjon}`}>
                        <h3>{aktivDialog.oppfoelgingsdialog.virksomhetsnavn}</h3>
                        <p>{`Gyldig: ${toDatePrettyPrint(aktivDialog.versjonertDialog.opprettetDato)} - ${toDatePrettyPrint(evalueresDato)}`}</p>
                    </Link>);
                })
            }
        </div>
        <h2>Tidligere oppfølgingsplaner</h2>
        { inaktiveDialoger.length === 0 && <div className="panel testoveriide"><Varselstripe>
            <p>Det er ingen tidligere oppfølgingsplaner.</p>
        </Varselstripe></div>}
        {
            inaktiveDialoger.map((aktivDialog, index) => {
                let evalueresDato = new Date(aktivDialog.versjonertDialog.opprettetDato);
                evalueresDato.setMonth(evalueresDato.getMonth() + 2);
                return (<Link key={index} className="panel navigasjonspanel" to={`/sykefravaer/${fnr}/oppfoelgingsplaner/arbeidsgivere/${aktivDialog.oppfoelgingsdialog.virksomhetsnummer}/${aktivDialog.oppfoelgingsdialog.oppfoelgingsdialogId}/${aktivDialog.versjonertDialog.versjon}`}>
                    <h3>{aktivDialog.oppfoelgingsdialog.virksomhetsnavn}</h3>
                    <p>{`Gyldig: ${toDatePrettyPrint(aktivDialog.versjonertDialog.opprettetDato)} - ${toDatePrettyPrint(evalueresDato)}`}</p>
                </Link>);
            })
        }
    </div>);
};

OppfoelgingsPlanerOversikt.propTypes = {
    oppfoelgingsdialoger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
    fnr: PropTypes.string.isRequired,
};

export default OppfoelgingsPlanerOversikt;
