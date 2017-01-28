export function apiUrl(url, urlParameters?) {
  let urlGlobal = '/';

  if (!urlParameters) {
    return `${urlGlobal}${url}`;
  } else {
    return `${urlGlobal}${url}${urlParameters}`;
  }
}
