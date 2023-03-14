import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

import MapPreview from './MapPreview';

const LocationSelector = props => {
    const [pickedLocation, setPickedLocation] = useState();

    useEffect(() => {
        if (props.currentLocation) {
          setPickedLocation(props.currentLocation);
          props.onLocation(props.currentLocation);
        } 
      }, [props.currentLocation]);

    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisos insuficientes', 'Necesitas dar permisos para usar la cámara.', [{text: 'Ok'}])
            return false
        }

        return true
    }

    const handlerLocationPicker = async () => {
        const isLocationOk = await verifyPermissions();
        if(!isLocationOk) return;

        const location = await Location.getCurrentPositionAsync({timeout: 5000});

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });

        props.onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    }

    return (
        <View style={styles.container}>
            <MapPreview location={pickedLocation}>
                <Text style={styles.text}>No hay ubicación seleccionada</Text>
            </MapPreview>
            <Button title="Tomar ubicación" color="#f7287b" onPress={handlerLocationPicker} style={styles.button} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    preview: {
        width: 200,
        height: 150,
        borderRadius: 100,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    text: {
        color: 'white',
    },
})

export default LocationSelector