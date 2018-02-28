/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import store from './src/redux/store';

import { Provider } from 'react-redux';
import InnerApp from './src/App';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return <Provider store={store}><InnerApp/></Provider>;
      
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   width: '100%',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
