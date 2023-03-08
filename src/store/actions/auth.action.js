import { URL_AUTH } from '../../constants/Database';

export const SIGNUP = 'SIGNUP';

export const signup = (email, password) => {

    return async dispatch => {
        try {

            const response = await fetch(
                URL_AUTH,
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            );
        
            const resData = await response.json();
        
            dispatch({
                type: SIGNUP,
                token: resData.idToken,
                userId: resData.localId
             });
            
        } catch (error) {
            console.log('error while signing up');
            console.log(error);
        }
    };
};