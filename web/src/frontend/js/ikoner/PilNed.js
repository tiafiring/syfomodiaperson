import React from 'react';

const PilNed = ({ farge }) => {
    return (<svg style={{ flex: 1 }} width="20" height="20" viewBox="0 0 15.15 9">
            <path style={{ fill:'none', stroke:farge, strokeLinecap:'round', strokeLinejoin: 'round' }} d="M.5.5l7.08 8 7.07-8" />
        </svg>
    );
};

export default PilNed;
