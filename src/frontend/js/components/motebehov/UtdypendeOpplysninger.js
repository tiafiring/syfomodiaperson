import React from 'react';
import PropTypes from 'prop-types';
import { erUtdypendeOpplysningerInformasjon } from '../../utils/sykmeldingUtils';

const tekster = {
    UtdypendeOpplysninger: {
        header: 'Utdypende opplysninger ved 8 uker',
        sykehistorieTittel: 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon',
        paavirkningArbeidsevneTittel: 'Hvordan påvirker sykdommen arbeidsevnen?',
        behandlingsResultatTittel: 'Har behandlingen frem til nå bedret arbeidsevnen?',
        henvisningTittel: 'Beskriv pågående og planlagt henvisning, utredning og/eller behandling',
    },
};

export const UtdypendeOpplysninger = (
    {
        sykmelding,
    }) => {
    const utdypendeOpplysninger = sykmelding.utdypendeOpplysninger;
    const skalVise = erUtdypendeOpplysningerInformasjon(sykmelding);
    return (
        skalVise && <div className="sykmeldingMotebehovVisning__avsnitt">
            <h5 className="undertittel">{tekster.UtdypendeOpplysninger.header}</h5>

            {
                utdypendeOpplysninger.sykehistorie && <div>
                    <h6 className="sporsmaal">{tekster.UtdypendeOpplysninger.sykehistorieTittel}</h6>
                    <p>{utdypendeOpplysninger.sykehistorie}</p>
                </div>
            }

            {
                utdypendeOpplysninger.paavirkningArbeidsevne && <div>
                    <h6 className="sporsmaal">{tekster.UtdypendeOpplysninger.paavirkningArbeidsevneTittel}</h6>
                    <p>{utdypendeOpplysninger.paavirkningArbeidsevne}</p>
                </div>
            }

            {
                utdypendeOpplysninger.resultatAvBehandling && <div>
                    <h6 className="sporsmaal">{tekster.UtdypendeOpplysninger.behandlingsResultatTittel}</h6>
                    <p>{utdypendeOpplysninger.resultatAvBehandling}</p>
                </div>
            }

            {
                utdypendeOpplysninger.henvisningUtredningBehandling && <div>
                    <h6 className="sporsmaal">{tekster.UtdypendeOpplysninger.henvisningTittel}</h6>
                    <p>{utdypendeOpplysninger.henvisningUtredningBehandling}</p>
                </div>
            }
        </div>);
};

UtdypendeOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
};

export default UtdypendeOpplysninger;
