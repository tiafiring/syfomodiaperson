import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { restdatoTildato } from '../../utils/datoUtils';
import { PERSONKORTVISNING_TYPE } from '../../konstanter';

export const PersonkortVisningElement = ({ tittel, imgUrl, children }) => {
    const imgAlt = imgUrl.split('/').reverse()[0].split('.')[0];
    return (<div className="personkortElement">
        <div className="personkortElement__tittel">
            <img src={imgUrl} alt={imgAlt} />
            <h4>{tittel}</h4>
        </div>
        <div className="personkortElement__rad">
            { children }
        </div>
    </div>);
};
PersonkortVisningElement.propTypes = {
    tittel: PropTypes.string,
    imgUrl: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
};
export const PersonkortVisningInformasjon = ({ informasjonNokkelTekster, informasjon }) => {
    return (<div className="personkortElementInformasjon">
    {
        Object.keys(informasjon).map((nokkel, idx) => {
            return (
                <dl key={idx} className="personkortElement__infomasjon">
                    <dt>{informasjonNokkelTekster.get(nokkel)}</dt>
                    <dd>{informasjon[nokkel]}</dd>
                </dl>
            );
        })
    }
    </div>);
};
PersonkortVisningInformasjon.propTypes = {
    informasjonNokkelTekster: PropTypes.object,
    informasjon: PropTypes.object,
};

export const VisningSykmeldt = ({ navbruker }) => {
    const informasjonNokkelTekster = new Map([
        ['adresse', getLedetekst('modiafront.personkort.visning.nokkeltekster.adresse')],
        ['fnr', getLedetekst('modiafront.personkort.visning.nokkeltekster.fnr')],
        ['tlf', getLedetekst('modiafront.personkort.visning.nokkeltekster.tlf')],
        ['epost', getLedetekst('modiafront.personkort.visning.nokkeltekster.epost')],
    ]);
    const valgteElementer = (({ tlf, epost, fnr }) => ({ tlf, epost, fnr }))(navbruker.kontaktinfo);
    return (<div className="personkort__visning visningSykmeldt">
        <PersonkortVisningElement
            tittel="Kontaktinformasjon"
            imgUrl="/sykefravaer/img/svg/person.svg"
            informasjon={valgteElementer}>
            <PersonkortVisningInformasjon
                informasjonNokkelTekster={informasjonNokkelTekster}
                informasjon={valgteElementer}
            />
        </PersonkortVisningElement>
    </div>);
};
VisningSykmeldt.propTypes = {
    navbruker: PropTypes.object,
};

export const VisningLeder = ({ ledere }) => {
    const informasjonNokkelTekster = new Map([
        ['navn', getLedetekst('modiafront.personkort.visning.nokkeltekster.navn')],
        ['tlf', getLedetekst('modiafront.personkort.visning.nokkeltekster.tlf')],
        ['epost', getLedetekst('modiafront.personkort.visning.nokkeltekster.epost')],
        ['orgnummer', getLedetekst('modiafront.personkort.visning.nokkeltekster.orgnummer')],
        ['fomDato', getLedetekst('modiafront.personkort.visning.nokkeltekster.leder_fom')],
    ]);
    return (<div className="personkort__visning visningLeder">
        {
            ledere.map((leder, idx) => {
                const valgteElementer = (({ navn, epost, tlf, orgnummer, fomDato }) => ({ navn, epost, tlf, orgnummer, fomDato }))(Object.assign({}, leder, {
                    fomDato: leder.fomDato && restdatoTildato(leder.fomDato),
                }));
                return (<PersonkortVisningElement
                    key={idx}
                    tittel="Nærmeste Leder"
                    imgUrl="/sykefravaer/img/svg/fabrikk.svg">
                    { !leder.erOppgitt ?
                        <p className="personkort__feilmelding--ingenLeder">
                            {'Nærmeste leder ikke meldt inn av arbeidsgiver'}
                        </p>
                        :
                        <PersonkortVisningInformasjon
                            informasjonNokkelTekster={informasjonNokkelTekster}
                            informasjon={valgteElementer}
                        />
                    }
                </PersonkortVisningElement>);
            })
        }
    </div>);
};
VisningLeder.propTypes = {
    ledere: PropTypes.array,
};

