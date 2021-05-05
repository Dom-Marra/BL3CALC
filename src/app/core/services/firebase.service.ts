import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public readonly CHARACTER_COLLECTION: string = 'characters';
  public readonly BUILD_COLLECTION: string = 'builds';

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

  /**
   * Saves a build to the firestore
   * 
   * @param save 
   *        Save data
   */
  public saveBuild(save: Save) {
    return this.firestore.collection(this.BUILD_COLLECTION).add(save);
  }

  /**
   * Loads the specified build from the firestore
   * 
   * @param buidID 
   *        string: document id
   */
  public loadBuild(buidID: string) {
    return this.firestore.collection(this.BUILD_COLLECTION).doc(buidID).get();
  }
}
