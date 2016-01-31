import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
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
  center: {
    margin: '0 auto',
    textAlign: 'center',
    height:'70vh'
  },
  card: {
    display: 'inline-block',
    width: 300,
    margin: 2
  },
};

export default class ComparisonContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                    <div style={{height:'300'}}>
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
              
            </Card>
            <Card style={styles.card}>
              <a href="/" className="uber">
              </a>
              <CardTitle styles={styles.center} title="Uber" subtitle="Card subtitle" />
              <CardText>
                {this.props.data.farthestUber ? (
                    <div style={{height:'300'}}>
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
            
            </Card>
            <Card style={styles.card}>
              <a href="/" className="car">
              </a>
              <CardTitle styles={styles.center} title="Car" subtitle="Card subtitle" />
              <CardText>
                  {this.props.data.cheapestCarRental ? (
                      <div style={{height:'300'}}>
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
          
            </Card>
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
