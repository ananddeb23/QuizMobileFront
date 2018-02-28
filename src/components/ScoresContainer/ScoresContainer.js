import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  View, Text, Button, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { playAgain } from '../../redux/actions';
//import './ScoresContainer.css';

const styles = StyleSheet.create({

  PointOuter:{
    "display": "flex", "flexDirection": "row", 
    "justifyContent": "space-around", 
    "padding": 2, "backgroundColor": "#6BE5F0", "width": "60%", "height": 30, "margin": 10 },
  
  SpecialOuter:{
    "display": "flex", "flexDirection": "row",
    "justifyContent": "space-around",
    "padding": 2, "backgroundColor": "greenyellow", "width": "60%", "height": 30, "margin": 10
  },
  
  PointIndex:
  {
    "marginLeft": 30, "marginTop": 8
  },
  PointUname:
  {
"color": "white", "flexGrow": 4, 
"marginLeft": 30, "marginTop": 8
  },
  PointScore:
  { "color": "white",
   "marginRight": 30, "marginTop": 8 },
  ScoresContainer:
  { "display": "flex", "flexDirection": "column", "flexGrow": 8, "backgroundColor": "white", "color": "black", "justifyContent": "space-around", "alignItems": "stretch", "overflow": "scroll" },
  ScoresHeader:
  {

  },
  Scorevalue:
  { "marginLeft": 30 },
  Orangetitle:
  { "color": "orange" },
  Bigscore:
  { "fontSize": 60 },
  SmallScore:
  { "fontSize": 40 },
  ScoresTitle:
  { "alignItems": "center",
   "textAlign": "center" },
  Scores:
  { "overflow": "scroll", "justifyContent": "center", "display": "flex", "flexDirection": "column", 
  "alignItems": "center" },
  BtnScoreContain: { "display": "flex", "height": 300, "justifyContent": "center",
   "alignItems": "center" },
  Playagainbtn: { "borderRadius": 5,
   "borderColor": "black", "borderWidth": 2, "width": "30%", "height": 30 },

});

const urlscores = 'http://localhost:4005/getScores';
class ScoresContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreRec: [],
    };
  }
  handlePlayAgain = (evt) => {
    this.props.playAgain();
  }
  componentDidMount() {
    axios.get(urlscores)
      .then((response) => {
        console.log(response);
        // const obj = { questions: response.data, uname: this.state.text };
        this.setState({ scoreRec: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const displayscores = [];

    for (let i = 0; i < this.state.scoreRec.length; i++) {
      let classval = styles.PointOuter;
      if (this.props.uname === this.state.scoreRec[i].uname) {
        classval = styles.SpecialOuter;
      }
      const val = (
        <View style={classval}>
          <View style={styles.PointIndex}><Text>{i + 1}. </Text></View>
          <View style={styles.PointUname}> <Text>{this.state.scoreRec[i].uname}</Text> </View>
            <View style={styles.PointScore}><Text> {this.state.scoreRec[i].score}</Text></View>
        </View>);
      displayscores.push(val);
    }
    return (
      <View style={styles.ScoresContainer}>
        <View style={styles.ScoresHeader}>
          <View style={styles.Scorevalue}>
            <View style={styles.Orangetitle}><Text> Your Score </Text></View>

            <View style={styles.Bigscore}><Text>{this.props.score}/</Text></View>
            <View style={styles.SmallScore}><Text>{this.props.questions.length}</Text></View>

          </View>

        </View>
        <View style={styles.ScoresTitle}> <Text>Leaderboard </Text></View>
        <View style={styles.Scores}><Text> {displayscores} </Text></View>
        <View style={styles.BtnScoreContain}><Button style={styles.Playagainbtn} onPress={this.handlePlayAgain} title="Play Again/" />
        </View>
      </View>);
  }
}
ScoresContainer.defaultProps = {
};
ScoresContainer.propTypes = {
};
const mapStateToProps = state => ({
  questions: state.quiz.questions,
  score: state.quiz.score,
  uname: state.quiz.uname,

});
const mapDispatchToProps = dispatch => ({
  playAgain: () => dispatch(playAgain()),

});
export default connect(mapStateToProps, mapDispatchToProps)(ScoresContainer);

