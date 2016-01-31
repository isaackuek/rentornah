import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

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
  center: {
    margin: '0 auto',
    textAlign: 'center',
    height:'70vh'
  },
  card: {
    display: 'inline-block',
    width: 300,
    margin: 20,

  },
};

export default class ComparisonContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      open: false,
      dialogueType:''
    }
  }
  handleOpen = (dialogueType) => {
    this.setState({
      open: true,
      dialogueType: dialogueType
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };
  setEmail(e){
      this.setState({
        email:e.target.value
      })
  }
  removeEmail(){
    var self = this
    setTimeout(function(){ 
      alert("Email Sent to " + self.state.email + "!"); 
      self.setState({
        email:''
      })
    }, 1500);
    
  }
  openExpedia(){
    window.open("http://www.expedia.com");
  }
  render() {
    const actions = [
    <FlatButton
        label="Yes"
        secondary={true}
        onTouchTap={this.handleClose}
      />,

      <FlatButton
        label="No"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    if(this.props.data.step == 3) {
        return (
          <div style={styles.center}>
          <Fade>
            <Card style={styles.card}>
              <a href="/" className="bus">
              </a>
              <CardTitle styles={styles.center} title="Bus" subtitle="Card subtitle" />
              <CardText>

                {this.props.data.farthestBus ? (
                    <div style={{height:'250'}}>
                        <h5> To the farthest location from your hotel to: </h5>
                        <h4>{this.props.data.farthestBus.place.title}</h4>
                        <h5> Takes:</h5>
                        <h4>{this.props.data.farthestBus.bus.routes[0].legs[0].duration.text}</h4> 
                    </div>
                ):(
                    <div>
                        Fetching Information...
                    </div>
                )}
                
              </CardText>
              <RaisedButton label="Details" onTouchTap={this.handleOpen.bind(this,"bus")} style={{marginBottom:'50'}}/>

              
            </Card>
            <Card style={styles.card}>
              <a href="/" className="uber">
              </a>
              <CardTitle styles={styles.center} title="Uber" subtitle="Card subtitle" />
              <CardText>
                {this.props.data.farthestUber ? (
                    <div style={{height:'250'}}>
                        <h5> To the farthest location from your hotel to: </h5>
                        <h4> {this.props.data.farthestUber.place.title}</h4>
                        <h5> Costs:</h5>
                        <h4> ${this.props.data.farthestUber.uber.prices[0].high_estimate}</h4> 
                    </div>
                ):(
                    <div>
                        Fetching Information...
                    </div>
                )}
                
              </CardText>
              <RaisedButton label="Details" onTouchTap={this.handleOpen.bind(this,"uber")} style={{marginBottom:'50'}}/>

            </Card>
            <Card style={styles.card}>
              <a href="/" className="car">
              </a>
              <CardTitle styles={styles.center} title="Car" subtitle="Card subtitle" />
              <CardText>
                  {this.props.data.cheapestCarRental ? (
                      <div style={{height:'250'}}>
                          <h5> Rent a Cheapest car at: </h5>
                          <h4> {this.props.data.selectedDestination.s}</h4>
                          <h5> Costs:</h5>
                          <h4>${parseInt(parseInt(this.props.data.cheapestCarRental.Price.TotalRate.Value)/Math.round(Math.abs((new Date(this.props.data.startDate).getTime() - new Date(this.props.data.endDate).getTime())/(24*60*60*1000))))} a day</h4> 
                      </div>
                  ):(
                      <div>
                          Fetching Information...
                      </div>
                  )}
              </CardText>
              <RaisedButton label="Book On Expedia!" onMouseUp={this.openExpedia} style={{marginBottom:'50'}}/>
              
            </Card>
            <div>
                <TextField
                  hintText="Type in your friends email"
                  floatingLabelText="Mail this information to them!"
                  value={this.state.email}
                  onChange={this.setEmail.bind(this)}
                />
                <RaisedButton onMouseUp={this.removeEmail.bind(this)} label="Send" secondary={true} />

            </div>
            <Dialog
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
              {(this.state.dialogueType == "uber") ? (
                  <div>
                      {this.props.data.selectedTodo.map(function(todo,i) {
                          if(todo.uberPrice){
                              return (
                                  <div> 
                                        Uber from {this.props.data.selectedHotel.Name} to {todo.title} costs {todo.uberPrice.prices[0].estimate}
                                  </div>
                              );
                          }else{
                            return(
                              <div></div>)
                          }
                          
                        },this)}                      
                  </div>
              ) : (
                  <div>
                      {this.props.data.selectedTodo.map(function(todo,i) {
                          if(todo.busRoutes){
                              return (
                              <div> 
                                    Bus from {this.props.data.selectedHotel.Name} to {todo.title} takes {todo.busRoutes.routes[0].legs[0].duration.text}
                              </div>
                          );
                          }else{
                            return(<div></div>);
                          }
                          
                        },this)}
                  </div>
              )}
               
              </Dialog>
              
              
            
            </Fade>
          </div>
        );
    }else{
        return (
            <div></div>
        )
    }
    
  }

};
