import { Injectable } from '@angular/core';
import { DocumentMozMsPrefixes } from '../entities/document-moz-ms-prefixes.interface';

declare var document: DocumentMozMsPrefixes;

function getDocument (): DocumentMozMsPrefixes {
    return document;
}

@Injectable()

export class DocumentMozMsPrefixesRefService {
    get nativeDocument (): DocumentMozMsPrefixes {
        return getDocument();
    }
}
