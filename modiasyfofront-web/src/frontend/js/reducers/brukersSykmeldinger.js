const brukersSykmeldinger = (state = {}, action = {}) => {
    switch (action.type) {
        case 'SET_BRUKERS_SYKMELDINGER': {
            return {
                data: action.data,
            };
        }
        default: {
            return state;
        }
    }
};

export default brukersSykmeldinger;
