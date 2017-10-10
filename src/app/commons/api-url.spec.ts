import { apiUrl } from './api-url';

let url = 'test-url/example';
let parameters = 'parameter1';
let globalUrl = '/';

describe('ApiUrl', () => {
  describe('should return url', () => {

    it('without parameters, when parameters are not passed', () => {
      expect(apiUrl(url)).toBe(`${globalUrl}${url}`);
    });

    it('witho parameters, when parameters are passed', () => {
      expect(apiUrl(url, parameters)).toBe(`${globalUrl}${url}${parameters}`);
    });
  });
});
