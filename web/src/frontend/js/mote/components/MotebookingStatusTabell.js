import React, { PropTypes } from 'react';
import MotebookingIkon from './MotebookingIkon';
import { getKlokkeslettFraZulu, getDatoFraZulu } from '../utils/index';
import { Varselstripe, getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';

const deltakertyper = {
    arbeidsgiver: 'Arbeidsgiver',
    bruker: 'Arbeidstaker',
    arbeidstaker: 'Arbeidstaker',
};

export const MotetidspunktValgt = ({ bekreftetTidspunkt, ledetekster }) => {
    return <div className="motetidspunktValgt">{getLedetekst('mote.bookingstatus.valgt-sendt-til-parter', ledetekster, {'%TID%': getDatoFraZulu(bekreftetTidspunkt)})}</div>;
};

MotetidspunktValgt.propTypes = {
    bekreftetTidspunkt: PropTypes.string,
    ledetekster: PropTypes.object,
};

const MotebookingStatusTabell = ({ ledetekster, fnr, mote }) => {
    let { deltakere } = mote;

    deltakere = deltakere.sort((d1, d2) => {
        return d1.type.localeCompare(d2.type);
    });

    const arbeidsgiverDeltaker = deltakere.filter((deltaker) => {
        return deltaker.type === 'arbeidsgiver';
    })[0];
    const visVelgTidspunkt = mote.status === 'OPPRETTET' && arbeidsgiverDeltaker && arbeidsgiverDeltaker.svar.filter((svar) => {
            return svar.valgt;
        }).length > 0;

    return ( <table className="motestatus blokk-l">
        <thead>
        <tr>
            <th/>
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
        {
            mote.alternativer
                .sort((a1, a2) => {
                    return new Date(a2.tid).getTime() <= new Date(a1.tid).getTime() ? 1 : -1;
                })
                .map((alternativ, index) => {
                    let className = null;
                    if (mote.valgtAlternativ && alternativ.id === mote.valgtAlternativ.id) {
                        className = 'bekreftetTidspunkt';
                    }

                    let svarkolonne = <td key={arbeidsgiverDeltaker.svar[index].id} />;
                    if (visVelgTidspunkt && arbeidsgiverDeltaker.svar[index].valgt) {
                        svarkolonne = (<td key={arbeidsgiverDeltaker.svar[index].id} >
                            <Link to={`/sykefravaer/${fnr}/mote/bekreft/${alternativ.id}`} className="js-velg-tidspunkt">{getLedetekst('mote.bookingstatus.velgtidspunkt', ledetekster)}</Link>
                        </td>);
                    } else if ( mote.status === 'BEKREFTET') {
                        svarkolonne = (<td key={alternativ.id}>
                            {alternativ.id === mote.valgtAlternativ.id && <MotetidspunktValgt bekreftetTidspunkt={mote.bekreftetTidspunkt} ledetekster={ledetekster} />}
                        </td>);
                    }

                    return (<tr key={index}>
                        <th scope="col" className={`${className} motestatus__kolonne_tidspunkt`} key={index}>
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
    </table>);
};

MotebookingStatusTabell.propTypes = {
    mote: PropTypes.shape({
        alternativer: PropTypes.arrayOf(PropTypes.shape({
            tid: PropTypes.string,
            sted: PropTypes.string,
        })),
        deltakere: PropTypes.arrayOf(PropTypes.shape({
            navn: PropTypes.string,
            epost: PropTypes.string,
            tidOgSted: PropTypes.array,
            type: PropTypes.string,
        })),
    }),
    antallNyeTidspunkt: PropTypes.number,
    fnr: PropTypes.string,
    arbeidstaker: PropTypes.object,
    senderNyeAlternativ: PropTypes.bool,
    nyeAlternativFeilet: PropTypes.bool,
    ledetekster: PropTypes.object,
    avbrytMoteUtenVarsel: PropTypes.func,
    flereAlternativ: PropTypes.func,
    opprettFlereAlternativ: PropTypes.func,
    avbrytFlereAlternativ: PropTypes.func,
};

export default MotebookingStatusTabell;
