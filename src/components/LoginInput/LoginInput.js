import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { getQuestions } from '../../redux/actions';
import PropTypes from 'prop-types';
//import './LoginInput.css';

const styles = StyleSheet.create({

  LoginInput:
  { "backgroundColor": "white", 
  "alignItems": "center",
   "padding": 30, "flex": 1, "justifyContent": "center" },
  LoginText: { "fontSize": 22, fontWeight: "700", marginLeft: "-72%",  marginTop: "-19%"},
  LoginLabel: { "fontSize": 20, fontWeight: "600",  marginLeft: "-70%",  marginBottom: "1%"},
  LoginInputArea: {
    "width": "100%", "borderWidth": 2,
    "borderColor": 'black', "height": 30 },
  LoginButton: {
    "borderRadius": 10,
    "borderColor": "black", "borderWidth": 2, "width": "65%", "height": 35,  "display": "flex", "flexDirection": "column",
    "alignItems": "center", paddingTop: "2%" },

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
    if(this.state.text.length !==0  && this.state.text.length <= 15 ){
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
    
  }
  render() {
    return (
      <View style={styles.LoginInput}>
        <Text style={styles.LoginText}>Login </Text>
        
        <Text> {"\n\n\n\n"}</Text>
        <Text style={styles.LoginLabel}>Username </Text>
        <TextInput style={styles.LoginInputArea} value={this.state.text} maxLength={15} minLength={1} onChangeText={this.updatetextchange} />
          
          <Text> {"\n\n"}</Text>
          <TouchableOpacity style={styles.LoginButton} onPress={this.handlelogin}>
           <Text style={{ fontWeight: "800" }}> Login </Text></TouchableOpacity >

         
       
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
