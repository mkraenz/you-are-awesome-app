# You are Awesome App! Daily Motivation Up

<a href='https://play.google.com/store/apps/details?id=eu.kraenz.youareawesomeapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="200"/></a>
[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/fold_left.svg?style=social&label=Follow%20%40YouareAwesomeA2)](https://twitter.com/YouareAwesomeA2?ref_src=twsrc%5Etfw)

## Production

Production apps are apps on a User's smart phone installed from the Google Play Store.

- [You are Awesome App! on Google Play Store](https://play.google.com/store/apps/details?id=eu.kraenz.youareawesomeapp)
- [Google Play Console](https://play.google.com/apps/publish/)
- [Google Sheets](https://docs.google.com/spreadsheets/)
- [EasyCron](https://www.easycron.com/user)
- [Firebase](https://console.firebase.google.com/u/0/project/youareawesomeapp-c8835/overview)
- [Privacy Policy on Termly.io](https://app.termly.io/dashboard/website/548360/privacy-policy)
- [AWS S3](https://s3.console.aws.amazon.com/s3/home?region=eu-central-1)
- [Sentry](https://sentry.io/organizations/you-are-awesome-app/issues/)

## Legals

### Legal Attributions

Google Play and the Google Play logo are trademarks of Google LLC.

#### Further reading

## Development

### Update production apps

#### How to

##### OTA Over-the-air updates

```shell
deploy:ota:test
# for production release
deploy:ota:prod
```

When a User now starts her app (even if installed from the Google Play Store!), the app tries to download the newest JS files for the app and runs the newest version. It falls back to the cached (i.e. previous) version after 2 seconds.

##### Special case - changes to app.json or Expo SDK

Only in case of changes to `app.json` or the Expo SDK version, one needs to rebuild the app and republish to expo.

```shell
# manually update app.json's version and android.versionCode
yarn build-and-publish:expo:android:test
# for production release
yarn build-and-publish:expo:android:prod
```

To push the built apk to the Google Playstore run

```shell
# ensure the following was run right before publishing to playstore
# yarn build-and-publish:expo:android:prod
yarn publish:playstore
```

### Debug native app on a phone or emulator

Requires

- Android Studio to be installed on your computer
- USB debugging enabled on phone or emulator (see [video](https://www.youtube.com/watch?v=Yxqq7bT1K2A))
- for phone: phone is connected to computer

> Pro tip: Use `zsh` ([zshell](https://ohmyz.sh/)) for autocompletion of paths, and even for adb.

```shell
# list connected devices
adb devices -l

# native logs
adb logcat
adb logcat >> my-log.log

# install apk
adb install /path/to/my/app
```

### Debugging Jest tests

- Install [VS Code Jest Extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest).
- Install Jest `npm install --save-dev jest` (even if it is included in `expo-jest`! The plugin expects).
- Open test file (either `test.js` or `test.ts`).
- VS Code shows small green lights (or red, if test fails) in front of each `it()`.
- Make one test fail.
- Set breakpoint in that test.
- `Debug` text appears above `it()` (may take 3 seconds). Hit that to start debugger.
- Debugger stops at the breakpoint.
- Happy Debugging.

Further reading in related [issue #16](https://github.com/proSingularity/you-are-awesome-app/issues/16#issuecomment-544240073) .

## Further Links

- [You are Awesome App! on Twitter](https://twitter.com/YouareAwesomeA2)
- [Github Repo](https://github.com/proSingularity/you-are-awesome-app)
- [You are Awesome App! on expo.io](https://expo.io/@mirolaos/you-are-awesome-app)
- [Travis CI](https://travis-ci.com/proSingularity/you-are-awesome-app)
- [Codecov](https://codecov.io/gh/proSingularity/you-are-awesome-app)
- [Google Sheets to JSON](http://gsx2json.com/)
- [My JSON Server](https://my-json-server.typicode.com)
- [UI Prototyping via Moqups](https://app.moqups.com/pczu8pWcIi/edit/page/aa9df7b72)
- [UI Prototyping via Framer](https://framer.com/projects/examples)
- [Hashtagify](https://hashtagify.me/hashtag/app)
- [Commun.it](https://commun.it/)
- [Expo API Status](https://status.expo.io/#)
- [Expo How to publish to AppStores](https://docs.expo.io/distribution/uploading-apps/)
- [React Native Vector Icon List](https://oblador.github.io/react-native-vector-icons/)
- [Monetize Expo App](https://medium.com/leckr-react-native-graphql-apollo-tutorials/monetisation-of-your-react-native-app-7c63241c4460)
- [Expo Admob SDK](https://docs.expo.io/versions/latest/sdk/admob/)
- [ezgif Gif Maker](https://ezgif.com/maker)
- [Microsoft UI Translations](https://www.microsoft.com/en-us/language)
- [Expo Doc Configure OTA Updates](https://docs.expo.io/versions/latest/guides/configuring-ota-updates/)

## Frequent Development Mistakes

### `ReferenceError: Can't find variable: React`

Having a react component import from `react` like this

```typescript
import { FC } from "react";
```

will result in `ReferenceError: Can't find variable: React`.

#### Solution

```typescript
import React, { FC } from "react";
```

### During tests: Unable to find node on an unmounted component

```log
Unable to find node on an unmounted component.

at node_modules/@testing-library/react-native/build/helpers/findByAPI.js:16:115
at Timeout.runExpectation [as _onTimeout] (node_modules/@testing-library/react-native/build/waitFor.js:48:24)
```

If this happens in places where the `Portal` component is used, first check that the state is mocked correctly (including for all rendered subcomponents).
