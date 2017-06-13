import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, senesteTom } from 'digisyfo-npm';

const OppfoelgingsplanTeaser = ({ oppfoelgingsdialog = {}, ledetekster = {}, fnr }) => {
    return (<div className="">
        <div className="">
            <h3>Fra sykefraværet xx.xx.2017 - xx.xx.2017</h3>
        </div>
        <div className="">
            {
                oppfoelgingsdialog.versjonerteOppfoelgingsdialoger.map((versjonertOppfoelgingsdialog, index) => {
                    return (<Link to={`/sykefravaer/${fnr}/oppfoelgingsplaner/arbeidsgivere/${oppfoelgingsdialog.virksomhetsnummer}/${oppfoelgingsdialog.oppfoelgingsdialogId}/${versjonertOppfoelgingsdialog.versjon}`} key={index}>
                            <h3>{`Versjon ${versjonertOppfoelgingsdialog.versjon}`}</h3>
                            <p>Gyldig fra XX.XX - XX.XX.2017</p>
                        </Link>);
                })

            }
        </div>

    </div>);
};

OppfoelgingsplanTeaser.propTypes = {
    oppfoelgingsdialog: PropTypes.object.isRequired,
    ledetekster: PropTypes.object.isRequired,
    fnr: PropTypes.string,
};

export default OppfoelgingsplanTeaser;
