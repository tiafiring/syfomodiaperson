package no.nav.sbl.modiasyfofront;

import no.nav.sbl.dialogarena.common.jetty.Jetty;

import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
import static no.nav.modig.lang.collections.RunnableUtils.first;
import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;

public class StartJetty {
    private static final int PORT = 8190;

    public static void main(String[] args) throws Exception {
        Jetty jetty = usingWar()
                .at("/sykefravaer")
                .overrideWebXml()
                .loadProperties("/test.properties")
                .port(PORT)
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

}
