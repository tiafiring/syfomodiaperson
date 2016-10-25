import React, { PropTypes } from 'react';

const pad = (nr) => {
    return nr > 9 ? nr : `0${nr}`;
};

const getTidFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    const dag = pad(d.getDate());
    const maned = pad(d.getMonth() + 1);
    return `${dag}.${maned}.${d.getFullYear()} kl. ${pad(d.getHours())}.${pad(d.getMinutes())}`;
};

const Varselstripe = ({ navn }) => {
    return (<div className="panel">
        <div className="varselstripe varselstripe--suksess">
            <div className="varselstripe__ikon">
                <img src="/sykefravaer/img/svg/suksess.svg" />
            </div>
            <p className="sist">Møteforespørselen er sendt til {navn}!</p>
        </div>
    </div>);
};

Varselstripe.propTypes = {
    navn: PropTypes.string,
};

const MotebookingStatus = ({ mote }) => {
    const { tidOgStedAlternativer, deltakere } = mote;
    const deltakerNavn = deltakere ? deltakere[0].navn : '?';
    return (<div>
        <Varselstripe navn={deltakerNavn} />
        <div className="panel">
            <header className="sidetopp">
                <h2 className="sidetopp__tittel">Svar på foreslått møte</h2>
                <div className="sidetopp__tekst">
                    <p>Her ser du en oversikt over hvilke tidspunkter du har foreslått til dialogmøte med arbeidsgiver, og 
                    hvilke som har svart på møteforespørselen din.</p>
                </div>
            </header>
            <h2 className="typo-undertittel blokk--s">Møtested</h2>
            <p className="blokk--l">{tidOgStedAlternativer[0].sted}</p>
            <table className="motestatus">
                <thead>
                    <tr>
                        <th className="motestatus__tittel">Møtetider</th>
                        {
                            tidOgStedAlternativer.map((tidspunkt, index) => {
                                return (<th key={index}>{getTidFraZulu(tidspunkt.tid)}</th>);
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        deltakere && deltakere.map((deltaker, index) => {
                            return (<tr key={index}>
                            <td><strong>Arbeidsgiver</strong> <span>{deltaker.navn}</span></td>
                                {
                                    tidOgStedAlternativer.map((tidspunkt, index2) => {
                                        return (<td key={index2} className="motestatus__svar">
                                            <span className="motestatus__svar__inner">
                                                <img className="motestatus__ikon" src="/sykefravaer/img/svg/status--ikkesvar.svg" alt="" />
                                                <span className="motestatus__svartekst motestatus__svartekst--ikkeSvart">Ikke svart</span>
                                            </span>
                                        </td>);
                                    })
                                }
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>);
};

MotebookingStatus.propTypes = {
    mote: PropTypes.object,
};

export default MotebookingStatus;

