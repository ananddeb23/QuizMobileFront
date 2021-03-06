import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
//import './Welcome.css';


const styles = StyleSheet.create({

 Welcome:
 {
    "backgroundColor": "#6BE5F0", "flex": 1,
  "justifyContent": "center", 
 "alignItems": "center", "paddingTop": "10%"},
 WelcomeBlack: { "fontSize": 40, "color": "black",  fontWeight: "800", },
 WelcomeWhite: { "fontSize": 60, "color": "white", fontWeight: "800", },


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
