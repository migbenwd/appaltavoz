/* eslint-disable global-require */

import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { WebView } from 'react-native-webview';
import CategoriesCard from '../components/CategoriesCard';
import NewsSection, {
  RenderNewsItem,
} from '../components/NewsSection/NewsSection';

import { getNewsByCategoryId, getCategories } from '../services/NewsApi';

const CATEGORY_DEFAULT = { id: '77', title: 'Portada' };
const getTheFirstFiveNewsByCategories = async () => {
  const categories = await getCategories();

  const newsByCategoriesId = [CATEGORY_DEFAULT, ...categories].map(
    async (category) => {
      const news = await getNewsByCategoryId(category.id);
      return {
        title: category.title,
        id: category.id,
        data: news.slice(0, 5),
      };
    }
  );

  return Promise.all(newsByCategoriesId);
};

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const { colorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState(CATEGORY_DEFAULT);
  const [isLoading, setIsLoading] = useState(true);
  const [discoverNewsAV, setDiscoverNewsAV] = useState([]);
  const [newsPortada, setNewsPortada] = useState([]);

  const fetchNewsByCategory = (categoryId) => {
    setIsLoading(true);
    if (categoryId === CATEGORY_DEFAULT.id) {
      return getTheFirstFiveNewsByCategories().then((data) => {
        setIsLoading(false);
        setNewsPortada(data);
      });
    }

    getNewsByCategoryId(categoryId)
      .then((data) => {
        setIsLoading(false);
        setDiscoverNewsAV(data);
      })
      .catch((err) => {
        console.log('Error fetching news by category id', err);
      });
  };

  const handleChangeCategory = (category) => {
    setDiscoverNewsAV([]);
    setActiveCategory(category);
    fetchNewsByCategory(category.id);
  }; 

  useEffect(() => {
    fetchNewsByCategory(CATEGORY_DEFAULT.id);
  }, []);

  if (!fontsLoaded) {
    return <Text />;
  }

  const runFirst = `(function(){

    const BtnWhatsapp = document.getElementsByClassName("joinchat__button")[0];
    BtnWhatsapp.remove();

    const Header = document.querySelector("[data-elementor-id='36']");
    Header.remove();

    const Footer = document.querySelector("[data-elementor-id='87']");
    Footer.remove();

    const BloqueNoticia1 = document.querySelector("[data-id='b474d47']");
    BloqueNoticia1.remove();
    
    const BloqueNoticia2 = document.querySelector("[data-id='f54687a']");
    BloqueNoticia2.remove();
    
    const Radio1 = document.querySelector("[data-id='45895aa']");
    Radio1.remove();
    
    const EscuchaLaRadio1 = document.querySelector("[data-id='8bed472']");
    EscuchaLaRadio1.remove();
    
    const PublicidadHorizontal = document.querySelector("[data-id='6ab0856']");
    PublicidadHorizontal.remove();

    const PublicidadCuadro = document.querySelector("[data-id='4b6996e']");
    PublicidadCuadro.style.marginTop='-40%'
    
    
    
    // ------------- Ocualtar Bloque Completo

    const divPadre = document.querySelector("div[data-id='cb42998']")
    const cantidadDivsHijos = divPadre.children.length;

    // Recorrer los divs hijos
    for (const divHijo of divPadre.children) {
      // Si el div hijo no tiene data-id "4b6996e"
      if (divHijo.dataset.id !== "4b6996e") {
        // Establecer la altura en 500px
        divHijo.style.height = "500px";
        // Establecer el fondo en verde
        divHijo.style.backgroundColor = "green";
        divHijo.style.display = "none";
      }
      else {
        
        divHijo.style.display = "block";
      
    }
    }



    true; 

  })()
`;

  return (
    <SafeAreaView style={{ flex: 1 }} edge={['bottom']}>
      <View className="flex-row justify-between items-center px-2 pb-12 bg-blue-700" />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.container}>
        <View>
          <Image
            source={require('../../assets/images/welcome/logo.png')}
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

        {activeCategory.id === CATEGORY_DEFAULT.id ? null : (
          <Text
            className="dark:text-white ml-2 mb-2 mt-4"
            style={{
              fontSize: hp(3.25),
              fontFamily: 'Poppins_700Bold',
            }}
          >
            {activeCategory.title}
          </Text>
        )}
      </View>
      {isLoading ? (
        <View className="mt-8 flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : activeCategory.id === CATEGORY_DEFAULT.id ? (
        <SectionList
          sections={newsPortada}
          keyExtractor={(item) => item.id}
          renderSectionFooter={({
            section: { id: categoryId, title: categoryTitle },
          }) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() =>
                    handleChangeCategory({
                      id: categoryId,
                      title: categoryTitle,
                    })
                  }
                  className="flex items-center space-y-1"
                >
                  <View className="rounded-full mb-6 py-2 px-4 border-2 bg-slate-50  w-50">
                    <Text
                      style={{
                        fontSize: hp(2),
                        fontFamily: 'Poppins_400Regular',
                      }}
                    >
                      Ver Más
                    </Text>
                  </View>
                </TouchableOpacity>
                <View className="border-indigo-500/100">
                  <WebView
                    className="flex items-center ml-5 mr-5 mb-10"
                    style={{ height: 250 }}
                    source={{ uri: 'https://noticieroaltavoz.com' }}
                    injectedJavaScript={runFirst}
                  />
                </View>
              </>
            );
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
            // -------------- category tittle
            <View className="flex-row">
              <Text
                className="bg-[#FFCC29] uppercase rounded ml-2 py-0 px-7 mt-0 mb-4"
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
      )}
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
