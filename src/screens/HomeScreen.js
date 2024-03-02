
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";

import CategoriesCard from "../components/CategoriesCard";
import NewsSection, { RenderNewsItem } from "../components/NewsSection/NewsSection";
import { getNewsByCategoryId, getCategories } from "../../services/NewsApi";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const CATEGORY_DEFAULT = { id: "77", title: "Portada" }

const getTheFirstFiveNewsByCategories = async () => {

  const categories = await getCategories()

  const newsByCategoriesId = [CATEGORY_DEFAULT, ...categories].map(async (category) => {
    const news = await getNewsByCategoryId(category.id)
    return {
      title: category.title,
      id: category.id,
      data: news.slice(0, 5)
    }
  })

  return await Promise.all(newsByCategoriesId)
}

export default function HomeScreen() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });


  const { colorScheme, } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState(CATEGORY_DEFAULT);
  const [isLoading, setIsLoading] = useState(true)
  const [discoverNewsAV, setDiscoverNewsAV] = useState([]);
  const [newsPortada, setNewsPortada] = useState([])

  const fetchNewsByCategory = (categoryId) => {
    setIsLoading(true)
    if (categoryId === CATEGORY_DEFAULT.id) {
      return getTheFirstFiveNewsByCategories().then((data) => {
        setIsLoading(false)
        setNewsPortada(data)
      })
    }

    getNewsByCategoryId(categoryId)
      .then(data => {
        setIsLoading(false)
        setDiscoverNewsAV(data)
      }).catch(err => {
        console.log("Error fetching news by category id", err);
      })
  }

  const handleChangeCategory = (category) => {
    setDiscoverNewsAV([]);
    setActiveCategory(category)
    fetchNewsByCategory(category.id)
  };

  useEffect(() => {
    fetchNewsByCategory(CATEGORY_DEFAULT.id)
  }, [])

  if (!fontsLoaded) {
    return <Text></Text>;
  }



  return (
    <SafeAreaView style={{ flex: 1 }} edge={["bottom"]}>

      <View className="flex-row justify-between items-center px-2 pb-12 bg-blue-700"></View>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View style={styles.container}>
        <View>
          <Image
            source={require("../../assets/images/welcome/logo.png")}
            style={{
              resizeMode: 'contain',
              height: 100,
              width: 200,
            }}
          />
        </View>
      </View>

      <View className="p-2">
        <CategoriesCard
          activeCategory={activeCategory.id}
          handleChangeCategory={handleChangeCategory}
        />

        {activeCategory.id === CATEGORY_DEFAULT.id ? null :
          (
            <Text
              className="dark:text-white ml-2 mb-2 mt-4"
              style={{
                fontSize: hp(3.25),
                fontFamily: 'Poppins_700Bold',
              }}
            >
              {activeCategory.title}
            </Text>
          )
        }
      </View>

      {isLoading ?
        (
          <View className="mt-8 flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          activeCategory.id === CATEGORY_DEFAULT.id ? (
            <SectionList
              sections={newsPortada}
              keyExtractor={(item) => item.id}
              renderSectionFooter={({ section: { id: categoryId, title: categoryTitle } }) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleChangeCategory({ id: categoryId, title: categoryTitle })}
                    className="flex items-center space-y-1"
                  >
                    <View className="rounded-full mb-6 py-2 px-4 border-2 bg-slate-50  w-50">
                      <Text
                        style={{
                          fontSize: hp(2),
                          fontFamily: 'Poppins_400Regular',
                        }}>
                        Ver Más
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
              renderItem={({ item, index }) => (



                <RenderNewsItem
                  item={item}
                  tituloCategoria={activeCategory.title}
                  activeCategoryId={activeCategory.id}
                  indexso={index}

                />
              )}
              renderSectionHeader={({ section: { title } }) => (

                //-------------- category tittle

                <View className="flex-row">
                  <Text className="bg-[#FFCC29] uppercase rounded ml-2 py-0 px-7 mt-0 mb-4"
                    style={{
                      fontSize: hp(2),
                      fontFamily: 'Poppins_700Bold',
                    }}
                  >
                    {title}
                  </Text>
                </View>
              )}
            />

          ) : (
            <NewsSection
              data={discoverNewsAV}
              tituloCategoria={activeCategory.title}
              activeCategoryId={activeCategory.id}
            />
          )
        )
      }
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '10%',
    textAlign: 'center',
    backgroundColor: 'white',
  },


});

