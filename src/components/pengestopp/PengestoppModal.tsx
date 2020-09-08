import * as React from 'react';
import {
    SyntheticEvent,
    useEffect,
    useState,
} from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';
import {
    Systemtittel,
    Feilmelding,
} from 'nav-frontend-typografi';
import {
    Checkbox,
    CheckboxGruppe,
} from 'nav-frontend-skjema';
import styled from 'styled-components';
import {
    Arbeidsgiver,
    StatusEndring,
    StoppAutomatikk,
    VirksomhetNr,
} from '../../types/FlaggPerson';
import { store } from '../../index';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { endreStatus } from '../../actions/flaggperson_actions';
import { connect } from 'react-redux';
import { FlaggpersonState } from '../../reducers/flaggperson';

const texts = {
    tittel: 'Stans automatisk behanding av sykepenger',
    arbeidsgiver: 'Velg arbeidsgiver',
    stansSykepenger: 'Stans sykepenger',
    avbryt: 'Avbryt',
    submitError: 'Du må velge minst én arbeidsgiver',
    serverError: 'Det er ikke mulig å stoppe automatisk utbetaling av sykepenger akkurat nå. Prøv igjen senere.'
};

interface IPengestoppModal {
    brukernavn: String,
    isOpen: boolean,
    arbeidsgivere: Arbeidsgiver[],
    statusEndringer: StatusEndring[],
    enhet: any,
    endringFeilet: boolean,
    endret: boolean,

    flagg(stoppAutomatikk: StoppAutomatikk): Response
    toggle(): void
}

const Modal = styled(ModalWrapper)`
    padding: 2em 2.5em;
    max-width: 50em;
    width: 100%;
`;

const Group = styled.div`
    margin: 1rem 0;
`;

const BottomGroup = styled.div`
    margin-top: 1em;
`;

const PengestoppModal = ({ brukernavn, isOpen, arbeidsgivere, toggle, flagg, enhet, endringFeilet, endret }: IPengestoppModal) => {
    const [stopped, setStopped] = useState(false);
    const [selected, setSelected] = useState<VirksomhetNr[]>([]);
    const [submitError, setSubmitError] = useState<boolean>(false);
    const [serverError, setServerError] = useState<boolean>(false);

    const fnr = window.location.pathname.split('/')[2];
    const [stoppAutomatikk, setStoppAutomatikk] = useState<StoppAutomatikk>({
        sykmeldtFnr: { value: fnr },
        virksomhetNr: [],
        enhetNr: { value: enhet.valgtEnhet },
    });

    useEffect(() => {
        setStoppAutomatikk({ ...stoppAutomatikk, virksomhetNr: selected });
    }, [selected]);

    const handleStoppAutomatikkButtonPress = () => {
        if (stoppAutomatikk.virksomhetNr.length <= 0) {
            setSubmitError(true);
        } else {
            flagg(stoppAutomatikk);

            if (!endringFeilet && endret) {
                setStopped(true);
            } else {
                setServerError(true)
            }
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
        <Modal
            // @ts-ignore
            ariaHideApp={false}
            contentLabel={texts.stansSykepenger}
            isOpen={isOpen}
            closeButton={true}
            onRequestClose={handleCloseModal}
        >
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
            {serverError && <BottomGroup><Feilmelding>{texts.serverError}</Feilmelding></BottomGroup>}
        </Modal>

    );
};

const mapDispatchToProps = (dispatch: typeof store.dispatch) => {
    return {
        flagg: (stoppAutomatikk: StoppAutomatikk) => {
            dispatch(endreStatus(stoppAutomatikk));
        },
    };
};

interface IMapStateToProps {
    flaggperson: FlaggpersonState,
    enhet: { data: any },
}

const mapStateToProps = (state: IMapStateToProps) => {
    const { enhet, flaggperson } = state;
    return { enhet, endret: flaggperson.endret, endringFeilet: flaggperson.endringFeilet };
};

export default connect(mapStateToProps, mapDispatchToProps)(PengestoppModal);


