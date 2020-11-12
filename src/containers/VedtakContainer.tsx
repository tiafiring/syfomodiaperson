import * as React from 'react';
import { useEffect, useState } from 'react';
import Side from '../sider/Side';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { useDispatch, useSelector } from 'react-redux';
import { hentVedtak } from '../actions/vedtak_actions';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { VedtakDTO } from '../reducers/vedtak';
import { restdatoTildato } from '../utils/datoUtils';
import VedtakInfopanel from '../components/vedtak/VedtakInfopanel';


const VedtakContainer = () => {
    const fnr = window.location.pathname.split('/')[2];

    const vedtak = useSelector((state: any) => state.vedtak);
    const [selectedVedtak, setSelectedVedtak] = useState<VedtakDTO>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentVedtak(fnr));

    });

    useEffect(() => {
        if (vedtak && vedtak.hentet) {
            setSelectedVedtak(() => vedtak.data[0]);
        }
    }, [vedtak]);

    return (
        <Side>
            {vedtak && selectedVedtak && <Row>
                <Column className="col-xs-5">
                    {vedtak.data.map((v: VedtakDTO) => (
                        <Panel>
                            <Undertittel>
                                {restdatoTildato(v.vedtak.fom)} - {restdatoTildato(v.vedtak.tom)}
                            </Undertittel>
                            <Undertekst>
                                {`Vedtaksdato: ${restdatoTildato(v.opprettet)} · Restdager: ${v.vedtak.gjenståendeSykedager}`}
                            </Undertekst>
                        </Panel>
                    ))}
                </Column>
                <Column className="col-xs-7">
                    <VedtakInfopanel selectedVedtak={selectedVedtak}/>
                </Column>
            </Row>}
        </Side>);
};

export default VedtakContainer;
