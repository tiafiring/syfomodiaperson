import React, { PropTypes } from 'react';

const Side = ({ children }) => {
    return <div className="container">{children}</div>;
};

Side.propTypes = {
    children: PropTypes.array,
};

export default Side;
