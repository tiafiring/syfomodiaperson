import { QueryClient } from "react-query";
import nock from "nock";
import { expect } from "chai";
import { renderHook } from "@testing-library/react-hooks";
import { apiMock } from "../../stubs/stubApi";
import { queryHookWrapper } from "../queryHookTestUtils";
import { unleashMock } from "../../../mock/unleash/unleashMock";
import { stubFeatureTogglesApi } from "../../stubs/stubUnleash";
import { stubVeilederinfoApi } from "../../stubs/stubSyfoveileder";
import { useFeatureToggles } from "@/data/unleash/unleashQueryHooks";

let queryClient: any;
let apiMockScope: any;

describe("unleashQuery tests", () => {
  beforeEach(() => {
    queryClient = new QueryClient();
    apiMockScope = apiMock();
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it("loads unleash toggles", async () => {
    stubVeilederinfoApi(apiMockScope);
    stubFeatureTogglesApi(apiMockScope);

    const wrapper = queryHookWrapper(queryClient);

    const { result, waitFor } = renderHook(() => useFeatureToggles(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).to.deep.equal(unleashMock);
  });
});
