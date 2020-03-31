import React from 'react';
import {
    DineKoronaSykmeldingOpplysninger,
    sykmelding as sykmeldingPt,
} from '@navikt/digisyfo-npm';
import {
    Undertittel,
    Normaltekst,
} from 'nav-frontend-typografi';

const texts = {
    pageSubtitle: 'for selvstendig næringsdrivende og frilansere',
    infotext1: 'Her sjekker du at opplysningene fra da du opprettet egenmeldingen stemmer. Om alt stemmer kan du bekrefte og sende inn egenmeldingen.',
    infoText2: 'Vennligst se nøye over og påse at opplysningene du har oppgitt er riktige.',
};

const KoronaSykmeldingNy = ({ sykmelding }) => {
    return (
        <div>
            <Undertittel style={{ marginBottom: '2.5rem', textAlign: 'center' }}>{texts.pageSubtitle}</Undertittel>
            <Normaltekst style={{ marginBottom: '1rem' }}>{texts.infotext1}</Normaltekst>
            <Normaltekst style={{ marginBottom: '2rem' }}>{texts.infoText2}</Normaltekst>
            <article>
                <header className="panelHeader panelHeader--lysebla">
                    <img
                        className="panelHeader__ikon"
                        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/person.svg`}
                        alt="Du"
                    />
                    <h2 className="panelHeader__tittel">
                        {sykmelding.pasient.fornavn}
                        {' '}
                        {sykmelding.pasient.mellomnavn}
                        {' '}
                        {sykmelding.pasient.etternavn}
                    </h2>
                </header>
                <div className="panel blokk">
                    <DineKoronaSykmeldingOpplysninger sykmelding={sykmelding} />
                </div>
            </article>
        </div>
    );
};

KoronaSykmeldingNy.propTypes = {
    sykmelding: sykmeldingPt,
};

export default KoronaSykmeldingNy;
