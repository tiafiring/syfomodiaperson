import { DecoratorProps, EnhetDisplay, FnrDisplay } from "./decoratorProps";

const decoratorConfig = (
  initValueFnr: string,
  setFnr: (fnr: string) => void,
  setEnhet: (enhet: string) => void
): DecoratorProps => {
  return {
    appname: "Sykefraværsoppfølging",
    fnr: {
      initialValue: null,
      display: FnrDisplay.SOKEFELT,
      onChange: (value) => {
        if (value && value !== initValueFnr) {
          setFnr(value);
        }
      },
    },
    enhet: {
      initialValue: null,
      display: EnhetDisplay.ENHET_VALG,
      onChange(value): void {
        if (value) {
          setEnhet(value);
        }
      },
    },
    toggles: {
      visVeileder: true,
    },
    useProxy: true,
  };
};

export default decoratorConfig;
