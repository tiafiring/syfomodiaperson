export function opprettMote(fnr, data) {
    return {
        type: 'OPPRETT_MOTE',
        data: Object.assign({}, data, { fnr }),
    };
}
