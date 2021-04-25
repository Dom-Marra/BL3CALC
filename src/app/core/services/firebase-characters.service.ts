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

  public getAllCharacters() {
    return this.firestore.collection('characters').get();
  }

  public addCharacter(characterData: CharacterModel, name: string) {
    this.firestore.collection(this.CHARACTER_COLLECTION).doc(name).set(characterData);
  }
}
