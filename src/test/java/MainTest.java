import no.nav.sbl.dialogarena.common.jetty.Jetty;

import static java.lang.System.getProperty;
import static java.lang.System.setProperty;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.first;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.gotKeypress;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.waitFor;
import static no.nav.sbl.dialogarena.test.SystemProperties.setFrom;
import static no.nav.testconfig.ApiAppTest.setupTestContext;

public class MainTest {
    public static void main(String[] args) throws Exception {
        setupTestContext();
        setFrom("test.properties");
        Jetty jetty = usingWar()
                .at("sykefravaer")
                .port(8190)
                .overrideWebXml()
                .disableAnnotationScanning()
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}
