import React, { PropTypes } from 'react';

const MotebookingIkon = ({ deltaker, index }) => {
    const finnKlasseOgTekst = () => {
        if (new Date(deltaker.svar[index].created) < new Date(deltaker.svartTidspunkt)) {
            return deltaker.svar[index].valgt ? { klasse: 'kan', tekst: 'kan' } : { klasse: 'kanikke', tekst: 'kan ikke' };
        }

        return { klasse: 'ikkesvar', tekst: 'ikke svart' };
    };

    const { klasse } = finnKlasseOgTekst(deltaker, index);

    return (
        <span className="motestatus__svar__inner">
            <img className="motestatus__ikon"
                src={`/sykefravaer/img/svg/status--${klasse}.svg`} alt="" />
        </span>
    );
};

MotebookingIkon.propTypes = {
    deltaker: PropTypes.shape({
        navn: PropTypes.string,
        tidOgSted: PropTypes.array,
        type: PropTypes.string,
    }),
    index: PropTypes.number,
};

export default MotebookingIkon;
