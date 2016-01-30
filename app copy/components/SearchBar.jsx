import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'react-toolbox/lib/date_picker';

const datetime = new Date(2015, 10, 16);
const min_datetime = new Date(new Date(datetime).setDate(8));
datetime.setHours(17);
datetime.setMinutes(28);

export default class SearchBar extends React.Component {
  state = {date2: datetime};

  handleChange = (item, value) => {
    this.setState({...this.state, [item]: value});
  };

  render() {
    const style = {
      margin: 12,
    };

    return (
      <div className="mdl-cell mdl-cell--12-col section--center">
        <input className="searchbar-input"
          type="text"
          placeholder="Where do you want to go?"
        />
        <DatePicker
          label="From"
          onChange={this.handleChange.bind(this, 'date2')}
          value={this.state.date2}
        />
        <input className="searchbar-input"
          type="text"
          placeholder="Start Day"
        />
        <input className="searchbar-input"
          type="text"
          placeholder="End Day"
        />

      <RaisedButton label="Search" primary={true} style={style} />

      </div>
    );
  }


}
