import { Injectable } from '@nestjs/common';
import * as firebaseAccount from './firebaseAccount.json';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  firebaseApp: firebaseAdmin.app.App;

  constructor() {
    this.firebaseApp = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseAccount as firebaseAdmin.ServiceAccount),
      databaseURL: "https://titaniumexpress-98dab-default-rtdb.firebaseio.com"
    });
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      this.firebaseApp.auth().verifyIdToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
