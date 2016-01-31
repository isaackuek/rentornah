import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import AutoComplete from 'material-ui/lib/auto-complete';
import moment from 'moment';
import ReactDOM from 'react-dom';

let today = new Date(moment().toDate());
let todayPlusSeven = new Date(moment().add(7, 'days').toDate());

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: today,
      endDate: todayPlusSeven,
      autoOk: true,
    };

  }

  render() {
    const style = {
      center: {
        margin: '0 auto',
        width: '80%',
        textAlign: 'center',
      },
      input: {
        marginTop: 300,
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
        marginBottom: 400,
      },
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


    return (
      <div className="mdl-cell mdl-cell--12-col" style={style.center}>
        <input
          type="text"
          placeholder="Where do you want to go?"
          style={style.input}
          />
        <DatePicker style={style.date}
            textFieldStyle={style.dateTextField}
            autoOk={this.state.autoOk}
            hintText="From"
            minDate={this.state.startDate}
          />
        <DatePicker style={style.date}
            textFieldStyle={style.dateTextField}
            autoOk={this.state.autoOk}
            hintText="To"
            minDate={this.state.startDate}
          />
        <RaisedButton label="Search" primary={true} style={style.button} />
      </div>
    );
  }


}
