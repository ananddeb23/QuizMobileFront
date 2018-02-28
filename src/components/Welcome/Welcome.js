import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
//import './Welcome.css';


const styles = StyleSheet.create({

 Welcome:
 {
   "textAlign": "center", "backgroundColor": "#6BE5F0", "flex": 0,
  "justifyContent": "center", 
 "alignItems": "center", "paddingTop": "10%"},
 WelcomeBlack: { "fontSize": 40, "color": "black" },
 WelcomeWhite: { "fontSize": 40, "color": "white" },


});
class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.Welcome} >
        <Text style={styles.WelcomeBlack}>Welcome  </Text>
        <Text style={styles.WelcomeBlack}>to </Text>
        <Text style={styles.WelcomeWhite}>Quizzy! </Text>

      </View>
    );
  }
}
Welcome.defaultProps = {
};
Welcome.propTypes = {
};
export default Welcome;
