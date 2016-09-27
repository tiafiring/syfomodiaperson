package no.nav.sbl.modiasyfofront;

import no.nav.modig.core.context.ThreadLocalSubjectHandler;
import no.nav.sbl.dialogarena.common.jetty.Jetty;

import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
import static no.nav.modig.lang.collections.RunnableUtils.first;
import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;

public class StartJetty {
    private static final int PORT = 8190;

    public static void main(String[] args) throws Exception {
        System.setProperty("no.nav.modig.core.context.subjectHandlerImplementationClass", ThreadLocalSubjectHandler.class.getName());
        System.setProperty("no.nav.modig.security.sts.url", "https://e34jbsl01634.devillo.no:8443/SecurityTokenServiceProvider");
        System.setProperty("no.nav.modig.security.systemuser.username", "BD03");
        System.setProperty("no.nav.modig.security.systemuser.password", "CHANGEME");
        Jetty jetty = usingWar()
                .at("/sykefravaer")
                .overrideWebXml()
                .loadProperties("/test.properties")
                .port(PORT)
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

}
