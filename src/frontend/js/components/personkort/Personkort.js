import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, Utvidbar } from 'digisyfo-npm';
import PersonkortVisning from './PersonkortVisning';
import { PERSONKORTVISNING_TYPE } from '../../konstanter';
import {
    henterEllerHarHentetDiskresjonskode,
    henterEllerHarHentetEgenansatt,
    henterEllerHarHentetFastleger,
} from '../../utils/reducerUtils';
import PersonkortHeader from './PersonkortHeader';

class Personkort extends Component {
    constructor() {
        super();
        this.state = {
            visning: PERSONKORTVISNING_TYPE.SYKMELDT,
        };
        this.byttVisning = this.byttVisning.bind(this);
    }

    componentWillMount() {
        const { diskresjonskode, egenansatt, fastleger } = this.props;
        const brukerFnr = this.props.navbruker.kontaktinfo && this.props.navbruker.kontaktinfo.fnr;
        if (brukerFnr && !henterEllerHarHentetDiskresjonskode(diskresjonskode)) {
            this.props.actions.hentDiskresjonskode(brukerFnr);
        }
        if (brukerFnr && !henterEllerHarHentetEgenansatt(egenansatt)) {
            this.props.actions.hentEgenansatt(brukerFnr);
        }
        if (brukerFnr && !henterEllerHarHentetFastleger(fastleger)) {
            this.props.actions.hentFastleger(brukerFnr);
        }
    }

    byttVisning(visning) {
        this.setState({
            visning,
        });
    }

    render() {
        const {
            diskresjonskode,
            egenansatt,
            navbruker,
        } = this.props;
        const visning = this.state.visning;

        return (<div className="personkort">
            <Utvidbar
                erApen={false}
                tittel={<PersonkortHeader
                    diskresjonskode={diskresjonskode}
                    egenansatt={egenansatt}
                    navbruker={navbruker}
                />}
            >
                <div>
                    <ul>
                        <li>
                            <button
                                className={`${visning === PERSONKORTVISNING_TYPE.SYKMELDT && 'personkort__knapp--aktiv'}`}
                                aria-pressed={visning === PERSONKORTVISNING_TYPE.SYKMELDT}
                                onClick={() => { this.byttVisning(PERSONKORTVISNING_TYPE.SYKMELDT); }}>
                                {getLedetekst('modiafront.personkort.visning.sykmeldt.knapp')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${visning === PERSONKORTVISNING_TYPE.LEDER && 'personkort__knapp--aktiv'}`}
                                aria-pressed={visning === PERSONKORTVISNING_TYPE.LEDER}
                                onClick={() => { this.byttVisning(PERSONKORTVISNING_TYPE.LEDER); }}>
                                {getLedetekst('modiafront.personkort.visning.leder.knapp')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${visning === PERSONKORTVISNING_TYPE.LEGE && 'personkort__knapp--aktiv'}`}
                                aria-pressed={visning === PERSONKORTVISNING_TYPE.LEGE}
                                onClick={() => { this.byttVisning(PERSONKORTVISNING_TYPE.LEGE); }}>
                                {getLedetekst('modiafront.personkort.visning.fastlege.knapp')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${visning === PERSONKORTVISNING_TYPE.ENHET && 'personkort__knapp--aktiv'}`}
                                aria-pressed={visning === PERSONKORTVISNING_TYPE.ENHET}
                                onClick={() => { this.byttVisning(PERSONKORTVISNING_TYPE.ENHET); }}>
                                {getLedetekst('modiafront.personkort.visning.enhet.knapp')}
                            </button>
                        </li>
                    </ul>

                    <div aria-live="polite">
                        <PersonkortVisning
                            {...this.props}
                            visning={visning}
                        />
                    </div>
                </div>
            </Utvidbar>
        </div>);
    }
}
Personkort.propTypes = {
    ledetekster: PropTypes.object,
    actions: PropTypes.object,
    diskresjonskode: PropTypes.object,
    egenansatt: PropTypes.object,
    fastleger: PropTypes.object,
    navbruker: PropTypes.object,
    ledere: PropTypes.array,
    behandlendeEnhet: PropTypes.object,

};
export default Personkort;
