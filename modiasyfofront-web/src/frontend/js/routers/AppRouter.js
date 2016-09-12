import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';

const MinSide = () => {
    return <div>Dette er min side</div>
}

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={MinSide} />
        <Route path="/" component={MinSide} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
