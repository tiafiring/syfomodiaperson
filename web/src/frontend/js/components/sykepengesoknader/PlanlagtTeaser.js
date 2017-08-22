import React from 'react';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const PlanlagtTeaser = ({ soknad }) => {
    return (<article aria-labelledby={`soknader-header-${soknad.id}`}>
            <div className="inngangspanel js-panel" style={{ color: 'gray', backgroundImage: 'none', boxShadow: 'none' }}>
                <span className="inngangspanel__ikon">
                    <img className="js-ikon" src="/sykefravaer/img/svg/soknader.svg" />
                </span>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`soknad-header-${soknad.id}`}>
                        <div>
                            <small className="inngangspanel__meta js-meta">
                                {getLedetekst('soknad.teaser.dato.fremtidig', { '%DATO%': toDatePrettyPrint(soknad.tom) }) }
                            </small>
                        </div>
                        <span className="inngangspanel__tittel">
                                {getLedetekst('soknad.teaser.tittel')}
                        </span>
                    </h3>
                    <p className="inngangspanel__status js-status">
                        {getLedetekst(`soknad.teaser.status.${soknad.status}`)}
                    </p>
                </header>
                <p className="inngangspanel__tekst js-tekst">
                    {
                        getLedetekst('soknad.teaser.tekst', {
                            '%FRA%': toDatePrettyPrint(new Date(soknad.fom)),
                            '%TIL%': toDatePrettyPrint(new Date(soknad.tom)),
                        })
                    }
                </p>
                <p className="inngangspanel__undertekst js-undertekst mute">
                    {soknad.arbeidsgiver.navn}
                </p>
            </div>
        </div>
    </article>);
};

PlanlagtTeaser.propTypes = {
    soknad: sykepengesoknadPt.isRequired,
};

export default PlanlagtTeaser;
