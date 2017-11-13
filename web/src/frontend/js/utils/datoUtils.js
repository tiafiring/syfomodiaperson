export const restdatoTildato = (restdato) => {
    const dato = restdato.split('T')[0];
    return dato.split('-').reverse().join('.');
};
