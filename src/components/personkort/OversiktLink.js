import React from 'react';
import { fullNaisUrlDefault } from '../../utils/miljoUtil';

const texts = {
    link: 'Til oversikten',
};

const OversiktLink = () => {
    return (
        <div className="oversiktlenke">
            <a href={fullNaisUrlDefault('syfooversikt', '/enhet')} alt="syfooversikt" className="lenke oversiktlenke__lenke">
                {texts.link}
            </a>
        </div>);
};

export default OversiktLink;
