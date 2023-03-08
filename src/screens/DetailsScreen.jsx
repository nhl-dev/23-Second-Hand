import { Button, StyleSheet, Text, View, Image } from "react-native"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addItem } from "../store/actions/cart.action"

const DetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const product = useSelector(state => state.products.selected)

  useEffect(() => {
    
  }, [])

  const handleAddItem = () => {
    dispatch(addItem(product))
  }

  return (
    <View style={styles.container}>
      <Image
          style={styles.image}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      <View style={styles.textContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>{product.name}</Text>
            <Text style={styles.textPrice}>$ {product.price}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Add to cart' onPress={() => handleAddItem()}/>
          </View>
        </View>
        <Text style={{...styles.text, marginTop: 20}}>{product.description}</Text>
      </View>      
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
  },
  textPrice: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: "100%",
    height: "40%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textContainer: {
    padding: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '20%',
  },
  infoTextContainer: {
    width: '80%',
  },
})
