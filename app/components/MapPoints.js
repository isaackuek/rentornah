var React = require('react');
import Actions from '../actions/actions';

var MapPoints = React.createClass({
    displayName: 'MapPoints',
    // componentWillReceiveProps() {
    //     if(this.props.$hover && type=="hotel"){
    //         this.props.setHotel();
    //     }
    // },
    click(){
        if(this.props.type == "hotel"){
        this.props.setHotel();

        }else{
        this.props.setHoveredPlace();

        }

    },
    render() {
        
        var style = {
            position: 'absolute',
            width: 20,
            height: 20,
            left: -20 / 2,
            top: -20 / 2,
            border: '1px solid green',
            backgroundColor: 'white',
            textAlign: 'center',
            color: '#3f51b5',
            fontSize: 12,
            fontWeight: 'bold',
            padding: 4,
            cursor: 'pointer'
        }

        return (
            <div onClick={this.click}>
                {(this.props.type === "hotel") ? (
                    <img style={this.props.$hover ? {width:'35px'} : {width:'30px'}} src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png"/>
                ):(

                    <img style={this.props.$hover ? {width:'35px'} : {width:'30px'}} src="https://cdn4.iconfinder.com/data/icons/flat-icon-set/2133/flat_icons-graficheria.it-13.png"/>
                )}
            </div>
        );
    }
});

export default MapPoints;