import React from 'react';
import PropTypes from 'prop-types';
import EtikettBase from 'nav-frontend-etiketter';
import {
    formaterFnr,
    hentBrukersAlderFraFnr,
    hentBrukersKjoennFraFnr,
} from '../../utils/fnrUtils';
import { KJOENN } from '../../konstanter';
import { sykmeldingerHasCoronaDiagnose } from '../../utils/sykmeldinger/sykmeldingUtils';

const PersonkortHeader = ({ diskresjonskode, egenansatt, navbruker, sykmeldinger }) => {
    const hasCoronaDiagnose = sykmeldingerHasCoronaDiagnose(sykmeldinger);
    const visEtiketter = diskresjonskode.data.diskresjonskode === '6'
        || diskresjonskode.data.diskresjonskode === '7'
        || egenansatt.data.erEgenAnsatt
        || hasCoronaDiagnose;
    const tittelImg = hentBrukersKjoennFraFnr(navbruker.kontaktinfo.fnr) === KJOENN.KVINNE ?
        '/sykefravaer/img/svg/kvinne.svg' : '/sykefravaer/img/svg/mann.svg';

    return (<div className="personkortHeader">
        <div className="personkortHeader__info">
            <img src={tittelImg} alt="person" />
            <div>
                <h3>{`${navbruker.navn ? navbruker.navn : ''} (${hentBrukersAlderFraFnr(navbruker.kontaktinfo.fnr)} år)`}</h3>
                <p>{formaterFnr(navbruker.kontaktinfo.fnr)}</p>
            </div>
        </div>
        {
            visEtiketter && <div className="personkortHeader__etikker">
                {
                    diskresjonskode.data.diskresjonskode === '6'
                    && (<EtikettBase type="fokus">Kode 6</EtikettBase>)
                }
                {
                    diskresjonskode.data.diskresjonskode === '7'
                    && (<EtikettBase type="fokus">Kode 7</EtikettBase>)
                }
                {
                    egenansatt.data.erEgenAnsatt
                    && <EtikettBase type="fokus">Egenansatt</EtikettBase>
                }
                {
                    hasCoronaDiagnose
                    && <EtikettBase type="fokus">Koronasykmeldt</EtikettBase>
                }
            </div>
        }
    </div>);
};

PersonkortHeader.propTypes = {
    egenansatt: PropTypes.object,
    diskresjonskode: PropTypes.object,
    navbruker: PropTypes.object,
    sykmeldinger: PropTypes.arrayOf(PropTypes.object),
};

export default PersonkortHeader;
