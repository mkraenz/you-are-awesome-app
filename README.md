# You are Awesome App! Daily Motivation Up

<a href='https://play.google.com/store/apps/details?id=eu.kraenz.youareawesomeapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="200"/></a>
[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/fold_left.svg?style=social&label=Follow%20%40YouareAwesomeA2)](https://twitter.com/YouareAwesomeA2?ref_src=twsrc%5Etfw)

## Production

Production apps are apps on a User's smart phone installed from the Google Play Store.

- [You are Awesome App! on Google Play Store](https://play.google.com/store/apps/details?id=eu.kraenz.youareawesomeapp)
- [Google Play Console](https://play.google.com/apps/publish/)
- [Google Sheets](https://docs.google.com/spreadsheets/)
- [EasyCron](https://www.easycron.com/user)
- [Privacy Policy on Termly.io](https://app.termly.io/dashboard/website/548360/privacy-policy)

## Legals

- [Privacy Policy](https://you-are-awesome-app-privacy-policy.s3.eu-central-1.amazonaws.com/PrivacyPolicyEn.html)
- [Privacy Policy on Termly.io](https://app.termly.io/dashboard/website/548360/privacy-policy)

### Legal Attributions

Google Play and the Google Play logo are trademarks of Google LLC.

#### Further reading

- [Expo Doc Configure OTA Updates](https://docs.expo.io/versions/latest/guides/configuring-ota-updates/)
- [Expo Doc Limits of Publish](https://docs.expo.io/versions/latest/workflow/publishing/#deploying-to-the-app-store-and-play)

## Development

### Update production apps

#### How to

```shell
yarn expo publish
```

When a User now starts her app (even if installed from the Google Play Store!), the app tries to download the newest Js for the app and runs the newest version. It falls back to the cached version after 30 seconds.

##### Special case - changes to app.json

Only in case `app.json` changes, there is a need to rebuild the app and republish it manually to the app store.

```shell
yarn expo build:android -t apk
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
