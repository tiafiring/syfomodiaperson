import * as React from 'react';
import {
    SyntheticEvent,
    useEffect,
    useState,
} from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import {
    Checkbox,
    CheckboxGruppe,
} from 'nav-frontend-skjema';
import styled from 'styled-components';
import { Arbeidsgiver } from './Pengestopp';
import {
    StatusEndring,
    StoppAutomatikk,
    VirksomhetNr,
} from '../../types/FlaggPerson';
import { store } from '../../index';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { endreStatus } from '../../actions/flaggperson_actions';
import { connect } from 'react-redux';

const texts = {
    tittel: 'Stans automatisk behanding av sykepenger',
    arbeidsgiver: 'Velg arbeidsgiver',
    årsak: 'Årsak til at sykepenger stanses',
    stansSykepenger: 'Stans sykepenger',
    avbryt: 'Avbryt',
    gosys: 'Lag oppgave i GoSys',
    submitError: 'Du må velge minst én arbeidsgiver',
};

interface IPengestoppModal {
    brukernavn: String,
    isOpen: boolean,
    arbeidsgivere: Array<Arbeidsgiver>,
    statusEndringer: Array<StatusEndring>,
    enhet: any,
    veilederinfo: any,

    flagg(stoppAutomatikk: StoppAutomatikk): void
    toggle(): void
}

const Wrapper = styled.div`
    padding: 2rem 2.5rem;
`;

const Group = styled.div`
    margin: 1rem 0;
`;

const PengestoppModal = ({ brukernavn, isOpen, arbeidsgivere, toggle, flagg, enhet, veilederinfo }: IPengestoppModal) => {
    const [stopped, setStopped] = useState(false);
    const [selected, setSelected] = useState<VirksomhetNr[]>([]);
    const [submitError, setSubmitError] = useState(false);

    const fnr = window.location.pathname.split('/')[2];
    const [stoppAutomatikk, setStoppAutomatikk] = useState<StoppAutomatikk>({
        sykmeldtFnr: { value: fnr },
        veilederIdent: { value: veilederinfo.data.ident },
        enhetNr: { value: enhet.valgtEnhet },
        virksomhetNr: [],
    });

    useEffect(() => {
        setStoppAutomatikk({ ...stoppAutomatikk, virksomhetNr: selected });
    }, [selected]);

    const handleStoppAutomatikkButtonPress = () => {
        if (stoppAutomatikk.virksomhetNr.length <= 0) {
            setSubmitError(true);
        } else {
            flagg(stoppAutomatikk);
            setStopped(true);
        }
    }

    const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const orgnr: VirksomhetNr = { value: (event.target as HTMLInputElement).name };
        const { checked } = (event.target as HTMLInputElement);

        if (checked) {
            setSubmitError(false);
            setSelected([
                ...selected,
                orgnr,
            ]);
        } else {
            const filtered = selected.filter((virksomhetNr: VirksomhetNr) => {
                return virksomhetNr.value !== orgnr.value;
            });
            setSelected(filtered);
        }
    };

    const handleCloseModal = () => {
        setSelected([]);
        toggle();
    }

    return (
        <ModalWrapper
            // @ts-ignore
            ariaHideApp={false}
            contentLabel={texts.stansSykepenger}
            isOpen={isOpen}
            closeButton={true}
            onRequestClose={handleCloseModal}
        >
            <Wrapper>
                <Systemtittel>{texts.tittel}</Systemtittel>

                {!stopped
                    ? <>
                        <Group>
                            <CheckboxGruppe legend={texts.arbeidsgiver} feil={submitError && texts.submitError}>
                                {
                                    arbeidsgivere.map((arbeidsgiver: Arbeidsgiver, index: number) => {
                                        return (<Checkbox
                                            key={index}
                                            label={arbeidsgiver.navn}
                                            onChange={handleChange}
                                            name={arbeidsgiver.orgnummer}
                                        />);
                                    })
                                }
                            </CheckboxGruppe>
                        </Group>
                        <Knapp type="flat" onClick={handleCloseModal}>{texts.avbryt}</Knapp>
                        <Knapp type="fare" onClick={handleStoppAutomatikkButtonPress}>{texts.stansSykepenger}</Knapp>
                    </>
                    : <>
                        <Group>
                            <AlertStripeInfo>{`Sykepengene til ${brukernavn} er stanset. Du kan lage en oppgave i Gosys nå for stans av sykepenger. Det er også mulig å gjøre dette senere`}</AlertStripeInfo>
                        </Group>
                        <Knapp type="flat" onClick={toggle}>{texts.avbryt}</Knapp>
                    </>
                }
            </Wrapper>
        </ModalWrapper>

    );
};

const mapDispatchToProps = (dispatch: typeof store.dispatch) => {
    return {
        flagg: (stoppAutomatikk: StoppAutomatikk) => {
            dispatch(endreStatus(stoppAutomatikk));
        },
    };
};

const mapStateToProps = (state: { enhet: { data: any }, veilederinfo: { data: any } }) => {
    const { enhet, veilederinfo } = state;
    return { enhet, veilederinfo };
};

export default connect(mapStateToProps, mapDispatchToProps)(PengestoppModal);


