import { TestBed } from '@angular/core/testing';

import { FirebaseCharactersService } from './firebase-characters.service';

describe('FirebaseCharactersService', () => {
  let service: FirebaseCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
