import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { API_KEY } from './../constants/Map';

const MapPreview = (props) => {

    console.log("props ", props);

    const mapPreviewUrl = props.location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${props.location.lat},${props.location.lng}&key=${API_KEY}`
    : '';

    return (
        <View style={{...styles.mapPreview, ...props.style}}>
            {props.location
            ? <Image style={styles.mapImage} source={{uri: mapPreviewUrl}} />
            : props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    mapImage: {
        width: 300,
        height: 150
    }
});

export default MapPreview;