/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import React from 'react';
// import AppNavigation from './src/navigation';

// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AppNavigation />
//     </QueryClientProvider>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  useProgress,
  Event,
  State,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setupPlayer, addTracks } from './trackPlayerServices';

function NombreEmisora() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
    if (event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  return (
    <View>
      <Text style={styles.songTitle}>{info.title}</Text>
    </View>
  );
}

function TrackProgress() {
  const { position, duration } = useProgress(200);

  function format(seconds) {
    const mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  // return (
  //   <View>
  //     <Text style={styles.trackProgress}>
  //       { format(position) } / { format(duration) }
  //     </Text>
  //   </View>
  // );
}

function Playlist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
    if (event.state == State.nextTrack) {
      TrackPlayer.getCurrentTrack().then((index) => setCurrentTrack(index));
    }
  });

  function PlaylistItem({ index, isCurrent, logoemisora }) {
    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <Image
          style={{
            resizeMode: 'contain',
            height: 130,
            width: 130,
            marginLeft: 11,
            marginTop: 11,
            marginBottom: 11,
            borderRadius: 30,
            borderColor: 'gray',
            borderWidth: 1,

            ...{
              backgroundColor: isCurrent
                ? 'rgb(62, 250, 223)'
                : 'rgba(82, 176, 230, 0.87)',
            },
          }}
          source={{
            uri: logoemisora,
          }}
        />
      </TouchableOpacity>
    );
  }

  async function handleShuffle() {
    const queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);

    loadPlaylist();
  }

  return (
    <View>
      <View style={styles.playlist}>
        <FlatList
          horizontal={false}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data={queue}
          renderItem={({ item, index }) => (
            <PlaylistItem
              index={index}
              title={item.title}
              logoemisora={item.artwork}
              isCurrent={currentTrack == index}
            />
          )}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NombreEmisora />
        <Controls onShuffle={handleShuffle} />
      </View>
    </View>
  );
}

function Controls({ onShuffle }) {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  return (
    <View
      style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
    >
      <Icon.Button
        name="arrow-left"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToPrevious()}
      />
      <Icon.Button
        name={playerState == State.Playing ? 'pause' : 'play'}
        size={28}
        backgroundColor="transparent"
        onPress={handlePlayPress}
      />
      <Icon.Button
        name="arrow-right"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToNext()}
      />

      {/* <Icon.Button
          name="random"
          size={28}
          backgroundColor="transparent"
          onPress={onShuffle}/> */}
    </View>
  );
}

function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      const isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }

    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TrackProgress />
      <Playlist />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  songTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  artistName: {
    fontSize: 24,
    color: '#888',
  },
  playlist: {
    marginTop: 40,
    marginBottom: 40,
  },
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee',
  },
});

export default App;
