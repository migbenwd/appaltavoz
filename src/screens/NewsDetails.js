import {
  Image,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview"
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

export default function NewsDetails() {
  const { item, tituloCategoria } = useRoute().params;

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const runFirst = `(function(){
    const ArbolNavegacion = document.getElementById("breadcrumbs");
    const menuFechaRedes = document.querySelector("[data-id='51412c3']");
    const menuResponsive = document.querySelector("[data-id='1aaf026']");
    const DivAnteriorSiguiente = document.querySelector("[data-id='0e00ed8']");
    const DivQueOpinas = document.querySelector("[data-id='3ed0f87']");
    const DivComentario = document.querySelector("[data-id='b09ba3d']");
    const DivNoticiasRelacionadas = document.querySelector("[data-id='d319abd']");
    const DivNoticiasRelacionadas2 = document.querySelector("[data-id='23d0ea9']");
    const DivPublicidadLoUltimo = document.querySelector("[data-id='bb28b33']");
    const Footer = document.querySelector("[data-elementor-id='87']");
    const BtnWhatsapp = document.getElementsByClassName("joinchat__button")[0];
    const TituloNoticia = document.querySelector("[data-id='a86e2df']");
    const Comentario1 = document.querySelector('.elementor-post-info li:nth-child(3)');
    const FechaCompleta = document.querySelector('.elementor-post-info li:nth-child(1)');
    const AutorFecha = document.querySelector(".elementor-inline-items.elementor-icon-list-items.elementor-post-info");
    const FotoNoticia = document.querySelector("[data-id='27eacb1']");
    
    ArbolNavegacion.remove();
    menuFechaRedes.remove();
    menuResponsive.remove();
    DivAnteriorSiguiente.remove();
    DivQueOpinas.remove();
    DivComentario.remove();
    DivNoticiasRelacionadas.remove();
    DivNoticiasRelacionadas2.remove();
    DivPublicidadLoUltimo.remove();
    Footer.remove();
    BtnWhatsapp.remove();
    Comentario1.remove();
    
    TituloNoticia.style.marginTop = "-12%";
    AutorFecha.style.marginBottom = "1%";
    AutorFecha.style.listStyle = "none";
    AutorFecha.style.fontSyze = "9px";
    //AutorFecha.style.backgroundColor = "red";
    AutorFecha.style.marginLeft = "6%";
    AutorFecha.style.width = "95%";
    
    //FechaCompleta.style.marginLeft = "5%";
    
    const contenedor = document.querySelector("[data-id='5694eb7']");
    contenedor.insertBefore(TituloNoticia, FotoNoticia);
    contenedor.insertBefore(AutorFecha, FotoNoticia);
    true; 
  })()
`;

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>

        <View className="flex-row justify-between items-center px-2 pb-12 bg-blue-700">
        </View>

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

        <View className="flex-row items-center px-2 pb-0">
          <View className="p-2 rounded-full items-center justify-center mt-1">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={25} strokeWidth={3} color="blue" />
            </TouchableOpacity>
          </View>
          <Text
            className="pl-4 text-blue-800"
            style={{
              fontFamily: "SpaceGroteskBold",
              fontSize: 20,
            }}
          >
            {tituloCategoria}
          </Text>
        </View>

        <WebView
          source={{ uri: item.link }}
          injectedJavaScript={runFirst}
          onMessage={() => { }}
          style={{
            display: !visible ? 'flex' : 'none'
          }}
          onLoadStart={() => setVisible(true)}
          onLoadEnd={() => setVisible(false)}
          onLoadProgress={() => console.log('en migben Load Progress')}
        />


        {visible ? (
          <ActivityIndicator
            size={"large"}
            color={"blue"}
            style={{
              position: "absolute",
              top: height / 2,
              left: width / 2,
            }}
          />
        ) : null}

      </SafeAreaView>
    </>

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
