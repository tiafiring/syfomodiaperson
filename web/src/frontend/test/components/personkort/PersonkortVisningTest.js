import React from 'react'
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Utvidbar } from 'digisyfo-npm';
import PersonkortVisning, {
    PersonkortVisningElement,
    PersonkortVisningInformasjon,
    VisningSykmeldt,
    VisningLeder,
    VisningLege,
    VisningTidligereLeger,
    VisningEnhet,
} from '../../../js/components/personkort/PersonkortVisning'
import { PERSONKORTVISNING_TYPE } from '../../../js/konstanter';

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
                }
            },
            tidligere: [
                {
                    fastlegekontor: {},
                    pasientforhold: {
                        fom: '',
                        tom: '',
                    }
                },
                {
                    fastlegekontor: {},
                    pasientforhold: {
                        fom: '',
                        tom: '',
                    }
                },
            ],
        };
        navbruker = {
            navn: 'Knut',
            kontaktinfo: {
                fnr: '1234',
            },
        };
        komponent = shallow(<PersonkortVisning
            visning={''}
            ledere={ledere}
            fastleger={fastleger}
            navbruker={navbruker}
            behandlendeEnhet={behandlendeEnhet}
        />);
    });

    it('Skal vise VisningSykmeldt, som initielt valg', () => {
        expect(komponent.find(VisningSykmeldt)).to.have.length(1);
    });

    it('Skal vise VisningLeder, dersom visning for leder er valgt', () => {
        const komponent = shallow(<PersonkortVisning
            visning={PERSONKORTVISNING_TYPE.LEDER}
            ledere={ledere}
            fastleger={fastleger}
            navbruker={navbruker}
            behandlendeEnhet={behandlendeEnhet}
        />);
        expect(komponent.find(VisningLeder)).to.have.length(1);
    });

    it('Skal vise VisningLege, dersom visning for lege er valgt', () => {
        const komponent = shallow(<PersonkortVisning
            visning={PERSONKORTVISNING_TYPE.LEGE}
            ledere={ledere}
            fastleger={fastleger}
            navbruker={navbruker}
            behandlendeEnhet={behandlendeEnhet}
        />);
        expect(komponent.find(VisningLege)).to.have.length(1);
    });

    it('Skal vise VisningEnhet, dersom visning for lege er valgt', () => {
        const komponent = shallow(<PersonkortVisning
            visning={PERSONKORTVISNING_TYPE.ENHET}
            ledere={ledere}
            fastleger={fastleger}
            navbruker={navbruker}
            behandlendeEnhet={behandlendeEnhet}
        />);
        expect(komponent.find(VisningEnhet)).to.have.length(1);
    });

    describe('VisningSykmeldt', () => {
        let komponent;

        beforeEach(() => {
            komponent = shallow(<VisningSykmeldt
                navbruker={navbruker}
            />);
        });

        it('Skal vise PersonkortVisningElement', () => {
            expect(komponent.find(PersonkortVisningElement)).to.have.length(1);
        });

        it('Skal vise PersonkortVisningInformasjon', () => {
            expect(komponent.find(PersonkortVisningInformasjon)).to.have.length(1);
        });
    });

    describe('VisningLeder', () => {
        let komponent;

        beforeEach(() => {
            komponent = shallow(<VisningLeder
                ledere={ledere}
            />);
        });

        it('Skal vise antall PersonkortVisningElement lik antall ledere', () => {
            expect(komponent.find(PersonkortVisningElement)).to.have.length(ledere.length);
        });

        it('Skal vise antall PersonkortVisningInformasjon for ledere som er oppgitt', () => {
            expect(komponent.find(PersonkortVisningInformasjon)).to.have.length(1);
        });

        it('Skal vise PersonkortVisningElement med feilmelding, dersom ledere ikke er innmeldt', () => {
            expect(komponent.find('p.personkort__feilmelding')).to.have.length(1);
        });
    });

    describe('VisningLege', () => {
        let komponent;

        beforeEach(() => {
            komponent = shallow(<VisningLege
                fastleger={fastleger}
                sykmeldtNavn={navbruker.navn}
            />);
        });

        it('Skal vise feilmelding, henting av fastleger feilet', () => {
            const komponent = shallow(<VisningLege
                fastleger={Object.assign({}, fastleger, {
                    hentingFeilet: true,
                })}
                sykmeldtNavn={navbruker.navn}
            />);
            expect(komponent.find('p.personkort__feilmelding')).to.have.length(1);
        });

        it('Skal vise PersonkortVisningElement', () => {
            expect(komponent.find(PersonkortVisningElement)).to.have.length(1);
        });

        it('Skal vise PersonkortVisningInformasjon', () => {
            expect(komponent.find(PersonkortVisningInformasjon)).to.have.length(1);
        });

        it('Skal vise VisningTidligereLeger', () => {
            expect(komponent.find(VisningTidligereLeger)).to.have.length(1);
        });
    });

    describe('VisningTidligereLeger', () => {
        let komponent;

        beforeEach(() => {
            komponent = shallow(<VisningTidligereLeger
                tidligereFastleger={fastleger.tidligere}
            />);
        });

        it('Skal vise en liste med antall element lik antall tidligere fastleger', () => {
            expect(komponent.find('li')).to.have.length(fastleger.tidligere.length);
        });
    });
});