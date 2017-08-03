import React, { PropTypes } from 'react';

const Sidetopp = ({ tittel, htmlTekst }) => {
    return (<header className="sidetopp js-sidetopp">
        <h3 className="sidetopp__tittel">{tittel}</h3>
        {
            htmlTekst && <div className="sidetopp__intro js-intro">
                <p dangerouslySetInnerHTML={htmlTekst} />
            </div>
        }
    </header>);
};

Sidetopp.propTypes = {
    tittel: PropTypes.string,
    htmlTekst: PropTypes.object,
};

export default Sidetopp;
