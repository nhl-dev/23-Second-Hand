import React, { useState } from 'react'
import { View, StyleSheet, Image, Button, Text, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { COLORS } from '../constants/colors'

const ImageSelector = props => {
    const [pickedImage, setPickedImage] = useState()

    const verifyPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            console.log(status);
            Alert.alert('Permisos insuficientes', 'Necesitas dar permisos para usar la cámara.', [{text: 'Ok'}])
            return false
        }

        return true
    }

    const handlerImagePicker = async () => {
        const isCameraOk = await verifyPermissions();
        if(!isCameraOk) return;

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        })

        setPickedImage(image.assets[0].uri);
        props.onImage(image.assets[0].uri);
    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {!pickedImage ? (<Text> No hay una imagen seleccionada.</Text>)  
                : (<Image style={styles.image} source={{uri: pickedImage}} />)}
            </View>
            <Button title="Tomar foto" color={COLORS.primary} onPress={handlerImagePicker} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    preview: {
        width: 130,
        height: 130,
        borderRadius: 100,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    }
})

export default ImageSelector