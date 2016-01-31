import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import AutoComplete from 'material-ui/lib/auto-complete';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import Actions from '../actions/actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class Fade extends ReactCSSTransitionGroup{}
Fade.defaultProps= {
  component: 'div',
  transitionName: 'example',
  transitionAppear: true,
  transitionAppearTimeout: 2000,
  transitionEnterTimeout: 2000,
  transitionLeaveTimeout: 1000,
};

let today = new Date(moment().toDate());
let todayPlusSeven = new Date(moment().add(7, 'days').toDate());

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: today,
      endDate: todayPlusSeven,
      autoOk: true,
      destinationText:""
    };

  }

  setAndSuggestDestination(e) {
      if(e.target.value.length > 2) {
          Actions.findSuggestDestination(e.target.value);
      }else if(e.target.value.length == 0) {
          Actions.removeSuggestDestination();
      }
      this.setState({
        destinationText: e.target.value
      })
  }

  submitDestination(suggestion) {
      Actions.submitDestination(suggestion);
      this.setState({
          destinationText: suggestion.s
      })
  }

  hoverDestination(i) {
      Actions.hoverDestination(i);
  }

  setStartDate(a,date) {
      Actions.setStartDate(date.getUTCFullYear()+'-'+('0' + (date.getMonth()+1)).slice(-2) + '-'+('0' + date.getDate()).slice(-2));
  }
  setEndDate(a,date) {
    console.log(date)
      Actions.setEndDate(date.getUTCFullYear()+'-'+('0' + (date.getMonth()+1)).slice(-2)+ '-'+('0' + date.getDate()).slice(-2));
  }
  submitStartEndDate() {
      Actions.submitStartEndDate();

  }
  toStep(){
    Actions.toStep(0);
  }

  render() {
    const style = {
      center: {
        height: '100vh',
        margin: '0',
        textAlign: 'center',
        backgroundImage: 'url("http://i.imgur.com/27mgVZn.jpg")'
      },
      input: {
        width: '400',
        textAlign: 'center',
        outline:'none',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        position: 'absolute'
      },
      date: {
        display: 'inline-block',
        margin: '10',
        marginTop: 16,
        backgroundColor: '#fff',
        padding: 6,
        paddingRight: 16,
        paddingLeft: 16,
      },
      dateTextField: {
        fontSize: 30,
        color: "#fff !important",
        textAlign: 'center'
      },
      button: {
        display: 'block',
        width: 100,
        margin: '0 auto',
        marginTop: 16,
      },
      suggestion: {
        backgroundColor:'white',
        position:'absolute',
        width:'400',
        height:'100',
        zIndex:1000,
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        top: 80,
        opacity:0.9,
        overflow:'scroll'
      }
    };

    const listOfCities = [
      'Seattle',
      'San Diego',
      'San Jose',
      'Bellevue',
      'San Francisco',
      'Austin',
      'Ohio',
    ];

    if(this.props.data.step == 0){


    return (
      <div className="mdl-cell mdl-cell--12-col" style={style.center}>
      <Fade>
        <div style={{marginTop:200,position:'relative'}}>
          <input
            value={this.state.destinationText}
            type="text"
            placeholder="Where do you want to go?"
            style={style.input}
            onChange={this.setAndSuggestDestination.bind(this)}
            />
            {(this.props.data.destinationSuggestion.length > 0) ? (

                <div style={style.suggestion}>
                    {this.props.data.destinationSuggestion.map(function(suggestion,i) {
                          return (
                            <p key={i} onMouseEnter={this.hoverDestination.bind(this,i)} onMouseLeave={this.hoverDestination.bind(this,i)} style={suggestion.hover ? {color:'#008080',margin:10, fontSize:16,cursor:'pointer',borderBottom:'1px solid #008080',padding:9} : {padding:9,color:'black',margin:10, fontSize:16,cursor:'pointer',borderBottom:'1px solid black'}} key={suggestion.i} onClick={this.submitDestination.bind(this,suggestion)}>{suggestion.s}</p>
                          );
                    },this)}
                </div>

              ) : (<span></span>)

            }
            <div style={{position:'absolute',width:'600',margin:'auto',left:0,right:0,top:100}}>
              <DatePicker style={style.date}
                  textFieldStyle={style.dateTextField}
                  autoOk={this.state.autoOk}
                  hintText="From"
                  minDate={this.state.startDate}
                  onChange={this.setStartDate}
                />
              <DatePicker style={style.date}
                  textFieldStyle={style.dateTextField}
                  autoOk={this.state.autoOk}
                  hintText="To"
                  minDate={this.state.startDate}
                  onChange={this.setEndDate}
                />

              <RaisedButton label="Submit" secondary={true} style={style.button} onClick={this.submitStartEndDate}/>
              </div>
        </div>
        </Fade>

      </div>
    );
    }else{
      const style = {
        searchNavBar: {
          width:'100%',
          height:'10vh',
          backgroundColor:'#0288D1',
        }
      }
      return(
          <div style={style.searchNavBar}>
            {this.props.data.selectedDestination ? (
                <div
                  className="searchNavBar"
                  onClick={this.toStep}
                  style={{
                    cursor:'pointer',
                    color:'white',
                    fontSize:'20px',
                   }}
                   >
                    <p className="bar-back">1</p>
                    <div className="searchNavBar--location">
                      <p className="bar-subtitle">LOCATION</p> {this.props.data.selectedDestination.s}
                    </div>
                    <div className="searchNavBar--date">
                      <p className="bar-subtitle">FROM</p>
                      {this.props.data.startDate} to {this.props.data.endDate}
                    </div>
                </div>
              ) : (
                <div>
                </div>
              )
            }
          </div>
      )
    }
  }


}
