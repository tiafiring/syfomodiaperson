package no.nav.sbl.modiasyfofront;

import no.nav.modig.core.context.StaticSubjectHandler;
import no.nav.sbl.dialogarena.common.jetty.Jetty;
import org.apache.geronimo.components.jaspi.AuthConfigFactoryImpl;
import org.eclipse.jetty.jaas.JAASLoginService;

import static java.lang.System.setProperty;
import static no.nav.modig.core.context.SubjectHandler.SUBJECTHANDLER_KEY;
import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
import static no.nav.modig.lang.collections.RunnableUtils.first;
import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import no.nav.modig.security.loginmodule.DummyRole;

import javax.security.auth.message.config.AuthConfigFactory;
import java.security.Security;

public class StartJetty {
    private static final int PORT = 8190;

    public static void main(String[] args) throws Exception {
        setProperty(SUBJECTHANDLER_KEY, StaticSubjectHandler.class.getName());
        setProperty("org.apache.geronimo.jaspic.configurationFile", "src/test/resources/jaspiconf.xml");
        Security.setProperty(AuthConfigFactory.DEFAULT_FACTORY_SECURITY_PROPERTY, AuthConfigFactoryImpl.class.getCanonicalName());


        Jetty jetty = usingWar()
                .at("/sykefravaer")
                .overrideWebXml()
                .loadProperties("/test.properties")
                .configureForJaspic()
                .port(PORT)
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

}
