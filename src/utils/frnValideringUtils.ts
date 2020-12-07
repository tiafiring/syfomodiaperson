const kontrollRekke1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
const kontrollRekke2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

const decimalRadix = 10;

function erGyldigPnummer(dag: number, maned: number) {
  return dag > 0 && dag <= 32 && maned > 0 && maned <= 12;
}

function erGyldigDNummer(dag: number, maned: number) {
  return dag > 40 && dag <= 72 && maned > 0 && maned <= 12;
}

function erGyldigHNummer(dag: number, maned: number) {
  return dag > 0 && dag <= 32 && maned > 40 && maned <= 52;
}

function erGyldigFodselsdato(fodselsnummer: string) {
  const dag = parseInt(fodselsnummer.substring(0, 2), decimalRadix);
  const maaned = parseInt(fodselsnummer.substring(2, 4), decimalRadix);
  return (
    erGyldigPnummer(dag, maaned) ||
    erGyldigDNummer(dag, maaned) ||
    erGyldigHNummer(dag, maaned)
  );
}

function hentKontrollSiffer(fodselsnummer: any, kontrollrekke: any) {
  let sum = 0;
  for (
    let sifferNummer = 0;
    sifferNummer < fodselsnummer.length;
    sifferNummer += 1
  ) {
    sum += fodselsnummer[sifferNummer] * kontrollrekke[sifferNummer];
  }
  const kontrollSiffer = sum % 11;
  return kontrollSiffer !== 0 ? 11 - kontrollSiffer : 0;
}

export function erGyldigFodselsnummer(fodselsnummer: string) {
  if (!fodselsnummer.match(new RegExp("[0-9]{11}"))) {
    return false;
  }
  if (!erGyldigFodselsdato(fodselsnummer.substring(0, 6))) {
    return false;
  }
  const fodselsnummerListe = fodselsnummer.split("").map((x) => {
    return parseInt(x, decimalRadix);
  });
  const kontrollSiffer1 = hentKontrollSiffer(
    fodselsnummerListe.slice(0, 9),
    kontrollRekke1
  );
  const kontrollSiffer2 = hentKontrollSiffer(
    fodselsnummerListe.slice(0, 10),
    kontrollRekke2
  );
  return (
    fodselsnummerListe[9] === kontrollSiffer1 &&
    fodselsnummerListe[10] === kontrollSiffer2
  );
}
