import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc, doc, getDoc } from '@firebase/firestore';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public readonly CHARACTER_COLLECTION: string = 'characters';
  public readonly BUILD_COLLECTION: string = 'builds';

  constructor(private firestore: Firestore) { 
  }

  /**
   * Gets all character data from the firestore
   * 
   * @returns 
   *        a querysnapshot of documents
   */
  public getAllCharacters() {
    return collectionData(collection(this.firestore, 'characters'));
  }

  /**
   * Saves a build to the firestore
   * 
   * @param save 
   *        Save data
   */
  public saveBuild(save: Save) {
    return addDoc(collection(this.firestore, 'builds'), save);
  }

  /**
   * Loads the specified build from the firestore
   * 
   * @param buidID 
   *        string: document id
   */
  public loadBuild(buidID: string) {
    return getDoc(doc(this.firestore, `${this.BUILD_COLLECTION}/${buidID}`));
  }
}
