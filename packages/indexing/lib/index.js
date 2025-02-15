/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Linking } from 'react-native';
import {
  createModuleNamespace,
  FirebaseModule,
  getFirebaseRoot,
} from '@react-native-firebase/app/lib/internal';

import { isFunction } from '@react-native-firebase/common';
import version from './version';

const statics = {};

const namespace = 'indexing';

const nativeModuleName = 'RNFBIndexingModule';

class FirebaseIndexingModule extends FirebaseModule {
  /**
   *
   */
  getInitialURL() {
    return Linking.getInitialURL();
  }

  /**
   *
   * @param listener
   * @returns {function(): *}
   */
  onOpenURL(listener) {
    if (!isFunction(listener)) {
      throw new Error(`firebase.indexing().onOpenURL(*) 'listener' must be a function.`);
    }

    Linking.addEventListener('url', ({ url }) => listener(url));
    return () => Linking.removeEventListener('url', listener);
  }
}

// import { SDK_VERSION } from '@react-native-firebase/indexing';
export const SDK_VERSION = version;

// import indexing from '@react-native-firebase/indexing';
// indexing().X(...);
export default createModuleNamespace({
  statics,
  version,
  namespace,
  nativeModuleName,
  nativeEvents: false,
  hasMultiAppSupport: false,
  hasCustomUrlOrRegionSupport: false,
  ModuleClass: FirebaseIndexingModule,
});

// import indexing, { firebase } from '@react-native-firebase/indexing';
// indexing().X(...);
// firebase.indexing().X(...);
export const firebase = getFirebaseRoot();
