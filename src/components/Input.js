import React, { useReducer, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
        return {
            ...state,
            value: action.value,
            isValid: action.isValid
        }
        case INPUT_BLUR:
        return {
            ...state,
            touched: true
        }
        default:
        return state;
    }
}

const Input = ( { 
  onInputChange, 
  initialValue, 
  initialValid, 
  required, 
  email, 
  max, 
  minLength, 
  label,
  errorText,
  ...props } ) => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initialValid,
    touched: false
  }) 

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(inputState.value, inputState.isValid)
    }
  }, [inputState, onInputChange])

  const textChangeHandler = text => {
    const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let isValid = true;

    if (required && text.trim().length === 0) isValid = false;

    if (email && !emailRegex.test(text.toLowerCase())) isValid = false;

    if (minLength && text.length < minLength) isValid = false;

    if (max && text > max) isValid = false;

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })

  }

  const onBlureHandler = () => {
    dispatch({ type: INPUT_BLUR })
  }

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
      style={styles.input}
      value={inputState.value}
      onChangeText={textChangeHandler}
      onBlur={onBlureHandler}
      {...props}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: 'red',
    fontSize: 13
  }
})