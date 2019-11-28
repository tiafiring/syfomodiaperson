import React from 'react';
import PropTypes from 'prop-types';
import {
    finnMidlertidigAdresseTekst,
    finnMidlertidigAdresseTittel,
    finnPostadresseTittel,
    formatterNorskAdresse,
    formatterUstrukturertAdresse,
} from '../../utils/adresseUtils';
import PersonkortElement from './PersonkortElement';
import PersonkortInformasjon from './PersonkortInformasjon';
import { formaterFnr } from '../../utils/fnrUtils';

const texts = {
    fnr: 'F.nummer',
    phone: 'Telefon',
    email: 'E-post',
    folkeregistrert: 'Folkeregistrert Adresse',
};

const PersonkortSykmeldt = ({ navbruker }) => {
    const informasjonNokkelTekster = new Map([
        ['fnr', texts.fnr],
        ['tlf', texts.phone],
        ['epost', texts.email],
        ['folkeregistrert', texts.folkeregistrert],
        ['postadresse', finnPostadresseTittel(navbruker)],
        ['midlertidigAdresse', finnMidlertidigAdresseTittel(navbruker)],
    ]);
    const ER_MIDLERTIDIG_ADRESSE = false;
    const ER_IKKE_POSTADRESSE = false;
    const valgteElementerAdresse = (({ folkeregistrert, postadresse, midlertidigAdresse }) => {
        return { folkeregistrert, postadresse, midlertidigAdresse };
    })({
        folkeregistrert: formatterNorskAdresse(navbruker.bostedsadresse, ER_MIDLERTIDIG_ADRESSE),
        postadresse: formatterUstrukturertAdresse(navbruker.postAdresse, ER_IKKE_POSTADRESSE),
        midlertidigAdresse: finnMidlertidigAdresseTekst(navbruker),
    });
    const valgteElementerKontaktinfo = (({ tlf, epost, fnr }) => {
        return {
            tlf,
            epost,
            fnr: formaterFnr(fnr),
        };
    })(navbruker.kontaktinfo);
    const valgteElementer = Object.assign({}, valgteElementerKontaktinfo, valgteElementerAdresse);

    return (<PersonkortElement
        tittel="Kontaktinformasjon"
        imgUrl="/sykefravaer/img/svg/person.svg"
        antallKolonner={3}>
        <PersonkortInformasjon informasjonNokkelTekster={informasjonNokkelTekster} informasjon={valgteElementer} />
    </PersonkortElement>);
};

PersonkortSykmeldt.propTypes = {
    navbruker: PropTypes.object,
};

export default PersonkortSykmeldt;
