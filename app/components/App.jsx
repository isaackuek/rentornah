import React from 'react';
import SearchBar from './SearchBar.jsx';
import ActivitiesList from './ActivitiesList.jsx';
import ComparisonContent from './ComparisonContent.jsx';
import HotelMap from './HotelMap.jsx';

import Colors from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyTheme from '../style';
import Store from '../stores/store';

const muiTheme = getMuiTheme({
  primary1Color: Colors.deepOrange500,
  accent1Color: Colors.indigoA100,
});

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      muiTheme: ThemeManager.getMuiTheme(MyTheme),
      data: Store.data
    }
    this.unsubscribe = Store.listen(this.onStatusChange.bind(this));
  }


  componentWillMount() {
    let newMuiTheme = this.state.muiTheme;
    this.setState({
      muiTheme: muiTheme
    });
  }
  onStatusChange (data) {
    this.setState({
      data: data
    })
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  render() {
    return (
      <div className="mdl-layout">
        <div className="mdl-grid section--center" style={{padding:'0 !important',width:'100%'}}>
          <SearchBar data={this.state.data}/>
          <ActivitiesList data={this.state.data}/>
          <HotelMap data={this.state.data}/>
          <ComparisonContent data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default themeDecorator(muiTheme)(App);
