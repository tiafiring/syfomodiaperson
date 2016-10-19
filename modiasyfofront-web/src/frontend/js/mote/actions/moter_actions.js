export function opprettMote(fnr, data) {
    return {
        type: 'OPPRETT_MOTE_FORESPURT',
        fnr,
        data,
    };
}
