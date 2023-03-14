import React from "react"
import { StyleSheet, View, FlatList } from "react-native"
import CategoriesItem from "../components/CategoriesItem"
import { selectedCategory } from "../store/actions/category.action"
import { useSelector, useDispatch } from "react-redux"

const CategoriesScreen = ({ navigation }) => {

  const categories = useSelector(state => state.categories.categories)
  const dispatch = useDispatch()

  const handleSelectedCategory = item => {
    dispatch(selectedCategory(item.id))
    navigation.navigate("Products", {
      title: item.title,
    })
  }

  const renderCategoriesItem = ({ item }) => (
    <View style={styles.categoriesContainer}>
      <CategoriesItem item={item} onSelected={handleSelectedCategory} />
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoriesItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 90,
  },
  categoriesContainer: {
    padding: 15,
    height: 150,
  },
})
