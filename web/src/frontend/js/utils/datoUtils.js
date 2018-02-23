export const ANTALL_MS_DAG = 1000 * 60 * 60 * 24;

export const restdatoTildato = (restdato) => {
    const dato = restdato.split('T')[0];
    return dato.split('-').reverse().join('.');
};
