import React, {PropTypes} from "react";
import NavbrukerinfoContainer from "../containers/NavbrukerinfoContainer";
import GlobalNavigasjonContainer from "../containers/GlobalNavigasjonContainer";
const DocumentTitle = require('react-document-title');

const Side = ({ tittel = '', children, aktivtMenypunkt }) => {
    return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - Sykefravær' : 'Sykefravær')}>
        <div className="wrap">
            <NavbrukerinfoContainer />
            <div className="grid">
                <nav className="unit one-third">
                    <GlobalNavigasjonContainer aktivtMenypunkt={aktivtMenypunkt} />
                </nav>
                <div className="unit two-thirds">
                    <div className="overflow">
                    {children}
                    </div>
                </div>
            </div>
        </div>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.object,
    fnr: PropTypes.string,
    tittel: PropTypes.string,
    aktivtMenypunkt: PropTypes.string,
};

export default Side;
