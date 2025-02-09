import { queryHookWrapper } from "./queryHookTestUtils";
import { renderHook } from "@testing-library/react-hooks";
import {
  useHistorikkMotebehovQuery,
  useHistorikkOppfolgingsplan,
} from "@/data/historikk/historikkQueryHooks";
import { QueryClient } from "react-query";
import { apiMock } from "../stubs/stubApi";
import nock from "nock";
import { expect } from "chai";
import { historikkmotebehovMock } from "../../mock/syfomotebehov/historikkmotebehovMock";
import { historikkoppfolgingsplanMock } from "../../mock/syfooppfolgingsplanservice/historikkoppfolgingsplanMock";
import { stubMotebehovHistorikkApi } from "../stubs/stubSyfomotebehov";
import { ARBEIDSTAKER_DEFAULT } from "../../mock/common/mockConstants";
import { stubOppfolgingsplanHistorikkApi } from "../stubs/stubSyfooppfolgingsplan";

let queryClient: any;
let apiMockScope: any;

describe("historikkQueryHooks", () => {
  beforeEach(() => {
    queryClient = new QueryClient();
    apiMockScope = apiMock();
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it("loads motebehov-historikk for valgt personident", async () => {
    stubMotebehovHistorikkApi(apiMockScope, ARBEIDSTAKER_DEFAULT.personIdent);
    const wrapper = queryHookWrapper(queryClient);

    const { result, waitFor } = renderHook(() => useHistorikkMotebehovQuery(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    const expectedHistorikkEvents = [...historikkmotebehovMock].map(
      (historikkEvent) => ({
        ...historikkEvent,
        kilde: "MOTEBEHOV",
      })
    );

    expect(result.current.data).to.deep.equal(expectedHistorikkEvents);
  });
  it("loads oppfolgingsplan-historikk for valgt personident", async () => {
    stubOppfolgingsplanHistorikkApi(
      apiMockScope,
      ARBEIDSTAKER_DEFAULT.personIdent
    );
    const wrapper = queryHookWrapper(queryClient);

    const { result, waitFor } = renderHook(
      () => useHistorikkOppfolgingsplan(),
      {
        wrapper,
      }
    );

    await waitFor(() => result.current.isSuccess);

    const expectedHistorikkEvents = [...historikkoppfolgingsplanMock].map(
      (historikkEvent) => ({
        ...historikkEvent,
        kilde: "OPPFOLGINGSPLAN",
      })
    );

    expect(result.current.data).to.deep.equal(expectedHistorikkEvents);
  });
});
