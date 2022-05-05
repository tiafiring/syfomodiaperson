import nock from "nock";
import { UNLEASH_ROOT } from "@/apiConstants";
import { unleashMock } from "../../mock/unleash/unleashMock";

export const stubFeatureTogglesApi = (scope: nock.Scope) =>
  scope
    .post((uri) => uri.includes(`${UNLEASH_ROOT}/toggles`))
    .reply(200, () => unleashMock);
