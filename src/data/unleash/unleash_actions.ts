export enum UnleashActionTypes {
  FETCH_UNLEASH_TOGGLES = "FETCH_UNLEASH_TOGGLES",
  FETCH_UNLEASH_TOGGLES_FAILED = "FETCH_UNLEASH_TOGGLES_FAILED",
  FETCH_UNLEASH_TOGGLES_SUCCESS = "FETCH_UNLEASH_TOGGLES_SUCCESS",
}

export interface FetchUnleashTogglesAction {
  type: UnleashActionTypes.FETCH_UNLEASH_TOGGLES;
  valgtEnhet: string;
  userId: string;
}

export interface FetchUnleashTogglesFailedAction {
  type: UnleashActionTypes.FETCH_UNLEASH_TOGGLES_FAILED;
}

export interface FetchUnleashTogglesSuccessAction {
  type: UnleashActionTypes.FETCH_UNLEASH_TOGGLES_SUCCESS;
  isDm2Enabled: boolean;
}

export const fetchUnleashToggles = (
  valgtEnhet: string,
  userId: string
): FetchUnleashTogglesAction => ({
  type: UnleashActionTypes.FETCH_UNLEASH_TOGGLES,
  valgtEnhet,
  userId,
});

export const fetchUnleashTogglesFailed = (): FetchUnleashTogglesFailedAction => ({
  type: UnleashActionTypes.FETCH_UNLEASH_TOGGLES_FAILED,
});

export const fetchUnleashTogglesSuccess = (
  isDm2Enabled: boolean
): FetchUnleashTogglesSuccessAction => ({
  type: UnleashActionTypes.FETCH_UNLEASH_TOGGLES_SUCCESS,
  isDm2Enabled,
});

export type UnleashActions =
  | FetchUnleashTogglesAction
  | FetchUnleashTogglesFailedAction
  | FetchUnleashTogglesSuccessAction;
