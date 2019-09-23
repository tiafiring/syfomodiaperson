import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AlertStripe from 'nav-frontend-alertstriper';
import { getLedetekst, tilLesbarDatoMedArstall } from '@navikt/digisyfo-npm';
import { soknadEllerSykepengesoknad } from '../../propTypes/index';
import { getTidligsteSendtDato } from '../../utils/sykepengesoknadUtils';

export const KorrigertAv = ({ korrigertAvSoknad, fnr }) => {
    return (<AlertStripe type="info" className="blokk">
        <p className="sist">
            {getLedetekst('sykepengesoknad.korrigert.tekst', {
                '%DATO%': tilLesbarDatoMedArstall(getTidligsteSendtDato(korrigertAvSoknad)),
            })}
        </p>
        <p className="sist">
            <Link className="lenke" to={`/sykefravaer/${fnr}/sykepengesoknader/${korrigertAvSoknad.id}`}>{getLedetekst('sykepengesoknad.korrigert.lenketekst')}</Link>
        </p>
    </AlertStripe>);
};

KorrigertAv.propTypes = {
    korrigertAvSoknad: soknadEllerSykepengesoknad,
    fnr: PropTypes.string,
};

export const mapStateToProps = (state, ownProps) => {
    const id = ownProps.sykepengesoknad.id;
    const sykepengesoknader = [
        ...state.sykepengesoknader.data,
        ...state.soknader.data,
    ];
    let korrigertAvSoknad = { id };

    sykepengesoknader.forEach(() => {
        sykepengesoknader.forEach((s) => {
            if (s.korrigerer === korrigertAvSoknad.id) {
                korrigertAvSoknad = s;
            }
        });
    });

    return {
        korrigertAvSoknad,
    };
};

const KorrigertAvContainer = connect(mapStateToProps)(KorrigertAv);

export default KorrigertAvContainer;
