import React, {Component, PropTypes} from "react";
import NavbrukerinfoContainer from "../containers/NavbrukerinfoContainer";
import GlobalNavigasjonContainer from "../containers/GlobalNavigasjonContainer";
const DocumentTitle = require('react-document-title');

export class Side extends Component {

    componentDidMount() {
        const scrollomrade = document.getElementById("modiasyfoscroll");
        const scrollhoyde = screen.height - scrollomrade.offsetTop;
        scrollomrade.style.maxHeight = scrollhoyde + 'px';
    }

    render() {
        const { tittel = '', children, aktivtMenypunkt } = this.props;
            return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - Sykefravær' : 'Sykefravær')}>
                <div className="wrap">
                    <NavbrukerinfoContainer />
                    <div className="grid">
                        <nav className="unit one-third">
                            <GlobalNavigasjonContainer aktivtMenypunkt={aktivtMenypunkt} />
                        </nav>
                        <div className="unit two-thirds">
                            <div className="modiasyfoscroll" id="modiasyfoscroll">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>);
        };
    }

Side.propTypes = {
    children: PropTypes.object,
    fnr: PropTypes.string,
    tittel: PropTypes.string,
    aktivtMenypunkt: PropTypes.string,
};

export default Side;
