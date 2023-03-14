import { ADD_DATA, LOAD_DATA } from "../actions/userdata.action";
import UserData from "../../models/UserData";

const initialState = {
  data: [],
};

const userdataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      const newData = new UserData(
        action.payload.id,
        action.payload.image,
        action.payload.address,
        action.payload.lat,
        action.payload.lng
      );
      return {
        ...state,
        data: state.data.concat(newData),
      };
    case LOAD_DATA:
      return {
        ...state,
        data: action.data.map(
          (item) =>
            new UserData(
              item.id,
              item.image,
              item.address,
              item.lat,
              item.lng
            )
        ),
      };
    default:
      return state;
  }
};

export default userdataReducer;