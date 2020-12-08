import {
  HENTER_FASTLEGER,
  FASTLEGER_HENTET,
  FASTLEGER_IKKE_FUNNET,
  HENT_FASTLEGER_FEILET,
} from "./fastleger_actions";

const initiellState = {
  henter: false,
  hentet: false,
  ikkeFunnet: false,
  hentingFeilet: false,
  data: [],
  aktiv: {},
  tidligere: [],
};

export default function fastleger(state = initiellState, action) {
  switch (action.type) {
    case HENTER_FASTLEGER: {
      return Object.assign({}, state, {
        henter: true,
        hentet: false,
        hentingFeilet: false,
        ikkeFunnet: false,
        data: [],
      });
    }
    case FASTLEGER_HENTET: {
      if (action.data.length > 0) {
        const aktiv = action.data.filter((lege) => {
          return (
            new Date(lege.pasientforhold.fom) < new Date() &&
            new Date(lege.pasientforhold.tom) > new Date()
          );
        })[0];

        const tidligere = action.data.filter((lege) => {
          return new Date(lege.pasientforhold.tom) < new Date();
        });
        return Object.assign({}, state, {
          henter: false,
          hentet: true,
          data: action.data,
          aktiv,
          tidligere,
        });
      }
      return Object.assign({}, state, {
        henter: false,
        hentet: true,
        data: [],
        ikkeFunnet: true,
      });
    }
    case FASTLEGER_IKKE_FUNNET: {
      return Object.assign({}, state, {
        henter: false,
        ikkeFunnet: true,
      });
    }
    case HENT_FASTLEGER_FEILET: {
      return Object.assign({}, state, {
        henter: false,
        hentingFeilet: true,
        data: [],
      });
    }
    default: {
      return state;
    }
  }
}
