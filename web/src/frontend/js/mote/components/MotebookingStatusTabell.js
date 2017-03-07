import React, { PropTypes } from 'react';
import MotebookingIkon from './MotebookingIkon';
import { getKlokkeslettFraZulu, getDatoFraZulu } from '../utils/index';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';

const deltakertyper = {
    arbeidsgiver: 'Arbeidsgiver',
    bruker: 'Arbeidstaker',
    arbeidstaker: 'Arbeidstaker',
};

export const MotetidspunktValgt = ({ bekreftetTidspunkt, ledetekster }) => {
    return <div className="motetidspunktValgt">{getLedetekst('mote.bookingstatus.valgt-sendt-til-parter', ledetekster, { '%TID%': getDatoFraZulu(bekreftetTidspunkt) })}</div>;
};

MotetidspunktValgt.propTypes = {
    bekreftetTidspunkt: PropTypes.string,
    ledetekster: PropTypes.object,
};

const MotebookingStatusTabell = ({ ledetekster, fnr, deltakere, alternativer, status, flereAlternativ }) => {
    const arbeidsgiverDeltaker = deltakere.filter((deltaker) => {
        return deltaker.type === 'arbeidsgiver';
    })[0];
    const visVelgTidspunkt = status === 'OPPRETTET' && arbeidsgiverDeltaker && arbeidsgiverDeltaker.svar.filter((svar) => {
        return svar.valgt;
    }).length > 0;

    return (<div>
        <table className="motestatus blokk-l">
            <thead>
            <tr>
                <th />
                {
                    deltakere && deltakere
                        .map((deltaker, index) => {
                            return (<th className="motestatus__deltaker" scope="row" key={index}>
                                    <strong>{deltakertyper[deltaker.type.toLowerCase()]}</strong>
                                    <span>{deltaker.navn}</span>
                                </th>)
                        })
                }
            </tr>
            </thead>
            <tbody>
            {
                alternativer
                    .map((alternativ, index) => {
                        let svarkolonne = <td key={arbeidsgiverDeltaker.svar[index].id} />;
                        if (visVelgTidspunkt && arbeidsgiverDeltaker.svar[index].valgt) {
                            svarkolonne = (<td key={arbeidsgiverDeltaker.svar[index].id} >
                                <Link to={`/sykefravaer/${fnr}/mote/bekreft/${alternativ.id}`} className="js-velg-tidspunkt">{getLedetekst('mote.bookingstatus.velgtidspunkt', ledetekster)}</Link>
                            </td>);
                        }

                        return (<tr key={index}>
                            <th scope="col" className="motestatus__kolonne__tidspunkt" key={index}>
                                <div className="tabellelement">
                                    {getDatoFraZulu(alternativ.tid)}<br />{getKlokkeslettFraZulu(alternativ.tid)}
                                </div>
                            </th>
                            {
                                deltakere.map((deltaker, index2) => {
                                    let className = 'motestatus__svar';
                                    if (deltaker.svartTidspunkt && new Date(deltaker.svartTidspunkt) > new Date(deltaker.svar[index].created)) {
                                        if (deltaker.svar[index].valgt === true) {
                                            className = 'motestatus__svar--valgtTidspunkt';
                                        } else {
                                            className = 'motestatus__svar--avvistTidspunkt';
                                        }
                                    }

                                    return (<td key={index2} className={className}>
                                        <MotebookingIkon deltaker={deltaker} index={index} />
                                    </td>);
                                })
                            }
                            { svarkolonne }
                        </tr>);
                    })

            }
            </tbody>
        </table>
        <div className="sentrer-knapp blokk">
            <button className="js-nyetidspunkt rammeknapp rammeknapp--mini" onClick={() => {
                flereAlternativ();
            }}>{getLedetekst('mote.bookingstatus.knapp.flere-tidspunkt', ledetekster)}</button>
        </div>
    </div>);
};

MotebookingStatusTabell.propTypes = {
    deltakere: PropTypes.arrayOf(PropTypes.shape({
        navn: PropTypes.string,
        epost: PropTypes.string,
        tidOgSted: PropTypes.array,
        svar: PropTypes.array,
        type: PropTypes.string,
    })),
    alternativer: PropTypes.arrayOf(PropTypes.shape({
        tid: PropTypes.string,
        sted: PropTypes.string,
    })),
    status: PropTypes.string,
    fnr: PropTypes.string,
    ledetekster: PropTypes.object,
    flereAlternativ: PropTypes.func,
};

export default MotebookingStatusTabell;
