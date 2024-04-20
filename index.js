// import { registerRootComponent } from 'expo';
// import TrackPlayer from 'react-native-track-player';
// import App from './App';

// registerRootComponent(App);
// TrackPlayer.registerPlaybackService(() => require('./service'));

import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import { name as appName } from './app.json';
import { playbackService } from './trackPlayerServices';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);