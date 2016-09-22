const arbeidsgiversSykmeldinger = (state = {}, action = {}) => {
    switch (action.type) {
        case 'SET_ARBEIDSGIVERS_SYKMELDINGER': {
            return {
                data: action.data,
            };
        }
        default: {
            return state;
        }
    }
};

export default arbeidsgiversSykmeldinger;
