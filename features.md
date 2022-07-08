# Feature set

General

- Navigation
  - swipe navigation
- Firebase Analytics
- Languages
  - en
  - de
  - jp
- Sentry Crashlytics
- Theming
- Dark Mode
- persistence of settings, favorites, my contributions
- Publishing to Google Playstore
- Over-the-air updates

Home

- display an awesome message
- Load today's awesome message or a random message
- refresh today's awesome message manually
- refresh today's awesome message on app restart or app-wakening on next day
- like / add to favorites
- report inappropriate

Favorites

- see an empty list directing back to Home
- see list of favorites
- delete favorites

Contributions

- Form
- Validation
- links to Privacy Policy + Terms of Service
- on submit, add to Y3A user contributions list

My Contributions

- see an empty list directing back to Contributions
- see list of my contributions
- delete contributions

Settings

- analytics opt-out
- Privacy policy
- version info
- about
- experimental settings

Push Notifications

- receive Daily Push Notifications with awesome message
- subscribe
- unsubscribe
- set notification time

## Product Demo

- [Google Playstore listing](https://play.google.com/store/apps/details?id=eu.kraenz.youareawesomeapp)
- [Frontend Github Repo](https://github.com/proSingularity/you-are-awesome-app/issues)
- [Backend Github Repo](https://github.com/proSingularity/you-are-awesome-app-backend)
- [Architecture Diagram](https://drive.google.com/file/d/16ZhIJ67fQRmhMZnOK5MjE-qJspIQUzP_/view)

1. Product demo

- Motivational Quotes but with extra portion gratitude - actual quotes are from the community
- one message per day - same message gets shown to every person for that specific day
- Home
- copy message
- Like message
- Favorites
- Contributions
- Settings
- Daily Notifications / Push Notifications
- Multilanguage support
- Dark Mode
- Provide Feedback + bug button
- Privacy Policy
- Analytics + Opt-out

1. tech demo

frontend:

- Installation guide
- demonstrate changing some code
- split into dev, stage, prod
- deployment: OTA (Over The Air)
- deployment: to Google Playstore
  - rarely needed
  - new build with Expo (<https://expo.io>) - handles build, code signing, and hosting
  - cli command to deploy to Google Playstore

backend

- serverless
