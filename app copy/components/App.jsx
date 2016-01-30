import React from 'react';
import SearchBar from './SearchBar.jsx';
import ActivitiesList from './ActivitiesList.jsx';
import HotelMap from './HotelMap.jsx';
import ComparisonContent from './ComparisonContent.jsx';
import AppBar from 'material-ui/lib/app-bar';

import Colors from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';

const muiTheme = getMuiTheme({
  primary1Color: Colors.indigo500
});


const NavBarTop = () => (
  <AppBar
    title="Rentornah"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

export default NavBarTop;

class App extends React.Component {
  render() {
    return (
      <div className="mdl-grid">
        <NavBarTop />
        <SearchBar />
        <ActivitiesList />
        <HotelMap />
        <ComparisonContent />
      </div>
    );
  }
}

export default themeDecorator(muiTheme)(App);
