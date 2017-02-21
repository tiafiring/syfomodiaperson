import React, { PropTypes } from 'react';

const MotebookingIkon = ({ deltaker, index }) => {
    const finnKlasseOgTekst = () => {
        const harSvart = deltaker.avvik.length > 0 || deltaker.svar
        .map((alternativ) => {
            return alternativ.valgt;
        })
        .reduce((acc, b) => {
            return acc || b;
        });

        if (harSvart && new Date(deltaker.svar[index].created) < new Date(deltaker.svartTidspunkt) ) {
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
