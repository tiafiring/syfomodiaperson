export const lagNummer = (streng: string) => {
  return streng.replace(/[^\d.-]/g, "").replace(/-/g, "");
};

export const formaterTid = (input: string) => {
  const grupper = lagNummer(input).split(".");
  const tid = grupper.join("");
  if (tid.length > 2 || grupper.length > 1) {
    return tid.replace(/(.{2})/, "$1.");
  }
  return tid;
};

interface VisProps {
  hvis?: boolean;
  children?: any;
  render?: any;
}

export const Vis = (visProps: VisProps) => {
  const { hvis, children, render } = visProps;
  return hvis && render ? render() : hvis && children ? children : null;
};

export const formaterOrgnr = (orgnr: string) => {
  return orgnr ? orgnr.replace(/(...)(...)(...)/g, "$1 $2 $3") : null;
};

export const tilStorForbokstav = (streng: string) => {
  return streng.replace(/^\w/, (c) => {
    return c.toUpperCase();
  });
};
