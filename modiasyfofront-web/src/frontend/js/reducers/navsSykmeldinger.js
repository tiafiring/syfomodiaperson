const navsSykmeldinger = (state = {}, action = {}) => {
    switch (action.type) {
        case 'SET_NAVS_SYKMELDINGER': {
            return {
                data: action.data,
            };
        }
        default: {
            return state;
        }
    }
};

export default navsSykmeldinger;
