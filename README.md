# AFEM
Mobile app that display resources listing, private message, forum and a calendar of events.

## What is done
- Initializes a working template with the following command `expo init mobapp`
- Create `./backend/` folder and init inside a json file by `npm init -y`
- Install express environment `npm install express cors mongoose dotenv`
- Configure server by creating the server file `./backend/server.js`
- Setup the `.env` for the MongoDB Atlas URI
- Create database schema using mongoose in the `./backend/models/` folder

## How to start
1. Install globally our client package `npm install -g expo-cli`
2. Install globally our server package `npm install -g nodemon`
3. Inside the `./backend/` folder type `npm install`
4. Inside the `./mobapp/` folder type `npm install`

## How to debug
1. We need ADB (Android Debug Bridge) and Fastboot to link our expo with our Android simulator
    - I recommend to install [Minimal ADB and Fastboot](https://forum.xda-developers.com/showthread.php?t=2317790) instead of Android Studio which is heavy
2. I use [Genymotion](https://www.genymotion.com/) for emulating Android who need **VirtualBox** to run
3. Open Genymotion and install **Google Pixel 3** terminal
4. In Genymotion settings go to ADB and select "Use custom Android SDK tools", and point it at your Android SDK directory (Should be the default directory).
5. Once you start Google Pixel terminal, go to Settings/System/Developer options and check On on the top and USB Debugging
6. Now go back to your `./mobapp` folder and type `expo start`
7. A tab should open on your default browser under the name of **Metro Bundler**, ensure the Google Pixel terminal is start and select **Run on Android device/emulator**
8. Wait and see ^.^
    - The app should start on your terminal, if it's not, you probably screwed somehow and you need to restart from the beginning !

## How to run server
1. Ensure your IP is referenced in the MongoDB Atlas cluster (Security issues).
2. Go to the `backend` folder
3. Run the server by typing `nodemon server`
