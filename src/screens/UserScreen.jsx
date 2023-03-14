import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

import { useDispatch, useSelector } from "react-redux";

import * as userdataAction from "../store/actions/userdata.action";

import ImageSelector from "../components/ImageSelector"
import LocationSelector from "../components/LocationSelector"

const UserScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.userdata.data);
  const [image, setImage] = useState();
  const [location, setLocation] = useState();
  const [currentImage, setCurrentImage] = useState();
  const [currentLocation, setCurrentLocation] = useState();

  const userId = "userIDTEST2";

  useEffect(() => {
    dispatch(userdataAction.loadData());
  }, []);

  useEffect(() => {
    console.log(data);
    const userData = data.find((user) => user.id === userId);
    setCurrentImage(userData?.image);
    setCurrentLocation({
      lat: userData?.lat,
      lng: userData?.lng
  });
  }, [data]);

  const handleSave = () => {
    dispatch(userdataAction.addData(userId, image, location));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> EDITAR DATOS </Text>
        <Ionicons name="save" size={40} color="white" onPress={handleSave} />
      </View>
      <Text style={styles.text}> FOTO DE PERFIL </Text>
      <ImageSelector onImage={setImage} currentImage={currentImage} />
      <Text style={styles.text}> DIRECCIÓN </Text>
      <LocationSelector onLocation={setLocation} currentLocation={currentLocation} />
      
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {	
    fontSize: 20,
    alignSelf: "center",
    color: "white",
    marginBottom: 15,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    color: "white",
  }
});
