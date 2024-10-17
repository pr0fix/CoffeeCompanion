# CoffeeCompanion

CoffeeCompanion is your go-to mobile app for finding nearby coffee shops!

## Features

- **Nearby coffee shops on map**: Fetches coffee shops near your location from the Foursquare Places API, showing them on the map as points of interest.
- **Create an account**: Sign up for free to unlock the full benefits of CoffeeCompanion.
- **Review your favorite coffee shops**: Share your thoughts and reviews of your favorite coffee shops for others to see and interact with.
- **Add coffee shops to favorites**: Save coffee shops to your personal favorites list for quick access.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)

## Installation

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/pr0fix/CoffeeCompanion
   ```
2. Navigate to the project directory:
   ```bash
   cd CoffeeCompanion
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory by following the `.env.template` which contains the following:
   ```
   FIREBASE_API_KEY=<your_firebase_api_key>
   FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
   FIREBASE_PROJECT_ID=<your_firebase_project_id>
   FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
   FIREBASE_MESSAGING_SENDER_ID=<your_firebase_sender_id>
   FIREBASE_APP_ID=<your_firebase_app_id>
   FIREBASE_DB_URL=<your_firebase_realtime_db_url>
   FOURSQUARE_API_KEY=<your_foursquare_api_key>
   ```
5. Start the development server:
   ```bash
   npm start
   ```

### Important Notes

- If you are using a mobile device with Expo, make sure you are connected to the same network as your development device.
- If `npm start` doesn't work, try running:
  ```bash
  npm start --tunnel
  ```

## Usage

Once the development server is running, you can scan the QR code displayed in the terminal or Expo Dev Tools to launch the app on your mobile device.

## Screenshots

coming soon...

## Technologies used

CoffeeCompanion is built using the following technologies:

- **React Native**: A framework for building native apps using React.
- **Expo**: A framework and platform for universal React applications.
- **Foursquare Places API**: Used to fetch nearby coffee shops based on the user's location.
- **Firebase**: For user authentication and data storage.
- **Firestore**: For storing user reviews and coffee shop data.
- **Axios**: For making API requests.
- **Formik**: A library for building forms in React with ease.
- **Yup**: A schema validation library for Formik to handle form validations.
- **React Navigation**: A routing and navigation library for React Native.
- **React Native Dotenv**: Babel plugin for injecting environment variables into JS environment.
- **React Native Maps**: A library for displaying maps in React Native applications.
- **React Native Vector Icons**: A library that provides customizable icons for React Native.
- **React Native Map Clustering**: React Native module that handles map marker clustering.
- **React Native Bottom Sheet**: A performant interactive bottom sheet with fully configurable options.
- **React Native Gesture Handler**: Provides a more comprehensive, low level abstraction for the Animated library API.
- **React Native Reanimated**: Provides native-driven gesture management APIs for building best possible touch-based experiences in React Native.
- **Async Storage**: Storage system for React Native.

These technologies work together to create a seamless and efficient user experience in finding nearby coffee shops.
