import React from 'react';

const PilHoyre = ({ farge }) => {
    return (<svg width="14" height="14" viewBox="0 0 9.19 16.83">
            <polyline style={{ fill: 'none', stroke:farge, strokeLinecap:'round', strokeWidth: '2px' }} points="1 1 7.83 8.42 1 15.83"/>
        </svg>
    );
};

export default PilHoyre;
