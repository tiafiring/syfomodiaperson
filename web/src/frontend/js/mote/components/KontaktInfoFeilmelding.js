import React, { PropTypes } from 'react';

const feilAarsakForklaringFunc = (feilAarsak) => {
    switch (feilAarsak) {
        case 'RESERVERT': {
            return <p>Den sykmeldte har reservert seg mot elektronisk kommunikasjon med det offentlige. Du kan fortsatt
                sende møteforespørsel til arbeidsgiveren digitalt, men den sykmeldte må kontaktes på annen måte.</p>;
        }
        case 'INGEN_KONTAKTINFORMASJON': {
            return (<div>
                <p>Den sykmeldte er ikke registrert i Kontakt- og reservasjonsregisteret (KRR). Du kan fortsatt sende
                    møteforespørsel til arbeidsgiveren digitalt, men den sykmeldte må kontaktes på annen måte.</p>
                <p>Den sykmeldte kan registrere kontaktinformasjonen sin her: <a target="_blank"
                                                                                 href="http://eid.difi.no/nb/oppdater-kontaktinformasjonen-din">http://eid.difi.no/nb/oppdater-kontaktinformasjonen-din</a>
                </p>
            </div>);
        }
        case 'KODE6': {
            return <p>Den sykmeldte er registrert med skjermingskode 6.</p>;
        }
        case 'KODE7': {
            return <p>Den sykmeldte er registrert med skjermingskode 7.</p>;
        }
        default: {
            return <p />;
        }
    }
};

const KontaktinfoFeilmelding = ({feilAarsak}) => {
    const feilAarsakForklaring = feilAarsakForklaringFunc(feilAarsak);
    return (<div className="panel">
        <div className="hode hode-informasjon">
            { feilAarsakForklaring }
        </div>
    </div>);
};

KontaktinfoFeilmelding.propTypes = {
    feilAarsak: PropTypes.string,
};

export default KontaktinfoFeilmelding;