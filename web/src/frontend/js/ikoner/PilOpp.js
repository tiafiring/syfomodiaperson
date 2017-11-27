import React from 'react';

const PilOpp = ({ farge }) => {
    return (<svg style={{ flex: 1 }} width="20" height="20" viewBox='0 0 15.15 9'>
            <path style={{ fill:'none', stroke:farge, strokeLinecap:'round', strokeLinejoin: 'round' }} d='M14.65 8.5L7.58.5.5 8.5' />
        </svg>
    );
};

export default PilOpp;
