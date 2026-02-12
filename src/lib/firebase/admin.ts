/**
 * Firebase Admin SDK 初始化
 * 僅用於 Server 端（API Route / Server Components）
 */

import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

let adminApp: App;

if (!getApps().length) {
	adminApp = initializeApp({
		credential: cert({
			projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
			clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		}),
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	});
} else {
	adminApp = getApps()[0];
}

/** Firebase Admin Auth */
export const adminAuth: Auth = getAuth(adminApp);

/** Firebase Admin Firestore */
export const adminDb: Firestore = getFirestore(adminApp);

/** Firebase Admin Storage */
export const adminStorage = getStorage(adminApp);

export default adminApp;
