import * as FileSystem from "expo-file-system";
import { insertData, fetchData } from "../../db";
import { API_KEY } from './../../constants/Map';

export const ADD_DATA = "ADD_DATA";
export const LOAD_DATA = "LOAD_DATA";

export const addData = (userId, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`
    );

    if (!response.ok)
      throw new Error("No se ha podido comunicar con Google Mas API");

    const resData = await response.json();

    if (!resData.results)
      throw new Error(
        "No se han encontrado datos para las coordenadas seleccionadas"
      );

    const address = resData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;

    try {
      FileSystem.moveAsync({
        from: image,
        to: Path,
      });
      const result = await insertData(
        userId,
        Path,
        address,
        location.lat,
        location.lng
      );
      console.log(result);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
    dispatch({
      type: ADD_DATA,
      payload: {
        id: userId,
        image: Path,
        address,
        lat: location.lat,
        lng: location.lng,
      },
    });
  };
};

export const loadData = () => {
  return async (dispatch) => {
    try {
      const result = await fetchData();
      dispatch({ type: LOAD_DATA, data: result.rows._array });
    } catch (error) {
      throw error;
    }
  };
};