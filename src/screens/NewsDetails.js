import {
  Image,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  // StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

export default function NewsDetails() {
  const { item, tituloCategoria } = useRoute().params;

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const runFirst = `(function(){

    const Header = document.querySelector("[data-elementor-id='36']");
    Header.remove();
    
    const ArbolNavegacion = document.querySelector("[data-id='6a5c232']");
    ArbolNavegacion.remove();

    const Footer = document.querySelector("[data-elementor-id='87']");
    Footer.remove();

    const LateralDerecho = document.querySelector("[data-id='bb28b33']");
    LateralDerecho.remove();
    
    const NoticiasRelacionadas = document.querySelector("[data-id='23d0ea9']");
    NoticiasRelacionadas.remove();

    const TituloNoticiasRelacionadas = document.querySelector("[data-id='d319abd']");
    TituloNoticiasRelacionadas.remove();

    const DivAnteriorSiguiente = document.querySelector("[data-id='0e00ed8']");
    DivAnteriorSiguiente.remove();

    const DivComentarios = document.querySelector("[data-id='b09ba3d']");
    DivComentarios.remove();

    const DivQueOpinas = document.querySelector("[data-id='3ed0f87']");
    DivQueOpinas.remove();

    const BtnWhatsapp = document.getElementsByClassName("joinchat__button")[0];
    BtnWhatsapp.remove();

    const IconosRedesSociales = document.querySelector("[data-id='69312eb']");
    IconosRedesSociales.remove();

    const HazPrimerComentario = document.querySelector('.elementor-post-info li:nth-child(3)');
    HazPrimerComentario.remove();

    const AutorFecha = document.querySelector("[data-id='63ff403']");
    
    const TituloNoticia = document.querySelector("[data-id='a86e2df']");
    TituloNoticia.style.width = "100%";

    const TextoNoticia = document.querySelector("[data-id='4a7d0f5']");
    TextoNoticia.style.marginTop = "5%";

    const FotoNoticia = document.querySelector("[data-id='27eacb1']");
    
    const contenedor = document.querySelector("[data-id='5694eb7']");
    contenedor.style.width = "100%";

    contenedor.insertBefore(TituloNoticia, FotoNoticia);
    contenedor.insertBefore(AutorFecha, FotoNoticia);






    

    true; 
  })()
`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row justify-between items-center px-2 pb-12 bg-blue-700" />

      <View className="items-center bg-white">
        <Image
          source={require('../../assets/images/welcome/logo.png')}
          style={{
            resizeMode: 'contain',
            width: '60%',
          }}
        />
      </View>

      <View className="flex-row items-center px-2 pb-0">
        <View className="p-2 rounded-full items-center justify-center mt-1">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={25} strokeWidth={3} color="blue" />
          </TouchableOpacity>
        </View>
        <Text
          className="pl-4 text-blue-800"
          style={{
            fontFamily: 'SpaceGroteskBold',
            fontSize: 20,
          }}
        >
          {tituloCategoria}
        </Text>
      </View>

      <WebView
        source={{ uri: item.link }}
        injectedJavaScript={runFirst}
        onMessage={() => {}}
        style={{
          display: !visible ? 'flex' : 'none',
        }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
        onLoadProgress={() => console.log('en migben Load Progress')}
      />

      {visible ? (
        <ActivityIndicator
          size="large"
          color="blue"
          style={{
            position: 'absolute',
            top: height / 2,
            left: width / 2,
          }}
        />
      ) : null}
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: '10%',
//     textAlign: 'center',
//     backgroundColor: 'white',
//   },
// });
