import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { restdatoTildato } from '../../utils/datoUtils';
import { PERSONKORTVISNING_TYPE } from '../../konstanter';
import {
    formatterNorskAdresse,
    formatterUstrukturertAdresse,
    finnMidlertidigAdresseTittel,
    finnMidlertidigAdresseTekst,
    finnPostadresseTittel,
} from '../../utils/adresseUtils';

const kanskjeBooleanTilJaNeiKanskje = (kanskjeBoolean) => {
    if (kanskjeBoolean === null) {
        return 'Ikke oppgitt';
    }
    return kanskjeBoolean ? 'Ja' : 'Nei';
};

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
                <dl key={idx} className="personkortElement__informasjon">
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
        ['fnr', getLedetekst('modiafront.personkort.visning.nokkeltekster.fnr')],
        ['tlf', getLedetekst('modiafront.personkort.visning.nokkeltekster.tlf')],
        ['epost', getLedetekst('modiafront.personkort.visning.nokkeltekster.epost')],
        ['folkeregistrert', 'Folkeregistrert Adresse'],
        ['postadresse', finnPostadresseTittel(navbruker)],
        ['midlertidigAdresse', finnMidlertidigAdresseTittel(navbruker)],
    ]);
    const ER_MIDLERTIDIG_ADRESSE = false;
    const ER_IKKE_POSTADRESSE = false;
    const valgteElementerAdresse = (({ folkeregistrert, postadresse, midlertidigAdresse }) => ({ folkeregistrert, postadresse, midlertidigAdresse }))({
        folkeregistrert: formatterNorskAdresse(navbruker.bostedsadresse, ER_MIDLERTIDIG_ADRESSE),
        postadresse: formatterUstrukturertAdresse(navbruker.postAdresse, ER_IKKE_POSTADRESSE),
        midlertidigAdresse: finnMidlertidigAdresseTekst(navbruker),
    });
    const valgteElementerKontaktinfo = (({ tlf, epost, fnr }) => ({ tlf, epost, fnr }))(navbruker.kontaktinfo);
    const valgteElementer = Object.assign({}, valgteElementerKontaktinfo, valgteElementerAdresse);
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
        ['arbeidsgiverForskuttererLoenn', getLedetekst('modiafront.personkort.visning.nokkeltekster.forskutterer')],
    ]);
    return (<div className="personkort__visning visningLeder">
        { ledere.length === 0 ?
            <p className="personkort__feilmelding">
                {getLedetekst('modiafront.personkort.visning.leder.feilmelding.ingen-ledere')}
            </p>
            :
            ledere.map((leder, idx) => {
                const valgteElementer = (({ navn, epost, tlf, orgnummer, fomDato, arbeidsgiverForskuttererLoenn }) => ({ navn, epost, tlf, orgnummer, fomDato, arbeidsgiverForskuttererLoenn }))(Object.assign({}, leder, {
                    fomDato: leder.fomDato && restdatoTildato(leder.fomDato),
                    arbeidsgiverForskuttererLoenn: kanskjeBooleanTilJaNeiKanskje(leder.arbeidsgiverForskuttererLoenn),
                }));
                return (<PersonkortVisningElement
                    key={idx}
                    tittel={leder.organisasjonsnavn}
                    imgUrl="/sykefravaer/img/svg/fabrikk.svg">
                    { !leder.erOppgitt ?
                        <p className="personkort__feilmelding">
                            {getLedetekst('modiafront.personkort.visning.leder.feilmelding.ingen-leder')}
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

export const VisningLege = ({ fastleger }) => {
    const informasjonNokkelTekster = new Map([
        ['fom', getLedetekst('modiafront.personkort.visning.nokkeltekster.lege_fom')],
        ['navn', getLedetekst('modiafront.personkort.visning.nokkeltekster.legekontor')],
        ['telefon', getLedetekst('modiafront.personkort.visning.nokkeltekster.tlf')],
    ]);
    const aktivFastlege = fastleger.aktiv;
    const valgteElementerKontor = aktivFastlege.fastlegekontor && (({ navn, telefon }) => ({ navn, telefon }))(aktivFastlege.fastlegekontor);
    const valgteElementerPasientforhold = aktivFastlege.pasientforhold && (({ fom }) => ({ fom }))(Object.assign({}, aktivFastlege.pasientforhold, {
        fom: aktivFastlege.pasientforhold.fom && restdatoTildato(aktivFastlege.pasientforhold.fom),
    }));
    const valgteElementer = Object.assign({}, valgteElementerPasientforhold, valgteElementerKontor);
    return fastleger.ikkeFunnet ?
        <p className="personkort__feilmelding">
            {getLedetekst('modiafront.personkort.visning.fastlege.feilmelding')}
        </p>
        :
        <div className="personkort__visning visningLege">
            <PersonkortVisningElement
                tittel={aktivFastlege.navn}
                imgUrl="/sykefravaer/img/svg/medisinskrin.svg"
                informasjon={valgteElementer}>
                <PersonkortVisningInformasjon
                    informasjonNokkelTekster={informasjonNokkelTekster}
                    informasjon={valgteElementer}
                />
            </PersonkortVisningElement>
            { fastleger.tidligere.length > 0 && <VisningTidligereLeger
                tidligereFastleger={fastleger.tidligere}
            />
            }
        </div>;
};
VisningLege.propTypes = {
    fastleger: PropTypes.object,
};

export const VisningTidligereLeger = ({ tidligereFastleger }) => {
    return (<PersonkortVisningElement
        tittel="Tidligere fastleger"
        imgUrl="/sykefravaer/img/svg/medisinboks.svg">
        <ul>
            {
                tidligereFastleger.map((lege, idx) => {
                    return (lege.pasientforhold && <li key={idx}>
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
            fastleger={fastleger}
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
