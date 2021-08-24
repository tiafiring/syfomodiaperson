import axios from "axios";
import { hentLoginUrl, hentRedirectBaseUrl } from "@/utils/miljoUtil";
import {
  accessDeniedError,
  ApiErrorException,
  generalError,
  loginRequiredError,
  networkError,
} from "@/api/errors";

export const NAV_CONSUMER_ID_HEADER = "nav-consumer-id";
export const NAV_CONSUMER_ID = "syfomodiaperson";
export const NAV_PERSONIDENT_HEADER = "nav-personident";

export const defaultRequestHeaders = (personIdent?: string): HeadersInit => {
  const headers = {
    "Content-Type": "application/json",
    [NAV_CONSUMER_ID_HEADER]: NAV_CONSUMER_ID,
  };

  if (personIdent) {
    headers[NAV_PERSONIDENT_HEADER] = personIdent;
  }
  return headers;
};

function handleError(error) {
  if (error.response) {
    switch (error.response.status) {
      case 401: {
        window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl()}`;
        throw new ApiErrorException(
          loginRequiredError(error.message),
          error.response.status
        );
      }
      case 403: {
        const message =
          error.response.data.begrunnelse || error.response.data.message;
        throw new ApiErrorException(
          accessDeniedError(message),
          error.response.status
        );
      }
      default:
        throw new ApiErrorException(
          generalError(error.message),
          error.response.status
        );
    }
  } else if (error.request) {
    throw new ApiErrorException(networkError(error.message));
  } else {
    throw new ApiErrorException(generalError(error.message));
  }
}

export const get = <ResponseData>(
  url: string,
  personIdent?: string
): Promise<ResponseData> => {
  return axios
    .get(url, {
      headers: defaultRequestHeaders(personIdent),
    })
    .then((response) => response.data)
    .catch(function (error) {
      handleError(error);
    });
};

export const post = <ResponseData>(
  url: string,
  data: Record<string, any>,
  personIdent?: string
): Promise<ResponseData> => {
  return axios
    .post(url, data, {
      headers: defaultRequestHeaders(personIdent),
    })
    .then((response) => response.data)
    .catch(function (error) {
      handleError(error);
    });
};
