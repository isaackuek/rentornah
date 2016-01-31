import React from 'react';

import Reflux from 'reflux';
import Actions from '../actions/actions';
import GoogleMap from 'google-map-react';
import MapPoints from '../components/MapPoints';
import RaisedButton from 'material-ui/lib/raised-button';

import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import TextField from 'material-ui/lib/text-field';
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
export default class HotelMap extends React.Component {

  constructor(props){
      super(props);

      this.state = {
      		hotelSearchText:"",
      		hoveredPlace:"Clicked Activity: "
	  };
  }

  componentDidMount() {
      Actions.testAction();
  }

  submitHotel() {
  	Actions.submitHotel();
  }

  setHotel(i) {
  		Actions.setHotel(i);
  }

  hoverHotel(i) {
  		Actions.hoverHotel(i);
  }
  unhoverHotel(i) {
  		Actions.unhoverHotel(i);
  }
  searchHotelText(e) {
  		this.setState({
  			hotelSearchText: e.target.value
  		})
  }
  setHotelSearchText(text){
  	this.setState({
  			hotelSearchText: text
  		})
  }
  setHoveredPlace(place) {
	  	this.setState({
	  		hoveredPlace: "Clicked Activity: " + place
	  	})
  }
  render() {

  		if(this.props.data.step== 2){
  			return (
		    	<div style={{width:'100vw',height:'80vh'}}>
		            <div style={{width:'50%',height:'100%',display:'inline-block',overflow:'scroll'}}>
		                <TextField
					      hintText="Choose a Hotel you wish to stay at"
					      floatingLabelText="Hotel name"
					      onChange={this.searchHotelText.bind(this)}
					      value={this.state.hotelSearchText}
					    />
					    <span style={{marginLeft:'10px',color:'#008080',fontSize:'8px',width:'140px',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',display:'inline-block'}}>{this.state.hoveredPlace}</span>
		                <RaisedButton onMouseUp={this.submitHotel} label="Submit" secondary={true} style={{margin:'10'}} />

		                {this.props.data.nearByHotel.map(function(hotel,i) {
		           
		                		let style;
		                		if(hotel.selected){
		                			style={
		                				backgroundColor: '#0288D1',
		                				color:'white'
		                			}
		                		}else if(hotel.hovered) {
		                			style = {
		                				backgroundColor: '#ffffff'
		                			}
		                		}else{
		                			style = {
		                				backgroundColor: 'white'
		                			}
		                		}
		                		let show = true;
		                		if(this.state.hotelSearchText.length > 2) {
		                			if(hotel.Name.toLowerCase().indexOf(this.state.hotelSearchText.toLowerCase()) == -1){
		                				show = false;
		                			}
		                		}
		                		if(show){
		                			return (
			                            <div onClick={this.setHotel.bind(this,i)} onMouseEnter={this.hoverHotel.bind(this,i)} onMouseLeave={this.unhoverHotel.bind(this,i)} style={{margin:'5px'}}>
			                            	<Card style={style}>
			                            		<div style={{display: 'flex',alignItems:'center'}}>
				                        			<div style={{display:'inline-block', margin:'15px'}}>
				                            			<img src={hotel.ThumbnailUrl} />
				                            			{hotel.Price ? (<h5>{"$" + hotel.Price.TotalRate.Value}</h5>) : (<h5></h5>)}
				                            		</div>
				                                	<div style={{display:'inline-block', margin:'15px', width:'70%'}}>
				                                		<h4 onClick={this.setHotel.bind(this,i)} style={hotel.selected ? {color: 'white'} : {color: 'black'}}>{hotel.Name}</h4>
				                                		<div>
				                                			{hotel.Description}
				                                		</div>
				                                	</div>
			                                	</div>          
			                            	</Card>
			                            </div>
			                        );
		                		}
		                        
		                      
		                    },this)}
		            </div>
		            <div style={{width:'50%',height:'100%',display:'inline-block'}}>
		                <GoogleMap 
		                	hoverDistance={40}
		                	center={this.props.data.selectedDestination ? [parseFloat(this.props.data.selectedDestination.ll.lat),parseFloat(this.props.data.selectedDestination.ll.lng)]:[47.445340,-122.291810]} zoom={14}>
		                    {this.props.data.nearByHotel.map(function(hotel,i) {
		                        var lat = parseFloat(hotel.Location.GeoLocation.Latitude);
		                        var lng = parseFloat(hotel.Location.GeoLocation.Longitude);
		                        return (
		                            <MapPoints setHotel={this.setHotelSearchText.bind(this,hotel.Name)} lat={lat} lng={lng} type="hotel" name={hotel.Name} />
		                        );
		                      
		                    },this)}
		                    {this.props.data.selectedTodo.map(function(todo,i) {
		                        var lat = parseFloat(todo.latLng.split(",")[0]);
		                        var lng = parseFloat(todo.latLng.split(",")[1]);
		                        return (
		                            <MapPoints setHoveredPlace={this.setHoveredPlace.bind(this,todo.title)} lat={lat} lng={lng} name={todo.title} />
		                        );
		                      
		                    },this)}
		                </GoogleMap>
		                
		            </div>
		        </div>

		    );
  		}else{
  			return(
  				<div style={{width:'100%',height:'10vh', backgroundColor:'#03A9F4',paddingLeft:'20',color:'white'}}>
  					{this.props.data.selectedHotel ? (<p>{this.props.data.selectedHotel.Name}</p>) : (<div></div>)}
  				</div>
  			)
  		}
  		
  	
    
  }


}