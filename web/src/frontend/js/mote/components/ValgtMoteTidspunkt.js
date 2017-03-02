import React, { PropTypes } from 'react';
import { getDatoFraZulu, getKlokkeslettFraZulu } from '../utils/index';
import { Varselstripe, getLedetekst } from 'digisyfo-npm';
import MotebookingIkon from './MotebookingIkon';

const deltakertyper = {
    arbeidsgiver: 'Arbeidsgiver',
    bruker: 'Arbeidstaker',
    arbeidstaker: 'Arbeidstaker',
};

const ValgtMoteTidspunkt = ({ ledetekster, deltakere, valgtAlternativ, bekreftetTidspunkt }) => {
    return (<div>
        <Varselstripe type="suksess">
            <div>
                <p className="typo-element">{getLedetekst('mote.bookingstatus.bekreftet.sendt-dato', ledetekster, { '%DATO%': getDatoFraZulu(bekreftetTidspunkt) })}</p>
            </div>
        </Varselstripe>
        <div className="motestatus__bekreftetmote__tabell">
            <h3>{getLedetekst('mote.bookingstatus.bekreftet.sendt', ledetekster)}</h3>
            <table className="motestatus blokk-l">
                <thead>
                <tr>
                    <th />
                    {
                        deltakere && deltakere
                            .map((deltaker, index) => {
                                return (
                                    <td key={index}>
                                        <th className="motestatus__deltaker" scope="row">
                                            <strong>{deltakertyper[deltaker.type.toLowerCase()]}</strong>
                                            <span>{deltaker.navn}</span>
                                        </th>
                                    </td>);
                            })
                    }
                </tr>
                </thead>
                <tbody>

                <tr>
                <th scope="col" className="bekreftetTidspunkt motestatus__kolonne_tidspunkt">
                    <div className="tabellelement">
                        {getDatoFraZulu(valgtAlternativ.tid)}<br />{getKlokkeslettFraZulu(valgtAlternativ.tid)}
                    </div>
                </th>
                {
                    deltakere.map((deltaker, index2) => {
                        let className = 'motestatus__svar';
                        let svarIndex = 0;
                        for ( let i = 0; i < deltaker.svar.length; i++) {
                            if (valgtAlternativ.id === deltaker.svar[i].id) {
                                svarIndex = i;
                            }
                        }

                        if (deltaker.svartTidspunkt && new Date(deltaker.svartTidspunkt) > new Date(deltaker.svar[svarIndex].created)) {
                            if (deltaker.svar[svarIndex].valgt === true) {
                                className = 'motestatus__svar--valgtTidspunkt';
                            } else {
                                className = 'motestatus__svar--avvistTidspunkt';
                            }
                        }
                        return (<td key={index2} className={className}>
                            <MotebookingIkon deltaker={deltaker} index={svarIndex} />
                        </td>);
                    })
                }
                </tr>
                </tbody>
            </table>
        </div>
    </div>);
};

ValgtMoteTidspunkt.propTypes = {
    valgtAlternativ: PropTypes.shape({
        tid: PropTypes.string,
        sted: PropTypes.string,
    }),
    deltakere: PropTypes.arrayOf(PropTypes.shape({
        navn: PropTypes.string,
        epost: PropTypes.string,
        tidOgSted: PropTypes.array,
        type: PropTypes.string,
    })),
    bekreftetTidspunkt: PropTypes.string,
    ledetekster: PropTypes.object,
};

export default ValgtMoteTidspunkt;
