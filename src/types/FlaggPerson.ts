export interface SykmeldtFnr {
    value: string
}

export interface VirksomhetNr {
    value: string
}

export interface VeilederIdent {
    value: string
}

export interface EnhetNr {
    value: string
}

export interface StoppAutomatikk {
    sykmeldtFnr: SykmeldtFnr,
    virksomhetNr: Array<VirksomhetNr>,
    veilederIdent: VeilederIdent,
    enhetNr: EnhetNr
}

export enum Status { NORMAL = 'NORMAL', STOPP_AUTOMATIKK = 'STOPP_AUTOMATIKK' }

export interface StatusEndring {
    veilederIdent: VeilederIdent,
    sykmeldtFnr: SykmeldtFnr,
    status: Status,
    virksomhetNr: VirksomhetNr,
    opprettet: Date,
    enhetNr: EnhetNr
}

export const initialStatus: StatusEndring = {
    sykmeldtFnr: { value: ''},
    status: Status.NORMAL,
    virksomhetNr: { value: ''},
    opprettet: new Date(),
    enhetNr: { value: ''},
    veilederIdent: { value: ''},
}
