export function apiUrl(url: string, urlParameters?: string): string {
  let urlGlobal = '/';

  if (!urlParameters) {
    return `${urlGlobal}${url}`;
  } else {
    return `${urlGlobal}${url}${urlParameters}`;
  }
}
