import React from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native"


import CartItem from "../components/CartItem"
import { useSelector, useDispatch } from "react-redux"
import { confirmCart, removeItem } from "../store/actions/cart.action"

import { COLORS } from '../constants/colors'

const CartScreen = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)
  const total = useSelector(state => state.cart.total)

  const handleConfirmCart = () => {
    dispatch(confirmCart(items, total))
  }

  const handleDeleteItem = ( id ) => {
    dispatch(removeItem(id))
  }

  const renderCartItem = ({ item }) => (
    <CartItem item={item} onDelete={() => handleDeleteItem(item.id)} />
  )

  return (
    <View style={styles.container}>
      
      <View style={styles.list}>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderCartItem}
        />

      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirm} onPress={handleConfirmCart}>
          <Text style={styles.text}>Confirmar</Text>
          <View style={styles.total}>
            <Text style={styles.text}>Total</Text>
            <Text style={styles.text}>${total}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingBottom: 120,
  },
  list: {
    flex: 1,
  },
  footer: {
    padding: 12,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  confirm: {
    backgroundColor: COLORS.quaternary,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  total: {
    flexDirection: "row",
    color: "white",
  },
  text: {
    fontSize: 18,
    padding: 8,
    fontWeight: "bold",
    color: "white",
  },
})
