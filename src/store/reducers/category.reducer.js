import { LogBox } from 'react-native';
import { CATEGORIES } from '../../data/categories';
import { SELECTED_CATEGORY } from '../actions/category.action';

const initialState = {
    categories: CATEGORIES,
    selectedCategory: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_CATEGORY:
            const IndexCategory = state.categories.findIndex(cat => cat.id === action.categoryId);
            if (IndexCategory === -1) return state;
            return {...state, selectedCategory: state.categories[IndexCategory]};

        default:
            return state;
    };
};

export default categoryReducer;