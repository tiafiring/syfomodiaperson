import React, {PropTypes} from "react";

const KontaktInfoFeilmelding = ({ feilmelding }) => {
    return (<div className="panel">
        <div className="hode hode-feil">
            { feilmelding }
        </div>
    </div>);
};

KontaktInfoFeilmelding.propTypes = {
    feilmelding: PropTypes.string,
};

export default KontaktInfoFeilmelding;