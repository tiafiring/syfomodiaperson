package no.nav.sbl.modiasyfofront;

import no.nav.innholdshenter.common.EnonicContentRetriever;
import no.nav.innholdshenter.filter.DecoratorFilter;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class SyfofrontDekorator extends DecoratorFilter {
    private static final String FRAGMENTS_URL = "/internarbeidsflatedecorator/headerv1.html";
    private static final String APPLICATION_NAME = "syfofront";
    private static final List<String> NO_DECORATOR_PATTERNS = new ArrayList<>(asList(".*/img/.*", ".*/css/.*", ".*/js/.*", ".*/font/.*", ".*selftest.*"));
    private static final List<String> FRAGMENT_NAMES= new ArrayList<>(asList("header-withmenu", "footer-withmenu", "styles"));

    public SyfofrontDekorator() {
        super();
        setFragmentsUrl(FRAGMENTS_URL);
        setContentRetriever(setUpContentRetriever());
        setApplicationName(APPLICATION_NAME);
        setNoDecoratePatterns(NO_DECORATOR_PATTERNS);
        setFragmentNames(FRAGMENT_NAMES);
    }

    private EnonicContentRetriever setUpContentRetriever() {
        EnonicContentRetriever contentRetriever = new EnonicContentRetriever(APPLICATION_NAME);
        contentRetriever.setBaseUrl("http://localhost:8186");
//        contentRetriever.setBaseUrl("https://d26jbsl00923.test.local:8443");
        contentRetriever.setRefreshIntervalSeconds(1800);
        contentRetriever.setHttpTimeoutMillis(10000);
        return contentRetriever;
    }
}
