import React, { useState, useCallback, useEffect, useReducer } from "react"
import { StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
    Pressable,
    Alert
} from "react-native"

import { useDispatch } from "react-redux"
import { signup } from "../store/actions/auth.action"


import { COLORS } from "../constants/colors"
import Input from "../components/Input"

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        console.log(action);
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };

        console.log(updatedValues);
        console.log(updatedValidities);

        let updatedFormIsValid = true;

        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            Alert.alert('Ha ocurrido un error!', error, [{ text: 'Aceptar' }]);
        }
    }, [error]);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    const handleSignUp = () => {
        if (formState.formIsValid) {
            dispatch(signup(formState.inputValues.email, formState.inputValues.password));
        } else {
            Alert.alert('Error!', 'Por favor, revisa los errores en el formulario.', [{ text: 'Aceptar' }]);
        }
    }

    const onInputChange = useCallback(( inputValue, inputValidity, inputIdentifier) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior="height" style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>REGISTRO</Text>

                <View style={styles.form}>
                    <Input
                        id='email'
                        label='Email'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize='none'
                        errorText='Por favor, ingresa un email v??lido.'
                        onInputChange={onInputChange}
                        initialValue=''
                    />

                    <Input
                        id='password'
                        label='Contrase??a'
                        keyboardType='default'
                        required
                        password
                        secureTextEntry
                        autoCapitalize='none'
                        errorText='Por favor, ingresa una contrase??a v??lida.'
                        onInputChange={onInputChange}
                        initialValue=''
                        minLength={5}
                    />
                </View>

                <Pressable style={styles.button} onPress={() => handleSignUp()}>
                    <Text style={styles.text}>Registrarme</Text>
                </Pressable>

                <View style={styles.prompt}>
                    <Text style={styles.promptMsg}>??Ya tienes una cuenta?</Text>
                    <TouchableOpacity>
                        <Text style={styles.promptAction}>Ingresar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

export default AuthScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 18,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        width: '80%',
        maxWidth: 400,
        padding: 20,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: COLORS.tertiary,
    },
    form: {
        alignItems: 'center',
    },
    prompt: {
        alignItems: 'center',
    },
    promptMsg: {
        fontSize: 16,
        color: 'white',
        marginTop: 15,
    },
    promptAction: {
        fontSize: 18,
        color: '#EAEAEA',
        marginTop: 5
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: COLORS.primary,
        marginTop: 5,
      },
    text: {
        color: 'white',
    },
    input: {
        marginVertical: 5,
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: 'white',
        textAlign: 'center',
    }
});