import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  View, Text,  StyleSheet, TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';
import { playAgain } from '../../redux/actions';
//import './ScoresContainer.css';

const styles = StyleSheet.create({

  PointOuter:{
    "display": "flex", "flexDirection": "row", 
    "justifyContent": "space-around", 
    "padding": 1, "backgroundColor": "#6BE5F0", "width": "90%", "height": 30, "margin": 10, "borderColor" : "black",
  "borderWidth": 1 },
  
  SpecialOuter:{
    "display": "flex", "flexDirection": "row",
    "justifyContent": "space-around",
    "padding": 1, "backgroundColor": "greenyellow", "width": "90%", "height": 30, "margin": 10, "borderColor" : "black",
  "borderWidth": 1
  },
  
  PointIndex:
  {
    "marginLeft": 1, "marginTop": 5
  },
  PointUname:
  {
"color": "white", "flexGrow": 4, 
"marginLeft": 1, "marginTop": 5
  },
  PointScore:
  { "color": "white",
   "marginRight": 1, "marginTop": 5 },
  ScoresContainer:
  { "display": "flex", "flexDirection": "column", "flexGrow": 8, "backgroundColor": "white", "justifyContent": "space-around", "alignItems": "stretch" },
  ScoresHeader:
  {
    "display": "flex", "flexDirection": "column",
  },
  Scorevalue:
  {
    "marginLeft": 30, "display": "flex", "flexDirection": "column", "alignItems": "center",  "marginTop" : "30%",
     },
  Orangetitle:
  { 'color': 'orange', 'fontWeight': "900", 'fontSize': 25 },
  Bigscore:
  {
    "fontSize": 60, fontWeight: "200" },
  SmallScore:
  {
    "fontSize": 40, fontWeight: "500"  },
  ScoresTitle:
  { "alignItems": "center",
    "textAlign": "center" ,'fontSize': 30, 'fontWeight': "700",  'marginTop': "35%"  },
  Scores:
  { "overflow": "scroll", "justifyContent": "center", "display": "flex", "flexDirection": "column", 
  "alignItems": "center", "marginTop" : "40%"},
  BtnScoreContain: { "display": "flex", "height": 300, "justifyContent": "center",
   "alignItems": "center" },
  Playagainbtn: { "borderRadius": 10,
    "borderColor": "black", "borderWidth": 2, "width": "45%", "height": 35,  "display": "flex", "flexDirection": "column",
    "alignItems": "center" , paddingTop: "2%" },
  PlayerScoreContainer: {
    "justifyContent": "center",
    "alignItems": "center",
    "margin" : "1%",
  },
  WelcomeUser :{
    fontSize: 20, fontWeight: "700", color: 'black', marginTop: "25%", marginBottom: "5%", marginLeft: 10, "justifyContent": "flex-start",
    "alignItems": "flex-start",
  }

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
        <View style={classval} key={i}>
          <View ><Text style={styles.PointIndex}>{i + 1}.</Text></View>
          <View ><Text style={styles.PointUname}>{this.state.scoreRec[i].uname}</Text></View>
          <View ><Text style={styles.PointScore}>{this.state.scoreRec[i].score}</Text></View>
        </View>);
      displayscores.push(val);
    }
    return (
      <View style={styles.ScoresContainer}>
        <Text style={styles.WelcomeUser}> Hello{this.props.uname}</Text>
        <View style={styles.ScoresHeader}>
          <View style={styles.Scorevalue}>
            <View ><Text style={styles.Orangetitle}>Your Score</Text></View>
            <View style={styles.PlayerScoreContainer}><Text style={styles.Bigscore}>{this.props.score}<Text style={styles.SmallScore}>/{this.props.questions.length}</Text></Text></View>
          </View>
        </View>
        <View><Text style={styles.ScoresTitle}>Leaderboard</Text></View>
        <View style={styles.Scores}>{displayscores}</View>
         <View style={styles.BtnScoreContain}><TouchableOpacity style={styles.Playagainbtn} onPress={this.handlePlayAgain}><Text style={ {fontWeight: "800"} }>Play Again</Text></TouchableOpacity>
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

