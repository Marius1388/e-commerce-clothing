import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyAADG2XYBYNLobnYAm6sgy_q96vD2hBhzs',
	authDomain: 'e-commerce-clothing-db-d8db5.firebaseapp.com',
	databaseURL: 'https://e-commerce-clothing-db-d8db5.firebaseio.com',
	projectId: 'e-commerce-clothing-db-d8db5',
	storageBucket: 'e-commerce-clothing-db-d8db5.appspot.com',
	messagingSenderId: '970398452418',
	appId: '1:970398452418:web:56fa08fc49561a0d02c95b',
	measurementId: 'G-DFT6PD56B3',
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;
};

export const addColletionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});
	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedColletion = collections.docs.map((doc) => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		};
	});
	return transformedColletion.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
