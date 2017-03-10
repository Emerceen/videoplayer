import { DocumentMozMsPrefixesRefService } from './document.service';

describe('Service: DocumentService', () => {
  let service = new DocumentMozMsPrefixesRefService();

  describe('nativeDocument()', () => {
    it('should return document', () => {
      expect(service.nativeDocument).toBe(document);
    });
  });
});
