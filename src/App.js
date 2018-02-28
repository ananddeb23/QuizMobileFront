import React, { Component } from 'react';

import {
  View, StyleSheet
} from 'react-native';
//import Header from './components/Header/Header';
//import LoginBody from './components/LoginBody/LoginBody';
import QuestionsContainer from './components/QuestionsContainer/QuestionsContainer';
import ScoresContainer from './components/ScoresContainer/ScoresContainer';
import Welcome from './components/Welcome/Welcome';
import LoginInput from './components/LoginInput/LoginInput';

import { connect } from 'react-redux';
const styles = StyleSheet.create({

  App: {
    flex: 1,
  
  },

});
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.page === 'login') {
      return (
        <View style={styles.App}>
          
          <Welcome />
          <LoginInput />
        </View>
      );
    } else if (this.props.page === 'showquestions') {
      return (
        <View style={styles.App}>
       
          <QuestionsContainer />
        </View>
      );
    } else if (this.props.page === 'showscores') {
      return (
        <View style={styles.App}>
         
          <ScoresContainer />
        </View>
      );
    }
    return (
      <View style={styles.App} />
    );
  }
}
const mapStateToProps = state => ({
  page: state.quiz.page,
  uname: state.quiz.uname,

});
export default connect(mapStateToProps, null)(App);