export const VisningLege = ({ aktivFastlege, tidligereFastleger, sykmeldtNavn }) => {
    const informasjonNokkelTekster = new Map([
        ['fom', getLedetekst('modiafront.personkort.visning.nokkeltekster.lege_fom', {
            '%SYKMELDTNAVN%': sykmeldtNavn,
        })],
        ['navn', getLedetekst('modiafront.personkort.visning.nokkeltekster.legekontor')],
        ['telefon', getLedetekst('modiafront.personkort.visning.nokkeltekster.tlf')],
        ['orgnummer', getLedetekst('modiafront.personkort.visning.nokkeltekster.orgnummer')],
    ]);
    const valgteElementerKontor = (({ navn, telefon, orgnummer }) => ({ navn, telefon, orgnummer }))(aktivFastlege.fastlegekontor);
    const valgteElementerPasientforhold = (({ fom }) => ({ fom }))(Object.assign({}, aktivFastlege.pasientforhold, {
        fom: aktivFastlege.pasientforhold.fom && restdatoTildato(aktivFastlege.pasientforhold.fom),
    }));
    const valgteElementer = Object.assign({}, valgteElementerPasientforhold, valgteElementerKontor);
    return (<div className="personkort__visning visningLege">
        <PersonkortVisningElement
            tittel={aktivFastlege.navn}
            imgUrl="/sykefravaer/img/svg/medisinskrin.svg"
            informasjon={valgteElementer}>
            <PersonkortVisningInformasjon
                informasjonNokkelTekster={informasjonNokkelTekster}
                informasjon={valgteElementer}
            />
        </PersonkortVisningElement>
        <VisningTidligereLeger
            tidligereFastleger={tidligereFastleger}
        />
    </div>);
};
VisningLege.propTypes = {
    aktivFastlege: PropTypes.object,
    tidligereFastleger: PropTypes.array,
    sykmeldtNavn: PropTypes.string,
};

export const VisningTidligereLeger = ({ tidligereFastleger }) => {
    return (<PersonkortVisningElement
        tittel="Tidligere fastleger"
        imgUrl="/sykefravaer/img/svg/medisinboks.svg">
        <ul>
            {
                tidligereFastleger.map((lege, idx) => {
                    return (<li key={idx}>
                        <p>
                            {getLedetekst('modiafront.personkort.visningTidligereLeger.pasientforhold', {
                                '%FOM%': restdatoTildato(lege.pasientforhold.fom),
                                '%TOM%': restdatoTildato(lege.pasientforhold.tom),
                                '%LEGENAVN%': lege.navn,
                            })}
                        </p>
                    </li>);
                })
            }
        </ul>
    </PersonkortVisningElement>);
};
VisningTidligereLeger.propTypes = {
    tidligereFastleger: PropTypes.array,
};

export const VisningEnhet = ({ behandlendeEnhet }) => {
    const informasjonNokkelTekster = new Map([
        ['enhetId', getLedetekst('modiafront.personkort.visning.nokkeltekster.enhet')],
    ]);
    const valgteElementer = (({ enhetId }) => ({ enhetId }))(behandlendeEnhet);
    return (<div className="personkort__visning visningEnhet">
        <PersonkortVisningElement
            tittel={behandlendeEnhet.navn}
            imgUrl="/sykefravaer/img/svg/kontorbygg.svg"
            informasjon={valgteElementer}>
            <PersonkortVisningInformasjon
                informasjonNokkelTekster={informasjonNokkelTekster}
                informasjon={valgteElementer}
            />
        </PersonkortVisningElement>
    </div>);
};
VisningEnhet.propTypes = {
    behandlendeEnhet: PropTypes.object,
};

export const PersonkortVisning = ({ navbruker, ledere, fastleger, behandlendeEnhet, visning }) => {
    if (visning === PERSONKORTVISNING_TYPE.LEGE) {
        return (<VisningLege
            aktivFastlege={fastleger.aktiv}
            tidligereFastleger={fastleger.tidligere}
            sykmeldtNavn={navbruker.navn}
        />);
    } else if (visning === PERSONKORTVISNING_TYPE.LEDER) {
        return (<VisningLeder
            ledere={ledere}
        />);
    } else if (visning === PERSONKORTVISNING_TYPE.ENHET) {
        return (<VisningEnhet
            behandlendeEnhet={behandlendeEnhet}
        />);
    }
    return (<VisningSykmeldt
        navbruker={navbruker}
    />);
};
PersonkortVisning.propTypes = {
    visning: PropTypes.string,
    navbruker: PropTypes.object,
    ledere: PropTypes.array,
    fastleger: PropTypes.object,
    behandlendeEnhet: PropTypes.object,
};

export default PersonkortVisning;
