import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

function formatDate(isoDate) {
  const options = {
    // weekday: "short",
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, options);
}

export function RenderNewsItem({
  item,
  tituloCategoria,
  indexso,
  activeCategoryId,
}) {
  console.log('indexso', indexso);
  console.log('activeCategoryId', activeCategoryId);

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const handleClick = (data) => {
    navigation.navigate('NewsDetails', {
      item: data,
      tituloCategoria,
    });
  };

  if (!fontsLoaded) {
    return <Text />;
  }

  return (
    <TouchableOpacity
      // className="mb-4 items-center"
      className="mb-4"
      key={item.id}
      onPress={() => handleClick(item)}
    >
      <View
        className={`ml-2 mr-2 w-[95%] ${activeCategoryId === 77 && indexso !== 0 ? 'flex-row' : null}`}
      >
        <Image
          className={`rounded-md ${activeCategoryId === 77 && indexso !== 0 ? 'w-28 h-20' : 'w-[100%] h-64'}`}
          source={{
            uri:
              item && item.yoast_head_json && item.yoast_head_json.og_image[0]
                ? item.yoast_head_json.og_image[0].url
                : '',
          }}
        />

        <View
          className={`${activeCategoryId === 77 && indexso !== 0 ? 'w-[60%] ml-2' : null}`}
        >
          <Text
            style={{
              fontSize:
                activeCategoryId === 77 && indexso !== 0 ? hp(1.65) : hp(2.5),
              fontFamily: 'Poppins_600SemiBold',
            }}
          >
            {item.title.rendered}
          </Text>

          <View
            // className={`${indexcito === 0 ? 'w-70 ml-4' : 'w-40 ml-2'}`}
            className="w-70 ml-0"
          >
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              <Text
                className="text-gray-400 dark:text-neutral-300"
                style={{
                  fontFamily: 'Poppins_500Medium',
                }}
              >
                Por
              </Text>
              <Text> </Text>
              {item.yoast_head_json.author}
              <Text className="text-gray-400 dark:text-neutral-300">
                <Text>{' • '}</Text>
                {formatDate(item.date)}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function NewsSection({
  data,
  tituloCategoria,
  activeCategoryId,
}) {
  return (
    <FlatList
      nestedScrollEnabled
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <RenderNewsItem
          item={item}
          tituloCategoria={tituloCategoria}
          indexso={index}
          activeCategoryId={activeCategoryId}
        />
      )}
      ListFooterComponent={<SafeAreaView edge={['bottom']} />}
    />
  );
}