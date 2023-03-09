import { StyleSheet, View, Text } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "@expo/vector-icons/Ionicons"

import ShopNavigator from "./ShopNavigator"
import CartNavigator from "./CartNavigator"
import OrdersNavigator from "./OrdersNavigator"

import { COLORS } from '../constants/colors'

const BottomTabs = createBottomTabNavigator()

export default BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="ShopTab"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <BottomTabs.Screen
        name="ShopTab"
        component={ShopNavigator}
        options={{
          tabBarIcon: () => (
            <View style={styles.icon}>
              <Ionicons name="home" size={20} color="white" />
              <Text style={styles.text}>Tienda</Text>
            </View>
          ),
        }}
      />
      <BottomTabs.Screen
        name="CartTab"
        component={CartNavigator}
        options={{
          tabBarIcon: () => (
            <View style={styles.icon}>
              <Ionicons name="cart" size={20} color="white" />
              <Text style={styles.text}>Carrito</Text>
            </View>
          ),
        }}
      />
      <BottomTabs.Screen
        name="OrdersTab"
        component={OrdersNavigator}
        options={{
          tabBarIcon: () => (
            <View style={styles.icon}>
              <Ionicons name="list" size={20} color="white" />
              <Text style={styles.text}>Ordenes</Text>
            </View>
          ),
        }}
      />
    </BottomTabs.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: COLORS.quaternary,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: 'white',
  },
})
