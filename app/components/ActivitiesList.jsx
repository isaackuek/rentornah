import React from 'react';

import ActivityGrid from './ActivityGrid';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 860,
    height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

export default class ActivitesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileData1: [
        {
          img: 'http://lorempixel.com/500/400/nature/',
          title: 'Breakfast',
          author: 'jill111',
        },
        {
          img: 'http://lorempixel.com/500/401/nature/',
          title: 'Tasty burger',
          author: 'pashminu',
        },
        {
          img: 'http://lorempixel.com/500/402/nature/',
          title: 'Camera',
          author: 'Danson67',
        },
      ],
      tileData2: [
        {
          img: 'http://lorempixel.com/500/404/nature/',
          title: 'Hats',
          author: 'Hans',
        },
        {
          img: 'http://lorempixel.com/500/405/nature/',
          title: 'Honey',
          author: 'fancycravel',
        },
        {
          img: 'http://lorempixel.com/500/406/nature/',
          title: 'Vegetables',
          author: 'jill111',
        },
        {
          img: 'http://lorempixel.com/500/407/nature/',
          title: 'Water plant',
          author: 'BkrmadtyaKarki',
        },
      ],
      tileData3: [
        {
          img: 'http://lorempixel.com/500/400/nature/',
          title: 'Breakfast',
          author: 'jill111',
        },
        {
          img: 'http://lorempixel.com/500/401/nature/',
          title: 'Tasty burger',
          author: 'pashminu',
        },
        {
          img: 'http://lorempixel.com/500/402/nature/',
          title: 'Camera',
          author: 'Danson67',
        },
        {
          img: 'http://lorempixel.com/500/403/nature/',
          title: 'Morning',
          author: 'fancycrave1',
        },
      ],
    };
  }

  render() {
    const tileData1 = this.state.tileData1;
    const tileData2 = this.state.tileData2;
    const tileData3 = this.state.tileData3;

    return (
      <div style={styles.root}>
        <Tabs>
          <Tab label="Food" >
            <ActivityGrid gridData={tileData1} />
          </Tab>
          <Tab label="Sightseeing">
            <ActivityGrid gridData={tileData2}/>
          </Tab>
          <Tab label="Nightlife">
            <ActivityGrid gridData={tileData3}/>
          </Tab>
          <Tab label="Shopping">
            <ActivityGrid gridData={tileData1}/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
