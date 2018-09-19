import no.nav.sbl.dialogarena.common.jetty.Jetty;
import no.nav.testconfig.ApiAppTest;

import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.first;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.gotKeypress;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.waitFor;
import static no.nav.sbl.dialogarena.test.SystemProperties.setFrom;
import static no.nav.testconfig.ApiAppTest.setupTestContext;

public class MainTest {
    private static final String APPLIKASJONS_NAVN = "modiasyfofront";
    public static void main(String[] args) throws Exception {
        setupTestContext(ApiAppTest.Config.builder().applicationName(APPLIKASJONS_NAVN).build());
        setFrom("test.properties");
        Jetty jetty = usingWar()
                .at("sykefravaer")
                .port(8190)
                .disableAnnotationScanning()
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}