import React, { PropTypes } from 'react';

const MotebookingIkon = ({ deltaker, index }) => {
    const finnKlasseOgTekst = () => {
        const harSvart = deltaker.avvik.length > 0 || deltaker.tidOgSted.map(tos => tos.valgt).reduce((acc, b) => { return acc || b; });

        if (harSvart) {
            return deltaker.tidOgSted[index].valgt ? { klasse: 'kan', tekst: 'kan' } : { klasse: 'kanikke', tekst: 'kan ikke' };
        }

        return { klasse: 'ikkesvar', tekst: 'ikke svart' };
    };

    const { klasse, tekst } = finnKlasseOgTekst(deltaker, index);

    return (
        <span className="motestatus__svar__inner">
            <img className="motestatus__ikon"
                src={`/sykefravaer/img/svg/status--${klasse}.svg`} alt="" />
            <span
                className={`motestatus__svartekst motestatus__svartekst--${klasse}`}>{tekst}</span>
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
