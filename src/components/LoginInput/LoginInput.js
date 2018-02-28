import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text, TextInput, StyleSheet, Button
} from 'react-native';
import axios from 'axios';
import { getQuestions } from '../../redux/actions';
import PropTypes from 'prop-types';
//import './LoginInput.css';

const styles = StyleSheet.create({

  LoginInput:
  { "backgroundColor": "white", "color": "black", 
  "alignItems": "center",
   "padding": 30, "flex": 1, "justifyContent": "center" },
  LoginText: { "fontSize": 30 },
  LoginLabel: { "fontSize": 20 },
  LoginInputArea: {
    "width": "100%", "borderWidth": 1,
    "borderColor": 'black', "height": 30 },
  LoginButton: {
    "borderRadius": 5, "borderWidth": 1,
    "borderColor": 'black', "width": "60%", "height": 30 },

});

const urltoreq = 'http://localhost:4005/getQuestions';
class LoginInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    // this.handletextchange = this.handletextchange.bind(this);
  }
    updatetextchange = (value) => {
      const textnew = value;
      // alert(textnew);
      this.setState({ text: textnew });
    }
  handlelogin = (evt) => {
    // const urlreq = urltoreq + this.state.text;
    axios.get(urltoreq)
      .then((response) => {
        console.log(response);
        // const obj = { questions: response.data, uname: this.state.text };
        const ar = [response.data, this.state.text];
        this.props.getQuestions(ar);
      })
      .catch((error) => {
        console.log(error);
      });
    
  }
  render() {
    return (
      <View style={styles.LoginInput}>
        <Text style={styles.LoginText}>Login </Text>
        
        <Text> {"\n\n\n\n\n\n\n"}</Text>
        <Text style={styles.LoginLabel}>Username </Text>
          <TextInput style={styles.LoginInputArea} value={this.state.text} onChangeText={this.updatetextchange} />
          
          <Text> {"\n\n\n\n\n\n\n"}</Text>
          <Button style={styles.LoginButton} onPress={this.handlelogin} title="Login" /> 
       
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getQuestions: ques => dispatch(getQuestions(ques)),

});
LoginInput.defaultProps = {
};
LoginInput.propTypes = {
};
export default connect(null, mapDispatchToProps)(LoginInput);
