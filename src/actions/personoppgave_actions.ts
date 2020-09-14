import { PersonOppgave } from "../types/PersonOppgave";

export const HENT_PERSONOPPGAVER_FORESPURT = 'HENT_PERSONOPPGAVER_FORESPURT';
export const HENT_PERSONOPPGAVER_HENTER = 'HENT_PERSONOPPGAVER_HENTER';
export const HENT_PERSONOPPGAVER_HENTET = 'HENT_PERSONOPPGAVER_HENTET';
export const HENT_PERSONOPPGAVER_FEILET = 'HENT_PERSONOPPGAVER_FEILET';

export const hentPersonOppgaver = (fnr: string) => ({
    type: HENT_PERSONOPPGAVER_FORESPURT,
    fnr,
})

export const hentPersonOppgaverHenter = () => ({
    type: HENT_PERSONOPPGAVER_HENTER,
});

export const hentPersonOppgaverHentet = (data: PersonOppgave[]) => ({
    type: HENT_PERSONOPPGAVER_HENTET,
    data,
})

export const hentPersonOppgaverFeilet = () => ({
    type: HENT_PERSONOPPGAVER_FEILET,
})
