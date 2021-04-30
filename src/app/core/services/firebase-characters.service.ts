import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CharacterModel } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCharactersService {

  public readonly CHARACTER_COLLECTION: string = 'characters';

  constructor(private firestore: AngularFirestore) { 
  }

  /**
   * Gets all character data from the firestore
   * 
   * @returns 
   *        a querysnapshot of documents
   */
  public getAllCharacters() {
    return this.firestore.collection('characters').get();
  }
}
