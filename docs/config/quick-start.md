---
title: Quick Start
description: Get to grips with the basics of Remote Config in React Native Firebase
---

# Remote Config Quick Start

## Installation

Install this module with Yarn:

```bash
yarn add @react-native-firebase/config
```

> Integrating manually and not via React Native auto-linking? Check the setup instructions for <Anchor version group href="/android">Android</Anchor> & <Anchor version group href="/ios">iOS</Anchor>.

## Module usage

Import the Performance Monitoring package into your project:

```js
import config from '@react-native-firebase/config';
```

The package also provides access to the firebase instance:

```js
import { firebase } from '@react-native-firebase/config';
```

### Fetching, activating and getting values

Before the values from the Firebase console can be used, they need to be fetched and activated. This can be done using
the `fetchAndActivate` method:

```js
import config from '@react-native-firebase/config';

async function getValues() {
  try {
    const activated = await config().fetchAndActivate();

    if (activated) {
      const experimentalFeatureEnabled = await config().getValue('experiment');
      console.log('Experimental source: ', experimentalFeatureEnabled.source);
      console.log('Experimental value: ', experimentalFeatureEnabled.value);
    }
  } catch (e) {
    console.error(e);
  }
}
```

### Setting default values

In some cases you may want to fetch values from the console in the background without the process visibly impacting
your application. To prevent any race conditions where values are being requested (i.e. via `getValue`) before they
have been fetched and activated, it is recommended you set default values using `setDefaults`:

```js
import config from '@react-native-firebase/config';

async function bootstrap() {
  await config().setDefaults({
    experiment: false,
  });
}
```

### Developer mode

Whilst developing, setting the developer mode to `true` allows config to bypass internal checks such as caching
which are applied in a production application. This can be done with the `setConfigSettings` method:

```js
import config from '@react-native-firebase/config';

async function bootstrap() {
  await config().setConfigSettings({
    isDeveloperModeEnabled: __DEV__,
  });
}
```
