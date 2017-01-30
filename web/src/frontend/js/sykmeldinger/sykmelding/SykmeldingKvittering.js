import React, {PropTypes} from "react";

const SykmeldingKvittering = ({ tittel, brodtekst, sykmeldingStatus }) => {
    const ikon = sykmeldingStatus === 'AVBRUTT' ? 'avbryt-sykmelding.svg' : 'digital-til-papir.svg';
    const tittelKlasse = sykmeldingStatus === 'AVBRUTT' ? 'tittel-avbrutt' : 'tittel-bekreftet';

    return (<div>
        <div className="panel blokk typo-infotekst side-innhold">
            <h2 className={`tittel tittel-dekorert tittel-illustrert typo-undertittel blokk ${tittelKlasse}`}>
                <img src={`/sykefravaer/img/svg/${ikon}`} alt="" />
                {tittel}
            </h2>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={brodtekst} />
        </div>
        <div className="panel">
            <h2 className="typo-undertittel">Hjelp oss å bli bedre</h2>
            <p>Dette er en tjeneste som fortsatt er under utvikling. Gi oss tilbakemelding slik at vi kan bli bedre!</p>
            <p className="knapperad">
                <a href="https://www.survey-xact.no/LinkCollector?key=5U5KSNH43P9K" className="rammeknapp" target="_blank">Gi tilbakemelding</a>
            </p>
        </div>
    </div>);
};

SykmeldingKvittering.propTypes = {
    tittel: PropTypes.string,
    brodtekst: PropTypes.object,
    sykmeldingStatus: PropTypes.string,
};

export default SykmeldingKvittering;
