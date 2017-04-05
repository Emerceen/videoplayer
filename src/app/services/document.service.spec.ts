import { DocumentMozMsPrefixesRefService } from './document.service';
import { DocumentMozMsPrefixes } from '../entities/document-moz-ms-prefixes.interface';

describe('Service: DocumentService', () => {
  let service = new DocumentMozMsPrefixesRefService();

  describe('nativeDocument()', () => {
    it('should return document', () => {
      expect(service.nativeDocument).toBe(document as DocumentMozMsPrefixes);
    });
  });
});
