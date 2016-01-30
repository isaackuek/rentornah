import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import AutoComplete from 'material-ui/lib/auto-complete';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import moment from 'moment';


const datetime = new Date(2015, 10, 16);

let today = new Date(moment().toDate());
let todayPlusSeven = new Date(moment().add(7, 'days').toDate());
// const min_datetime = new Date(new Date(datetime).setDate(8));
// datetime.setHours(17);
// datetime.setMinutes(28);


export default class SearchBar extends React.Component {
  state = {
    startDate: today,
    endDate: todayPlusSeven
  };

  render() {
    const stylePaper = {
      padding: 100,
    };
    const style = {
      margin: 12,
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
      <div className="mdl-cell mdl-cell--12-col">
        <Paper zDepth={2} style={style} >
          <AutoComplete
            floatingLabelText="Where do you want to go?"
            filter={AutoComplete.noFilter}
            dataSource={listOfCities}
          />
          <DatePicker
            hintText="From"
            container="inline"
            defaultDate={this.state.startDate}
            minDate={this.state.startDate}
          />
          <DatePicker
            hintText="To"
            container="inline"
            defaultDate={this.state.endDate}
            minDate={this.state.startDate}
          />
          <RaisedButton label="Search" primary={true} style={style} />
        </Paper>
      </div>
    );
  }


}
