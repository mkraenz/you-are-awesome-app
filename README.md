# You are Awesome App! Daily Motivation Up!

## Production

Production apps are apps on a User's smart phone installed from the Google Play Store.

- [You are Awesome App! on Google Play Store](https://play.google.com/store/apps/details?id=eu.kraenz.youareawesomeapp)
- [Google Play Console](https://play.google.com/apps/publish/)
- [Google Sheets](https://docs.google.com/spreadsheets/)

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

#### Further reading

- [Expo Doc Configure OTA Updates](https://docs.expo.io/versions/latest/guides/configuring-ota-updates/)
- [Expo Doc Limits of Publish](https://docs.expo.io/versions/latest/workflow/publishing/#deploying-to-the-app-store-and-play)

## Development

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

- [You are Awesome App! on expo.io](https://expo.io/@mirolaos/you-are-awesome-app)
- [Google Sheets to JSON](http://gsx2json.com/)
- [My JSON Server](https://my-json-server.typicode.com)

## Frequent Development Mistakes

### `ReferenceError: Can't find variable: React`

Having a react component import from `react` like this

```typescript
import { SFC } from "react";
```

will result in `ReferenceError: Can't find variable: React`.

#### Solution

```typescript
import React, { SFC } from "react";
```
