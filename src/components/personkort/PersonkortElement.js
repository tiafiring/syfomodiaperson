import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import EtikettBase from 'nav-frontend-etiketter';

const titleLabel = (text) => {
    return (<EtikettBase className="personkortElement__tittelLabel" type="info">
        {text}
    </EtikettBase>);
};

const PersonkortElement = ({ tittel, imgUrl, children, antallKolonner = 2, titleLabelText }) => {
    const imgAlt = imgUrl.split('/').reverse()[0].split('.')[0];
    const classNameRad = cn('personkortElement__rad', {
        'personkortElement__rad--treKolonner': antallKolonner === 3,
        'personkortElement__rad--toKolonner': antallKolonner === 2,
    });
    return (<div className="personkortElement">
        <div className="personkortElement__tittel">
            <img src={imgUrl} alt={imgAlt} />
            <h4>{tittel}</h4>
            {titleLabelText && titleLabelText.length > 0 && titleLabel(titleLabelText)}
        </div>
        <div className={classNameRad}>
            {children}
        </div>
    </div>);
};

PersonkortElement.propTypes = {
    tittel: PropTypes.string,
    imgUrl: PropTypes.string,
    antallKolonner: PropTypes.number,
    children: PropTypes.node,
    titleLabelText: PropTypes.string,
};

export default PersonkortElement;
