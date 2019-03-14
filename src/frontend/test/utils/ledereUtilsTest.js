import { expect } from 'chai';
import {
    filtrerLederePaaArbeidstakersMotebehov,
    filtrerLederePaaOppfolgingstilfelleperioder,
    finnLedereUtenInnsendtMotebehov,
    fjernLedereMedInnsendtMotebehov,
} from '../../js/utils/ledereUtils';
import {ANTALL_MS_DAG} from "../../js/utils/datoUtils";

describe('ledereUtils', () => {
    describe('filtrerLederePaaArbeidstakersMotebehov', () => {
        it('skal finne alle ledere som hører til en bedrift den sykmeldte har sendt inn møtebehovsvar for', () => {
            const ledere = [
                {
                    orgnummer: '123',
                    aktoerId: '1',
                },
                {
                    orgnummer: '321',
                    aktoerId: '2',
                },
                {
                    orgnummer: '999',
                    aktoerId: '3',
                },
            ];
            const motebehovData = [
                {
                    opprettetAv: '0',
                    aktorId: '0',
                    virksomhetsnummer: '123',
                },
                {
                    opprettetAv: '0',
                    aktorId: '0',
                    virksomhetsnummer: '999',
                },
            ];

            const filtrertLederListe = filtrerLederePaaArbeidstakersMotebehov(ledere, motebehovData);

            expect(filtrertLederListe.length).to.equal(2);
            expect(filtrertLederListe[0].orgnummer).to.equal('123');
            expect(filtrertLederListe[1].orgnummer).to.equal('999');
        })
    });
    describe('fjernLedereMedInnsendtMotebehov', () => {
        it('skal fjerne ledere med innsendt møtebehov fra lederlisten', () => {
            const ledere = [
                {
                    orgnummer: '123',
                    aktoerId: '1',
                },
                {
                    orgnummer: '321',
                    aktoerId: '2',
                },
            ];
            const motebehovData = [
                {
                    opprettetAv: '1',
                    aktorId: '0',
                    virksomhetsnummer: '123',
                },
            ];

           const filtrertLederListe = fjernLedereMedInnsendtMotebehov(ledere, motebehovData);

           expect(filtrertLederListe.length).to.equal(1);
           expect(filtrertLederListe[0].orgnummer).to.equal('321')
        });
    });
    describe('filtrerLederePaaOppfolgingstilfelleperioder', () => {
        it('skal fjerne ledere uten oppfølgingstilfelle innenfor møtebehovperioden', () => {
            const ledere = [
                {
                    orgnummer: '123',
                    aktoerId: '1',
                },
                {
                    orgnummer: '321',
                    aktoerId: '2',
                },
            ];
            let oppfolgingstilfeller = [];
            oppfolgingstilfeller['123'] = {
                data: [
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 120)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 90)),
                    },
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 80)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 50)),
                    },
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 40)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 10)),
                    },
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 5)),
                        tom: new Date(Date.now() + (ANTALL_MS_DAG * 15)),
                    },
                ],
            };

            oppfolgingstilfeller['321'] = {
                data: [
                    {
                        orgnummer: '321',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 80)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 50)),
                    },
                    {
                        orgnummer: '321',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 40)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 10)),
                    },
                ],
            };

           const filtrertLederListe = filtrerLederePaaOppfolgingstilfelleperioder(ledere, oppfolgingstilfeller);

           expect(filtrertLederListe.length).to.equal(1);
           expect(filtrertLederListe[0].orgnummer).to.equal('123')
        });
    });
    describe('finnLedereUtenInnsendtMotebehov', () => {
        it('skal finne ledere som ikke har sendt inn møtebehov, men som er i møtebehovperioden', () => {
            const ledere = [
                {
                    orgnummer: '123',
                    aktoerId: '1',
                },
                {
                    orgnummer: '321',
                    aktoerId: '2',
                },
                {
                    orgnummer: '999',
                    aktoerId: '3',
                },
            ];
            let oppfolgingstilfeller = [];
            oppfolgingstilfeller['123'] = {
                data: [
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 120)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 90)),
                    },
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 80)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 50)),
                    },
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 40)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 10)),
                    },
                    {
                        orgnummer: '123',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 5)),
                        tom: new Date(Date.now() + (ANTALL_MS_DAG * 15)),
                    },
                ],
            };

            oppfolgingstilfeller['999'] = {
                data: [
                    {
                        orgnummer: '999',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 120)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 90)),
                    },
                    {
                        orgnummer: '999',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 80)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 50)),
                    },
                    {
                        orgnummer: '999',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 40)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 10)),
                    },
                    {
                        orgnummer: '999',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 5)),
                        tom: new Date(Date.now() + (ANTALL_MS_DAG * 15)),
                    },
                ],
            };

            oppfolgingstilfeller['321'] = {
                data: [
                    {
                        orgnummer: '321',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 80)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 50)),
                    },
                    {
                        orgnummer: '321',
                        fom: new Date(Date.now() - (ANTALL_MS_DAG * 40)),
                        tom: new Date(Date.now() - (ANTALL_MS_DAG * 10)),
                    },
                ],
            };

            const motebehovData = [
                {
                    opprettetAv: '1',
                    aktorId: '0',
                    virksomhetsnummer: '123',
                },
            ];

           const filtrertLederListe = finnLedereUtenInnsendtMotebehov(ledere, motebehovData, oppfolgingstilfeller);

           expect(filtrertLederListe.length).to.equal(1);
           expect(filtrertLederListe[0].orgnummer).to.equal('999')
        });
    });
    describe('finnLedereUtenInnsendtMotebehov', () => {
        it('skal finne ledere som ikke har sendt inn møtebehov men hadde muligheten, og SM svarte', () => {
            const oppfolgingstilfeller = [];
            const ledere = [
                {
                    orgnummer: '123',
                    aktoerId: '1',
                },
                {
                    orgnummer: '321',
                    aktoerId: '2',
                },
                {
                    orgnummer: '999',
                    aktoerId: '3',
                },
            ];
            const motebehovData = [
                {
                    opprettetAv: '0',
                    aktorId: '0',
                    virksomhetsnummer: '123',
                },
                {
                    opprettetAv: '0',
                    aktorId: '0',
                    virksomhetsnummer: '999',
                },
                {
                    opprettetAv: '3',
                    aktorId: '0',
                    virksomhetsnummer: '999',
                },
            ];

           const filtrertLederListe = finnLedereUtenInnsendtMotebehov(ledere, motebehovData, oppfolgingstilfeller);

           expect(filtrertLederListe.length).to.equal(1);
           expect(filtrertLederListe[0].orgnummer).to.equal('123')
        });
    });
});
