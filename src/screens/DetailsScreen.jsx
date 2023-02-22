import { Button, StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

const DetailsScreen = ({ navigation, route }) => {
  const product = useSelector((state) => state.products.selectedProduct)

  useEffect(() => {
    console.log(route.params)
  }, [])

  return (
    <View style={styles.container}>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>{product.price}</Text>
      <Button title='Add to cart' onPress={() => console.log('Agregar al carrito')}/>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
