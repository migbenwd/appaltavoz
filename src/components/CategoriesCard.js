import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useEffect, useState, useRef } from "react";
import { getCategories } from "../../services/NewsApi";

export default function CategoriesCard({ activeCategory, handleChangeCategory }) {
  const [categories, setCategories] = useState([])
  const scrollRef = useRef(null);
  const tagRefs = useRef(new Array(categories.length)).current; // Referencias para cada tag

  const handleTagPress = (index) => {
    // Calcula la posición x del elemento para centrarlo en la pantalla
    tagRefs[index].measureLayout(
      scrollRef.current,
      (x, y, width) => {
        // Desplaza a la posición x menos la mitad de la pantalla para centrar el tag
        scrollRef.current.scrollTo({
          x: x - (Dimensions.get('window').width / 2) + (width / 2) + 17,
          animated: true,
        });
      },
      error => {
        console.error('Error al medir la posición del tag:', error);
      }
    );
  };


  useEffect(() => {
    getCategories().then((data) => {
      setCategories([{ id: "77", title: "Portada" }, ...data])
    })
  }, [])

  return (

    <View style={styles.containerTag}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categories.map((category, index) => {
          let isActive = category.id == activeCategory;
          let activeButtonClass = isActive
            ? "bg-blue-700 "
            : "border-2 bg-slate-50";
          let activeTextClass = isActive
            ? "text-white"
            : "text-white-600 dark:text-neutral-100 ";

          return (
            <View ref={el => (tagRefs[index] = el)} key={category.id} style={{ flexDirection: "row" }}>
              <View style={{ width: index !== 0 ? 10 : 0 }} />
              <TouchableOpacity
                onPress={() => {
                  handleTagPress(index)
                  handleChangeCategory(category)
                }}
                className="flex items-center space-y-1"
              >
                <View
                  className={
                    "rounded-full py-2 px-4 " + activeButtonClass
                  }
                >
                  <Text
                    className={"capitalize " + activeTextClass}
                    style={{
                      fontSize: hp(2),
                      fontFamily: 'Poppins_400Regular',
                    }}>
                    {category.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  containerTag: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});
