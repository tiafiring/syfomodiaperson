import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Alertstripe from 'nav-frontend-alertstriper';
import PersonkortVisning from '../../../js/components/personkort/PersonkortVisning';
import { PERSONKORTVISNING_TYPE } from '../../../js/konstanter';
import PersonkortElement from '../../../js/components/personkort/PersonkortElement';
import PersonkortInformasjon from '../../../js/components/personkort/PersonkortInformasjon';
import PersonkortLedere from '../../../js/components/personkort/PersonkortLedere';
import PersonkortSykmeldt from '../../../js/components/personkort/PersonkortSykmeldt';
import PersonkortEnhet from '../../../js/components/personkort/PersonkortEnhet';
import PersonkortLege, { TidligereLeger } from '../../../js/components/personkort/PersonkortLege';

describe('PersonkortVisning', () => {
    let ledere;
    let navbruker;
    let behandlendeEnhet;
    let fastleger;
    let komponent;

    beforeEach(() => {
        ledere = [{ erOppgitt: true }, { erOppgitt: false }];
        behandlendeEnhet = {
            navn: 'NAV Drammen',
            enhetId: '1234',
        };
        fastleger = {
            henter: false,
            hentingFeilet: false,
            hentet: false,
            data: [{}, {}, {}],
            aktiv: {
                fastlegekontor: {},
                pasientforhold: {
                    fom: '',
                    tom: '',
                },
            },
            tidligere: [
                {
                    fastlegekontor: {},
                    pasientforhold: {
                        fom: '',
                        tom: '',
                    },
                },
                {
                    fastlegekontor: {},
                    pasientforhold: {
                        fom: '',
                        tom: '',
                    },
                },
            ],
        };
        navbruker = {
            navn: 'Knut',
            kontaktinfo: {
                fnr: '1234',
            },
        };
        komponent = mount(<PersonkortVisning
            visning={''}
            ledere={ledere}
            fastleger={fastleger}
            navbruker={navbruker}
            behandlendeEnhet={behandlendeEnhet}
        />);
    });

    it('Skal vise PersonkortSykmeldt, som initielt valg', () => {
        expect(komponent.find(PersonkortSykmeldt)).to.have.length(1);
    });

    it('Skal vise PersonkortLedere, dersom visning for leder er valgt', () => {
        komponent = mount(<PersonkortVisning
            visning={PERSONKORTVISNING_TYPE.LEDER}
            ledere={ledere}
            fastleger={fastleger}
            navbruker={navbruker}
            behandlendeEnhet={behandlendeEnhet}
        />);
        expect(komponent.find(PersonkortLedere)).to.have.length(1);
    });

    it('Skal vise VisningLege, dersom visning for lege er valgt', () => {
        komponent = mount(<PersonkortVisning
            visning={PERSONKORTVISNING_TYPE.LEGE}
            ledere={ledere}
            fastleger={fastleger}
            navbruker={navbruker}
            behandlendeEnhet={behandlendeEnhet}
        />);
        expect(komponent.find(PersonkortLege)).to.have.length(1);
    });

    it('Skal vise VisningEnhet, dersom visning for lege er valgt', () => {
        komponent = mount(<PersonkortVisning
            visning={PERSONKORTVISNING_TYPE.ENHET}
            ledere={ledere}
            fastleger={fastleger}
            navbruker={navbruker}
            behandlendeEnhet={behandlendeEnhet}
        />);
        expect(komponent.find(PersonkortEnhet)).to.have.length(1);
    });

    describe('PersonkortSykmeldt', () => {
        beforeEach(() => {
            komponent = mount(<PersonkortSykmeldt
                navbruker={navbruker}
            />);
        });

        it('Skal vise PersonkortElement', () => {
            expect(komponent.find(PersonkortElement)).to.have.length(1);
        });

        it('Skal vise PersonkortInformasjon', () => {
            expect(komponent.find(PersonkortInformasjon)).to.have.length(1);
        });
    });

    describe('PersonkortLedere', () => {
        beforeEach(() => {
            komponent = mount(<PersonkortLedere
                ledere={ledere}
            />);
        });

        it('Skal vise antall PersonkortElement lik antall ledere', () => {
            expect(komponent.find(PersonkortElement)).to.have.length(ledere.length);
        });

        it('Skal vise antall PersonkortInformasjon for ledere som er oppgitt', () => {
            expect(komponent.find(PersonkortInformasjon)).to.have.length(1);
        });

        it('Skal vise PersonkortElement med feilmelding, dersom ledere ikke er innmeldt', () => {
            expect(komponent.find(Alertstripe)).to.have.length(1);
        });

        it('Skal vise PersonkortElement med feilmelding, dersom bruker ikke har noen ledere ', () => {
            komponent = mount(<PersonkortLedere
                ledere={[]}
            />);
            expect(komponent.find(Alertstripe)).to.have.length(1);
        });
    });

    describe('PersonkortLege', () => {
        beforeEach(() => {
            komponent = mount(<PersonkortLege
                fastleger={fastleger}
                sykmeldtNavn={navbruker.navn}
            />);
        });

        it('Skal vise feilmelding, fastleger ikke ble funnet', () => {
            komponent = mount(<PersonkortLege
                fastleger={Object.assign({}, fastleger, {
                    ikkeFunnet: true,
                })}
                sykmeldtNavn={navbruker.navn}
            />);
            expect(komponent.find(Alertstripe)).to.have.length(1);
        });

        it('Skal vise PersonkortElement', () => {
            expect(komponent.find(PersonkortElement)).to.have.length(2);
        });

        it('Skal vise PersonkortInformasjon', () => {
            expect(komponent.find(PersonkortInformasjon)).to.have.length(1);
        });

        it('Skal vise TidligereLeger', () => {
            expect(komponent.find(TidligereLeger)).to.have.length(1);
        });

        it('Skal ikke tidligere leger dersom det ikke er tidligere fastleger', () => {
            komponent = mount(<PersonkortLege
                fastleger={Object.assign({}, fastleger, {
                    tidligere: [],
                })}
                sykmeldtNavn={navbruker.navn}
            />);
            expect(komponent.find(TidligereLeger)).to.have.length(1);
            expect(komponent.find(TidligereLeger).html()).to.equal(null);
        });
    });

    describe('TidligereLeger', () => {
        beforeEach(() => {
            komponent = mount(<TidligereLeger
                tidligereFastleger={fastleger.tidligere}
            />);
        });

        it('Skal vise en liste med antall element lik antall tidligere fastleger', () => {
            expect(komponent.find('li')).to.have.length(fastleger.tidligere.length);
        });
    });
});
