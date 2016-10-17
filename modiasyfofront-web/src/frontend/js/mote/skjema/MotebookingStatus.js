import React from 'react';

const MotebookingStatus = ({ mote }) => {
    const { tidspunkter, sted, naermesteLederNavn, naermesteLederEpost } = mote;
    return (<div>
        <div className="panel">
            <div className="varselstripe varselstripe--suksess">
                <div className="varselstripe__ikon">
                    <img />
                </div>
                <p className="sist">Møteforespørselen er sendt til {naermesteLederNavn}!</p>
            </div>
        </div>
        <div className="panel">
            <h2 className="typo-undertittel">Oversikt over møtetider</h2>
            <p>Her ser du en oversikt over alle deltakere som har svart på møteforespørselen din. </p>
            <table className="motestatus">
                <thead>
                    <tr>
                        <th>Møtetider</th>
                        {
                            tidspunkter.map((tidspunkt, index) => {
                                return (<th key={index}>{tidspunkt.dato} kl {tidspunkt.klokkeslett}</th>);
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{naermesteLederNavn}</td>
                        {
                            tidspunkter.map((tidspunkt, index) => {
                                return (<td key={index}>?</td>)
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)
};

export default MotebookingStatus;

