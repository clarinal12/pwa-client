import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { useState, useEffect, useCallback } from 'react';

const config = {
  apiKey: 'AIzaSyBMmqOYHD7hqcNLp096t2AM_2y4g5bm5xQ',
  authDomain: 'inventory-accounting-2a123.firebaseapp.com',
  projectId: 'inventory-accounting-2a123',
  storageBucket: 'inventory-accounting-2a123.appspot.com',
  messagingSenderId: '279551276747',
  appId: '1:279551276747:web:2eda1e4d323de2d20ecd4e',
  measurementId: 'G-PRJY1KER1P',
};

const fire = firebase.initializeApp(config) as any;
const fireStore = firebase.firestore();
const fireStorage = firebase.storage();

type FireStoreAddProps = {
  collection: string;
  input?: {
    [key: string]: any;
  };
  onCompleted?: (data: any) => void;
  onError?: (error: any) => void;
};

type FireStoreUpdateProps = {
  collection: string;
  id?: string;
  input?: {
    [key: string]: any;
  };
  onCompleted?: (data: any) => void;
  onError?: (error: any) => void;
};

type FireStoreAddReturn = [
  (values?: { [key: string]: any }) => void,
  { loading: boolean; error: any }
];

type FireStoreUpdateReturn = [
  (id?: string, values?: { [key: string]: any }) => void,
  { loading: boolean; error: any }
];

type FireStoreUploadProps = {
  path?: string;
  file?: File;
  onCompleted?: (data: any) => void;
  onError?: (error: any) => void;
};

type FireStoreUploadReturn = [
  (values: { file: File; path: string }) => void,
  { loading: boolean; error: any }
];

export type Filter = [
  string | firebase.firestore.FieldPath,
  firebase.firestore.WhereFilterOp,
  any
];
export interface FireStoreQueryProps {
  collection: string;
  onCompleted?: (data: any) => void;
  onError?: (error: any) => void;
  filter?: Filter;
}

export const useFireStoreAdd = ({
  collection,
  input,
  onCompleted,
  onError,
}: FireStoreAddProps): FireStoreAddReturn => {
  const [state, setState] = useState({
    loading: false,
    error: undefined,
  });

  const { loading, error } = state;

  const mutate = (values?: { [key: string]: any }) => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    fireStore
      .collection(collection)
      .add({
        ...(input || values),
        created: firebase.firestore.FieldValue.serverTimestamp(),
        updated: null,
      })
      .then((docRef: any) => {
        setState({
          loading: false,
          error: false,
        });
        if (onCompleted) {
          onCompleted(docRef);
        }
      })
      .catch((error: any) => {
        setState({
          loading: false,
          error: error,
        });
        if (onError) {
          onError(error);
        }
      });
  };

  return [mutate, { loading, error }];
};

export const useFireStoreUpdate = ({
  collection,
  id,
  input,
  onCompleted,
  onError,
}: FireStoreUpdateProps): FireStoreUpdateReturn => {
  const [state, setState] = useState({
    loading: false,
    error: undefined,
  });

  const { loading, error } = state;

  const mutate = (newId?: string, values?: { [key: string]: any }) => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    fireStore
      .collection(collection)
      .doc(id || newId)
      .update({
        ...(input || values),
        updated: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef: any) => {
        setState({
          loading: false,
          error: false,
        });
        if (onCompleted) {
          onCompleted(docRef);
        }
      })
      .catch((error: any) => {
        setState({
          loading: false,
          error: error,
        });
        if (onError) {
          onError(error);
        }
      });
  };

  return [mutate, { loading, error }];
};

export const useFireStoreQuery = ({
  collection,
  onCompleted,
  onError,
  filter,
}: FireStoreQueryProps) => {
  const [state, setState] = useState({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const { loading, data, error } = state;

  const fetch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    const collectionRef = fireStore.collection(collection);

    const query = filter
      ? collectionRef.where(filter[0], filter[1], filter[2]).get()
      : collectionRef.get();

    query
      .then((docRef: any) => {
        setState({
          loading: false,
          error: false,
          data: docRef,
        });
        if (onCompleted) {
          onCompleted(docRef);
        }
      })
      .catch((error: any) => {
        setState({
          loading: false,
          error: error,
          data: undefined,
        });
        if (onError) {
          onError(error);
        }
      });
    // eslint-disable-next-line
  }, [collection]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { refetch: fetch, loading, data, error };
};

export const useFireStoreUpload = ({
  path,
  file,
  onCompleted,
  onError,
}: FireStoreUploadProps): FireStoreUploadReturn => {
  const [state, setState] = useState({
    loading: false,
    error: undefined,
  });

  const { loading, error } = state;

  const upload = (values?: { file: File; path: string }) => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    const storageRef = fireStorage.ref(
      `${values?.path || path}/${values?.file?.name || file?.name}`
    );

    storageRef
      .put(values?.file || file)
      .then((snapshot: any) => {
        snapshot.ref.getDownloadURL().then((downloadUrl: string) => {
          setState((prev) => ({
            ...prev,
            loading: false,
          }));
          if (onCompleted) {
            onCompleted(downloadUrl);
          }
        });
      })
      .catch((error: any) => {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
        if (onError) {
          onError(error);
        }
      });
  };

  return [upload, { loading, error }];
};

const useFirebase = () => {
  return {
    firebase: fire,
    fireStore,
    fireStorage,
  };
};

export default useFirebase;
