// eslint-disable-next-line import/no-import-module-exports
import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  console.log('migben - Init Service Function');
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener('remote-previous', () =>
    TrackPlayer.skipToPrevious()
  );
};
