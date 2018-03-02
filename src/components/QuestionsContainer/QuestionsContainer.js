import React from 'react';
import { connect } from 'react-redux';
//import RadioButton from 'radio-button-react-native';
import {
  View, Button, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { getScore } from '../../redux/actions';
import axios from 'axios';
import PropTypes from 'prop-types';



 //Make the button visible nlw that you know when 12 are done and calculate score
function RadioButton(props) {
  return (
    <TouchableOpacity 
      onPress={props.onPress } style={[{
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#000',
      alignItems: 'center',

      justifyContent: 'center',
    }, props.style]} >
      
      {
        props.selected ?
          <View style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#000',
          }} />
          : null
      }
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({

  QuestionOuter: { "flex": 0,
  "height": 98  },
  QuestionHeader: {
    
  },
  QuestionContent: 
 {"backgroundColor": "#6BE5F0", 
     "width": "96%", "marginLeft": "2%", "marginRight": "2%" },
  
  QuestionOptions: {
    
  },
  QuestionsContainer:{
    "flex": 1, "backgroundColor": "white", 
    "justifyContent": "center", "alignItems": "stretch", "height": 1200,
    "overflow": "scroll", "width": "97%", "margin" : "2%", 
  },
  QuestionBox: {
     "borderColor": "black", "borderWidth": 1, "margin": "2%",
    
  },
  CalculateButtonHold: 
    {"marginTop": 10, "display": "flex",
     "justifyContent": "center", "alignItems": "center" },
  
  CalculateButton: 
    {"borderRadius": 5,
      "borderWidth": 1,
      "borderColor": 'black', "width": "20%", "height": 30 },
  WelcomeUser: {
    fontSize: 20, fontWeight: "500", color: 'black',  marginTop: "2%" ,marginBottom: "1%", marginLeft: 10, "justifyContent": "flex-start",
    "alignItems": "flex-start",
  }
 

});

const urltoreq = 'http://localhost:4005/updateResponse/';
const getprev = 'http://localhost:4005/getPreviousReponse/';
const calcscore = 'http://localhost:4005/calculateScore/';
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
class QuestionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderval: [],
      countSelected: 0,
      questionidstore: [],
      showbutton: true,
      reload: 'vbn',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleCalculate= (evt) => {
    // alert('here me');
    // const textnew = evt.target.value;
    // const textid = evt.target.name;
    const requrl = `${calcscore + this.props.uname}`;
    axios.get(requrl)
      .then((response) => {
        const res = [response.data, 'showscores'];
        this.props.getScore(res);
      }).catch((error) => {
        //console.log(error);
      });
  }
  handleChange = (qid, ans, val) =>  {
      val.selected = true;
      const requrl = `${urltoreq + this.props.uname}/${qid}/${ans}`;
      axios.get(requrl)
        .then((response) => {
          //console.log(response);
          let newunique = this.state.questionidstore;
          newunique.push(parseInt(textid));
          newunique = newunique.filter(onlyUnique);
          //console.log(newunique);
          if (newunique.length >= this.props.questions.length) {
            this.setState({ showbutton: false, reload: 'yes' });
          } else {
            this.setState({ questionidstore: newunique, reload: 'yes' });
          }
        //   const newcount = this.state.countSelected + 1;
        //   this.setState({ countSelected: newcount });
        }).catch((error) => {
          console.log(error);
        });
    }
    componentDidUpdate() {
      // alert(this.state.questionidstore.length);
      const requrl = getprev + this.props.uname;
      axios.get(requrl)
        .then((response) => {
          //console.log(response.data);
          const idlist = [];
          const renderquest = [];
          for (let i = 0; i < this.props.questions.length; i++) {
            const checkbox = [];
            let nomatch = 1;
            const optionsarr = this.props.questions[i].options;
            for (let k = 0; k < response.data.length; k++) {
              idlist.push(response.data[k].questionId);
              if (response.data[k].questionId === this.props.questions[i].questionId) {
                nomatch = 0;
                for (let j = 0; j < optionsarr.length; j++) {
                  if (optionsarr[j] === response.data[k].answer) {
                    // alert(optionsarr[j]);
                    const valradio = <View key={j}><RadioButton selected={true}  name={this.props.questions[i].questionId} onPress={() => this.handleChange(this.props.questions[i].questionId, optionsarr[j], this)} /><Text>{optionsarr[j]} {"\n"}</Text></View>;
                    checkbox.push(valradio);
                  } else {
                    const valradio = <View key={j}><RadioButton selected={false}  name={this.props.questions[i].questionId} onPress={() => this.handleChange(this.props.questions[i].questionId, optionsarr[j], this)} /><Text>{optionsarr[j]}{"\n"}</Text></View>;
                    checkbox.push(valradio);
                  }
                }
              }
            }
            if (nomatch === 1) {
              for (let j = 0; j < optionsarr.length; j++) {
                const valradio = <View key={j}><RadioButton selected={false}  name={this.props.questions[i].questionId} onPress={() => this.handleChange(this.props.questions[i].questionId, optionsarr[j], this)} /><Text>{optionsarr[j]}{"\n"}</Text></View>;
                checkbox.push(valradio);
              }
            }


            // console.log(optionsarr);

            const val = (
              <View style={styles.QuestionBox} key={i}>
                <View style={styles.QuestionHeader}><Text style={{ fontSize: 16, fontWeight: "700", marginLeft: "3%" }}> Question {`  ${i + 1}`}</Text></View>
                <View style={styles.QuestionContent}><Text>{this.props.questions[i].question}</Text></View>
                <View style={styles.QuestionOptions}>{checkbox}</View>
              </View>);
            renderquest.push(val);
          }
          const unique = idlist.filter(onlyUnique);
          let showbtn = true;
          if (response.data.length >= this.props.questions.length) {
            showbtn = false;
          }
          this.setState({
            renderval: renderquest, countSelected: response.data.length, questionidstore: unique, showbutton: showbtn,
          });
        }).catch((error) => {
          console.log(error);
        });
    }
    componentDidMount() {
      // console.log('hi');


      const requrl = getprev + this.props.uname;
      axios.get(requrl)
        .then((response) => {
          //console.log(response.data);
          const idlist = [];
          const renderquest = [];
          for (let i = 0; i < this.props.questions.length; i++) {
            const checkbox = [];
            // let nomatch = 1;
            // const optionsarr = this.props.questions[i].options;
            // for (let k = 0; k < response.data.length; k++) {
            //   idlist.push(response.data[k].questionId);
            //   if (response.data[k].questionId === this.props.questions[i].questionId) {
            //     nomatch = 0;
            //     for (let j = 0; j < optionsarr.length; j++) {
            //       if (optionsarr[j] === response.data[k].answer) {
            //         // alert(optionsarr[j]);
            //         const valradio = <View><RadioButton selected={true} name={this.props.questions[i].questionId} onPress={() => this.handleChange(this.props.questions[i].questionId, optionsarr[j], this)}  /><Text> {optionsarr[j]} {"\n"}</Text></View>;
            //         checkbox.push(valradio);
            //       } else {
            //         const valradio = <View><RadioButton selected={false} name={this.props.questions[i].questionId} onPress={() =>this.handleChange(this.props.questions[i].questionId, optionsarr[j], this)} /><Text> {optionsarr[j]}{"\n"}</Text> </View>;
            //         checkbox.push(valradio);
            //       }
            //     }
            //   }
            // }
            // if (nomatch === 1) {
            //   for (let j = 0; j < optionsarr.length; j++) {
            //     const valradio = <View><RadioButton selected={false} name={this.props.questions[i].questionId} onPress={() =>this.handleChange(this.props.questions[i].questionId, optionsarr[j], this)} /><Text>{optionsarr[j]}{"\n"}</Text></View>;
            //     checkbox.push(valradio);
            //   }
            // }


            // console.log(optionsarr);

            const val = (
              <View style={styles.QuestionBox} key={i}>
                <View style={styles.QuestionHeader} ><Text style={{ fontSize: 16, fontWeight: "700", marginLeft: "3%" }}> Question {`  ${i + 1}`}</Text></View>
                <View style={styles.QuestionContent}><Text> {this.props.questions[i].question}</Text></View>

                <View style={styles.QuestionOptions}>{checkbox}</View>
              </View>);
            renderquest.push(val);
          }
          const unique = idlist.filter(onlyUnique);
          let showbtn = true;
          if (response.data.length >= this.props.questions.length) {
            showbtn = false;
          }
          this.setState({
            renderval: renderquest, countSelected: response.data.length, questionidstore: unique, showbutton: showbtn,
          });
        }).catch((error) => {
          console.log(error);
        });
    }
    render() {
      return (<View style={styles.QuestionsContainer}> 
        <Text style={styles.WelcomeUser}> Hello {this.props.uname} </Text>
      
      <ScrollView>{this.state.renderval}</ScrollView>
        <View style={styles.CalculateButtonHold}><Button style={styles.CalculateButton} disabled={this.state.showbutton} onPress={this.handleCalculate} title="Calculate"/></View>
      </View>);
    }
}
QuestionsContainer.defaultProps = {
};
QuestionsContainer.propTypes = {
};
const mapStateToProps = state => ({
  questions: state.quiz.questions,
  uname: state.quiz.uname,

});
const mapDispatchToProps = dispatch => ({
  getScore: score => dispatch(getScore(score)),

});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsContainer);
