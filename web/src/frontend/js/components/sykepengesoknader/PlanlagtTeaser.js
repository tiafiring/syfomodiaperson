import React from 'react';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { tidligsteFom, senesteTom } from '../../utils/periodeUtils';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const PlanlagtTeaser = ({ soknad }) => {
    const perioder = soknad.aktiviteter.map(a => {
        return a.periode;
    });
    return (<article aria-labelledby={`soknader-header-${soknad.id}`}>
            <div className="inngangspanel js-panel" style={{ color: 'gray', backgroundImage: 'none', boxShadow: 'none' }}>
                <span className="inngangspanel__ikon">
                    <img className="js-ikon" src="/sykefravaer/img/svg/soknader.svg" />
                </span>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`soknad-header-${soknad.id}`}>
                        <small className="inngangspanel__meta js-meta">
                            {getLedetekst('soknad.teaser.dato', { '%DATO%': toDatePrettyPrint(soknad.opprettetDato) })}
                        </small>
                        <span className="inngangspanel__tittel">
                                {getLedetekst('soknad.teaser.tittel')}
                            </span>
                    </h3>
                </header>
                <p className="inngangspanel__tekst js-tekst">
                    {
                        getLedetekst('soknad.teaser.tekst', {
                            '%FRA%': toDatePrettyPrint(tidligsteFom(perioder)),
                            '%TIL%': toDatePrettyPrint(senesteTom(perioder)),
                        })
                    }
                </p>
                <p className="js-undertekst mute">{ soknad.arbeidsgiver.navn }</p>
            </div>
        </div>
    </article>);
};

PlanlagtTeaser.propTypes = {
    soknad: sykepengesoknadPt.isRequired,
};

export default PlanlagtTeaser;
