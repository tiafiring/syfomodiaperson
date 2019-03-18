import { expect } from 'chai';
import {
    getGjeldendeMotebehovOppgaver,
    getIkkeFullforteOppgaver,
    getSistEndretOppgave,
} from '../../js/utils/veilederoppgaverUtils';

describe('veilederoppgaverutils', () => {
    describe('getGjeldendeMotebehovOppgaver', () => {
        it('Skal gi en liste med veilederoppgaver av typen møtebehov som hører til de møtebehovene som er sendt inn', () => {
            const oppgaveListe = [
                {
                    id: 1,
                    uuid: '11',
                    type: 'MOTEBEHOV_MOTTATT',
                },
                {
                    id: 2,
                    uuid: '22',
                    type: 'MOTEBEHOV_MOTTATT',
                },
                {
                    id: 3,
                    uuid: '33',
                    type: 'MOTEBEHOV_MOTTATT',
                },
                {
                    id: 4,
                    uuid: '44',
                    type: 'SE_OPPFOLGINGSPLAN',
                },
            ];

            const motebehovListe = [
                {
                    UUID: "test1",
                    id: "22",
                },
                {
                    UUID: "test2",
                    id: "33",
                },
            ];

            const gjeldendeOppgaver = getGjeldendeMotebehovOppgaver(oppgaveListe, motebehovListe);

            expect(gjeldendeOppgaver.length).to.equal(2);
            expect(gjeldendeOppgaver[0].id).to.equal(2);
            expect(gjeldendeOppgaver[1].id).to.equal(3);
        });
    });
    describe('getIkkeFullforteOppgaver', () => {
        it('Skal gi en liste med alle oppgaver som ikke er fullført', () => {
            const IKKE_STARTET = 'IKKE_STARTET';
            const FERDIG = 'FERDIG';

            const oppgaveListe = [
                {
                    id: 1,
                    type: 'MOTEBEHOV_MOTTATT',
                    status: IKKE_STARTET,
                },
                {
                    id: 2,
                    type: 'MOTEBEHOV_MOTTATT',
                    status: FERDIG,
                },
                {
                    id: 3,
                    type: 'MOTEBEHOV_MOTTATT',
                    status: FERDIG,
                },
                {
                    id: 4,
                    type: 'SE_OPPFOLGINGSPLAN',
                    status: IKKE_STARTET,
                },
            ];

            const ikkeFullforteOppgaver = getIkkeFullforteOppgaver(oppgaveListe);

            expect(ikkeFullforteOppgaver.length).to.equal(2);
            expect(ikkeFullforteOppgaver[0].id).to.equal(1);
            expect(ikkeFullforteOppgaver[1].id).to.equal(4);
        });
        it('Skal gi en tom liste hvis alle oppgaver er fullført', () => {
            const IKKE_STARTET = 'IKKE_STARTET';
            const FERDIG = 'FERDIG';
            const oppgaveListe = [
                {
                    id: 1,
                    type: 'MOTEBEHOV_MOTTATT',
                    status: FERDIG,
                },
                {
                    id: 3,
                    type: 'MOTEBEHOV_MOTTATT',
                    status: FERDIG,
                },
                {
                    id: 4,
                    type: 'SE_OPPFOLGINGSPLAN',
                    status: FERDIG,
                },
            ];

            const ikkeFullforteOppgaver = getIkkeFullforteOppgaver(oppgaveListe);

            expect(ikkeFullforteOppgaver.length).to.equal(0);
        });
    });
    describe('getSistEndretOppgave', () => {
        it('Skal gi den sist endrede oppgaven', () => {
            const dato1 = '2018-12-06T16:32:31.798+01:00';
            const dato2 =  '2018-12-06T16:32:31.798+01:00';
            const dato3 =  '2019-05-05T16:32:31.798+01:00';

            const oppgaveListe = [
                {
                    id: 1,
                    created: dato1,
                    sistEndret: dato2,
                },
                {
                    id: 2,
                    created: dato1,
                    sistEndret: dato1,
                },
                {
                    id: 3,
                    created: dato2,
                    sistEndret: dato3,
                },
            ];

            const sistEndretOppgave = getSistEndretOppgave(oppgaveListe);

            expect(sistEndretOppgave.id).to.equal(3);
            expect(sistEndretOppgave.sistEndret).to.equal(dato3);
        });
    });
});
