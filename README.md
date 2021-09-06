# You are Awesome App! Daily Motivation Up

**Community-driven motivational quotes.**

Receive Motivation each day. Boost your Productivity. Share your gratitude to make this world even more awesome. Join our Awesome Community.

How it works:
Each day you receive a motivational message written by a grateful person around the globe. That's it. No magic. Only gratefulness. Either via push notification or directly in the app.

<a href='https://play.google.com/store/apps/details?id=eu.kraenz.youareawesomeapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="200"/></a>
[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/fold_left.svg?style=social&label=Follow%20%40YouareAwesomeA2)](https://twitter.com/YouareAwesomeA2?ref_src=twsrc%5Etfw)

<a href="https://public-div.s3.eu-central-1.amazonaws.com/y3a/home.png">
  <img src="https://public-div.s3.eu-central-1.amazonaws.com/y3a/home.png" height="300" alt="you are awesome app home screen">
</a>

<a href="https://public-div.s3.eu-central-1.amazonaws.com/y3a/favs.png">
  <img src="https://public-div.s3.eu-central-1.amazonaws.com/y3a/favs.png" height="300" alt="you are awesome app favorites screen">
</a>

<a href="https://public-div.s3.eu-central-1.amazonaws.com/y3a/contribution.png">
  <img src="https://public-div.s3.eu-central-1.amazonaws.com/y3a/contribution.png" height="300" alt="you are awesome app contribution screen">
</a>

<a href="https://public-div.s3.eu-central-1.amazonaws.com/y3a/settings.png">
  <img src="https://public-div.s3.eu-central-1.amazonaws.com/y3a/settings.png" height="300" alt="you are awesome app settings screen">
</a>

<a href="https://public-div.s3.eu-central-1.amazonaws.com/y3a/favsdark.png">
  <img src="https://public-div.s3.eu-central-1.amazonaws.com/y3a/favsdark.png" height="300" alt="you are awesome app favorites screen dark theme">
</a>
## Production

Production apps are apps on a User's smart phone installed from the Google Play Store.

- [You are Awesome App! on Google Play Store](https://play.google.com/store/apps/details?id=eu.kraenz.youareawesomeapp)
- [Google Play Console](https://play.google.com/apps/publish/)
- [Google Sheets](https://docs.google.com/spreadsheets/)
- [Google Feedback Form](https://docs.google.com/forms/d/1Ta0uvtyu36AI8v9rBJ_2d87Y0yNejEMOe8juLXKcwrY/edit)
- [EasyCron](https://www.easycron.com/user)
- [Firebase](https://console.firebase.google.com/u/0/project/youareawesomeapp-c8835/overview)
- [Privacy Policy on Termly.io](https://app.termly.io/dashboard/website/548360/privacy-policy)
- [AWS S3](https://s3.console.aws.amazon.com/s3/home?region=eu-central-1)
- [Sentry](https://sentry.io/organizations/you-are-awesome-app/issues/)
- [BigQuery](https://console.cloud.google.com/bigquery?project=youareawesomeapp-c8835)

## Legals

### Legal Attributions

Google Play and the Google Play logo are trademarks of Google LLC.

## Releases

### OTA Over-the-air updates

```sh
yarn deploy:ota:stage
# for production release
yarn deploy:ota:prod
```

When a User now starts her app (even if installed from the Google Play Store!), the app tries to download the newest JS files for the app and runs the newest version. It falls back to the cached (i.e. previous) version after 2 seconds.

### Special case - changes to app.json or Expo SDK

Only in case of changes to `app.json` or the Expo SDK version, one needs to rebuild the app and republish to expo.

```sh
# manually update app.json's version and android.versionCode
yarn build-and-publish:expo:android:app-bundle:stage
# for production release
yarn build-and-publish:expo:android:app-bundle:prod
```

To push the built apk to the Google Playstore run

```sh
# ensure the following was run right before publishing to playstore
# yarn build-and-publish:expo:android:app-bundle:prod
yarn publish:playstore
```

## Testing Releases: app-bundle

When using build target `app-bundle` (`.aap`) instead of `.apk` you cannot immediately install them on a device. To test the app on emulator, you need to create an `.apk` as follows:

- Download your `.aab` file
- Download newest version of [Bundletool](https://github.com/google/bundletool/releases) and rename to `bundletool.jar`.
- Put both files into the same folder
- Run the following

```sh
# unpacks the .aab to apk-archive (.apks, essentially .zip)
java -jar bundletool.jar build-apks --bundle=you-are-awesome-app-f91e1a4501e44622b4de84267a774a23-signed.aab --output=y3a.apks --mode=universal

# Option A: install app on a device (like adb install)
java -jar bundletool.jar install-apks --apks=y3a.apks
```

Alternative to Option A:

```sh
# Option B: extract the real app (.apk) living inside the .apks as universal.apk
unzip -p y3a.apks universal.apk > y3a.apk
adb install -r ./y3a.apk
```

[Reference on StackOverflow](https://stackoverflow.com/questions/50419286/install-android-app-bundle-on-device)

## Development

[Main reference](https://docs.expo.dev/workflow/debugging/?redirected#startup)

### Debug native app on a phone or emulator

Requires

- Android Studio to be installed on your computer
- USB debugging enabled on phone or emulator (see [video](https://www.youtube.com/watch?v=Yxqq7bT1K2A))
- for phone: phone is connected to computer

> Pro tip: Use `zsh` ([zshell](https://ohmyz.sh/)) for autocompletion of paths, and even for adb.

```sh
# list connected devices
adb devices -l

# native logs
adb logcat
adb logcat | tee --append android-usb-debugging.log

# install apk
adb install /path/to/my/app
adb install ~/Downloads/you-are-awesome-app-8497638a825d4c70988a0c68eec2d09b-signed.apk
# if app already installed, then re-install
adb install -r ~/Downloads/you-are-awesome-app-8497638a825d4c70988a0c68eec2d09b-signed.apk
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
- [Firebase Analytics Tricks with BigQuery Video](https://www.youtube.com/watch?v=pxNrkjBeHpw) and [recipes](https://gist.github.com/ToddKerpelman/eec3e60c0a5e0bd720d8991bd45487cb)

## Frequent Development Questions and Mistakes

### Clear expo cache

```sh
expo start --clear
yarn dev --clear
```

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

### Redux: I connected my component with the action creator but the reducer doesn't receive any actions

When your imported action creater and the Prop for the action creator are _named identically_, TypeScript doesn't care which one you use inside the component. So _make sure you use the action creator from the Props_. Only the action creator from the props is actually connected to the redux store.

```ts
import { actionCreator } from "./actionCreator";
interface Props {
  actionCreator: typeof actionCreator;
}
// make sure you use the action creator from the props.
// TS won't recognize if you don't destructure the props.
const MyComponent: FC<Props> = ({ actionCreator }) => {
  return <Button onPress={actionCreator}>Do something</Button>;
};

const mapStateToProps = (state: IState) => state;
const mapDispatchToProps: Props = {
  actionCreator,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```
