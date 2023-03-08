import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"

import { COLORS } from '../constants/colors'

const ProductsItem = ({ item, onSelected }) => {
  return (
    <TouchableOpacity
      style={{...styles.itemContainer, ...{ backgroundColor: COLORS.primary } }}
      onPress={() => onSelected(item)}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductsItem

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
  imageContainer: {
    height: "70%",
  },
  textContainer: {
    height: "30%",
    paddingLeft: 20,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
