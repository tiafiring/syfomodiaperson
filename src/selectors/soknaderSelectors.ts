export const sykmeldingHarSoknad = (state: any, sykmeldingId: any) => {
  return (
    state.soknader.data.filter((s: any) => {
      return s.sykmeldingId === sykmeldingId;
    }).length > 0
  );
};
