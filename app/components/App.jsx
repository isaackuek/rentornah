import React from 'react';
import SearchBar from './SearchBar.jsx';
import ActivitiesList from './ActivitiesList.jsx';
import ComparisonContent from './ComparisonContent.jsx';

import Colors from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyTheme from '../style';

const muiTheme = getMuiTheme({
  primary1Color: Colors.deepOrange500,
  accent1Color: Colors.indigoA100,
});

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      muiTheme: ThemeManager.getMuiTheme(MyTheme),
    }
  }


  componentWillMount() {
    let newMuiTheme = this.state.muiTheme;
    this.setState({
      muiTheme: muiTheme
    });
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
        <div className="mdl-grid section--center">
          <SearchBar />
          <ActivitiesList />
          <ComparisonContent />
        </div>
      </div>
    );
  }
}

export default themeDecorator(muiTheme)(App);
