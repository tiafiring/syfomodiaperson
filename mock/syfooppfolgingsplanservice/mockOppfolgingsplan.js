const defaultOppfolgingsplaner = require("./defaultOppfolgingsplaner");

const getOppfolgingsplaner = () => {
  const oppfolgingsplaner =
    defaultOppfolgingsplaner.getDefaultOppfolgingsplaner() || [];
  if (oppfolgingsplaner.length === 0) {
    return [];
  }
  return oppfolgingsplaner;
};

module.exports = {
  getOppfolgingsplaner,
};
