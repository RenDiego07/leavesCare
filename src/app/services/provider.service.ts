import { Firestore, collection, query, collectionData, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  firestoreService = inject(Firestore);

  constructor() {}

  createDocument(collectionName: string, data: any): Promise<any> {
    const colRef = collection(this.firestoreService, collectionName); // Crear referencia a la colección
    return addDoc(colRef, data);
  }

  readCollection(collectionName: string): Observable<any[]> {
    const colRef = collection(this.firestoreService, collectionName);
    return collectionData(colRef, { idField: 'id' });
  }

}