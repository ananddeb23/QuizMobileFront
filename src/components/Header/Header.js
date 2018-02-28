import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  Header: {
    "backgroundColor": "black", "color": "white", "display": "flex",
     "flexDirection": "row", "justifyContent": "center", 
     "alignItems": "stretch", "paddingLeft": 30, 
     "paddingRight": 80 },
 
HeaderTitle :
  { "fontSize": 45},
});
class Header extends React.Component {
  render() {
    return (
      <View style={styles.Header}>
        <Text ><Text style={styles.HeaderTitle}>Quizzy </Text>

        </Text>
        <Text ><Text style={styles.HeaderTitle}>  {this.props.uname !== '' ? `Hello  ${this.props.uname}` : ''} </Text>

        </Text>

      </View>);
  }
}
Header.defaultProps = {
};
Header.propTypes = {
};
const mapStateToProps = state => ({

  uname: state.quiz.uname,

});
export default connect(mapStateToProps, null)(Header);
