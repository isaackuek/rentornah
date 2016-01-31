import React from 'react';

import ActivityGrid from './ActivityGrid';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Actions from '../actions/actions';
import RaisedButton from 'material-ui/lib/raised-button';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
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
const styles = {
  root: {
    margin: '0 auto',
    justifyContent: 'space-around',
    width:'100%'
  },

};

export default class ActivitesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        nextButtonHovered: false
    };
  }
  toStep(){
    Actions.toStep(1);
  }
  hoverNextButton(){
      this.setState({
        nextButtonHovered: !this.state.nextButtonHovered
      })
  }
  submitTodo(){
      Actions.submitTodo();
  }

  render() {

    if(this.props.data.step == 1){
        return (
          <div style={styles.root}>
            <Fade>

            <RaisedButton onMouseUp={this.submitTodo} label="Submit" secondary={true} style={{position:'absolute',right:'5vw',zIndex:'100',marginTop:'75vh'}} />

            <Tabs>
              <Tab label="Food" >
                <ActivityGrid gridData={this.props.data.thingsTodoFood} />
              </Tab>
              <Tab label="Sightseeing">
                <ActivityGrid gridData={this.props.data.thingsTodoSightSeeing}/>
              </Tab>
              <Tab label="Nightlife">
                <ActivityGrid gridData={this.props.data.thingsTodoNightLife}/>
              </Tab>
              <Tab label="All">
                <ActivityGrid gridData={this.props.data.thingsToDo}/>
              </Tab>
            </Tabs>
            </Fade>
          </div>
        );
    }else{
        return(
<<<<<<< Updated upstream
            <div
              className="activity"
              onClick={this.toStep}
              style={{cursor:'pointer',
                width:'100%',
                height:'10vh',
                backgroundColor:'#009688',

                color:'white'}}
                >
              <p className="bar-back">2</p>
              <div classname="activity--list">
                <p className="bar-subtitle">ACTIVITIES</p>
                  {this.props.data.selectedTodo.map(function(todo,i) {
                      return(
                          <span className="activity--items">{todo.title}</span>
                      )
                  },this)}

              </div>
=======
            <div onClick={this.toStep} style={{cursor:'pointer',width:'100%',height:'10vh', backgroundColor:'#009688',paddingLeft:'20',color:'white'}}>
              Selected Activities : 
              {this.props.data.selectedTodo.map(function(todo,i) {
                  return(
                      <span key={i}>  * {todo.title}  </span>
                  )
              },this)}
>>>>>>> Stashed changes
            </div>
        )
    }


  }
}
