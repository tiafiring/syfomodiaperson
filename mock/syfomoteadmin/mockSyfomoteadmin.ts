import { virksomhetMock } from "../data/virksomhetMock";
import { moterMock } from "../data/moterMock";
import { historikkmoterMock } from "../data/historikkmoterMock";
import { ledereMock } from "../data/ledereMock";

const mockOpprettetIdResultat = () => {
  mockOpprettetIdResultat.rollingCounter += 1;
};
mockOpprettetIdResultat.rollingCounter = 100;

const mockMoteAlternativer = (alternativer) => {
  return alternativer.map((alternativ) => {
    return {
      id: (mockOpprettetIdResultat.rollingCounter += 1),
      tid: alternativ.tid,
      created: new Date().toString(),
      sted: alternativ.sted,
      valgt: false,
    };
  });
};

const mockMoteDeltakere = (alternativer, orgnummer) => {
  const leder = ledereMock.find((leder) => {
    return leder.orgnummer === orgnummer;
  });

  return [
    {
      deltakerUuid: "66f1d827-94db-43d4-b6de-2f7902e76bf8",
      navn: "Samuel Jones",
      fnr: "19026900010",
      orgnummer: orgnummer,
      epost: "samuel@pontypandyfire.gov.uk",
      type: "Bruker",
      svartidspunkt: null,
      svar: alternativer,
    },
    {
      deltakerUuid: "198a6dbf-c987-4b57-a401-a3915ec11424",
      navn: leder!!.navn,
      fnr: "12345678913",
      orgnummer: orgnummer,
      epost: leder!!.epost,
      type: "arbeidsgiver",
      svartidspunkt: null,
      svar: alternativer,
    },
  ];
};

const mockForLokal = (server) => {
  server.get("/syfomoteadmin/api/internad/moter", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(moterMock));
  });

  server.get("/syfomoteadmin/api/internad/historikk", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(historikkmoterMock));
  });

  server.get("/syfomoteadmin/api/internad/virksomhet/110110110", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(virksomhetMock("Fire Station"));
  });

  server.get(
    "/syfomoteadmin/api/internad/virksomhet/:virksomhetsnummer",
    (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(virksomhetMock());
    }
  );
};

const mockEndepunkterSomEndrerState = (server) => {
  server.post("/syfomoteadmin/api/internad/moter/:uuid/avbryt", (req, res) => {
    const { uuid } = req.params;
    const oppdaterteMoter = moterMock.map((mote) => {
      if (mote.moteUuid.toString() === uuid.toString()) {
        mote.status = "AVBRUTT";
      }
    });
    Object.assign(moterMock, ...oppdaterteMoter);

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({}));
  });

  server.post("/syfomoteadmin/api/internad/moter/:uuid/bekreft", (req, res) => {
    const { valgtAlternativId } = req.query;
    const { uuid } = req.params;
    const oppdaterteMoter = moterMock.map((mote) => {
      if (mote.moteUuid.toString() === uuid.toString()) {
        mote.status = "BEKREFTET";
        const alternativ = mote.alternativer.find((alternativ) => {
          return alternativ.id.toString() === valgtAlternativId.toString();
        });
        if (alternativ) {
          mote.bekreftetAlternativ = alternativ;
        }
      }
    });
    Object.assign(moterMock, ...oppdaterteMoter);

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({}));
  });

  server.post(
    "/syfomoteadmin/api/internad/moter/:uuid/nyealternativer",
    (req, res) => {
      res.json({ requestBody: req.body });

      const reqBody = req.body;
      const { uuid } = req.params;

      const nyeAlternativer = mockMoteAlternativer(reqBody);
      const oppdaterteMoter = moterMock.map((mote) => {
        if (mote.moteUuid.toString() === uuid.toString()) {
          mote.alternativer = [...mote.alternativer, ...nyeAlternativer];
          mote.deltakere.map((deltaker) => {
            deltaker.svar = [...deltaker.svar, ...nyeAlternativer];
          });
          mote.sistEndret = new Date().toString();
        }
      });
      Object.assign(moterMock, ...oppdaterteMoter);

      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({}));
    }
  );

  server.post("/syfomoteadmin/api/internad/moter", (req, res) => {
    res.json({ requestBody: req.body });

    const reqBody = req.body;

    const alternativer = mockMoteAlternativer(reqBody.alternativer);
    const deltakere = mockMoteDeltakere(alternativer, reqBody.orgnummer);

    const nyttMote = {
      id: (mockOpprettetIdResultat.rollingCounter += 1),
      moteUuid: `${mockOpprettetIdResultat.rollingCounter}-abc`,
      opprettetAv: "Z990000",
      aktorId: "1",
      status: "OPPRETTET",
      fnr: reqBody.fnr,
      opprettetTidspunkt: new Date().toDateString(),
      bekreftetTidspunkt: null,
      navEnhet: reqBody.navEnhet,
      eier: "Z990000",
      deltakere: deltakere,
      bekreftetAlternativ: null,
      alternativer: alternativer,
      sistEndret: new Date().toString(),
    };

    moterMock.push(nyttMote);

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({}));
  });
};

export const mockSyfomoteadmin = (server) => {
  mockForLokal(server);
  mockEndepunkterSomEndrerState(server);
};
