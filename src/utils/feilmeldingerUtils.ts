export const harFeilmeldinger = (errors: {
  [key: string]: string | undefined;
}): boolean =>
  Object.values(errors).filter((value) => value !== undefined).length > 0;
