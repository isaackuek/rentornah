import React from 'react';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';

const styles = {
  gridList: {
    width: 860,
    height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const tiles3 = [
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
];

export default class ActivityGrid extends React.Component {

  render() {
    return (
      <GridList
        cellHeight={200}
        style={styles.gridList}
      >
        {this.tiles3.map(tile => (
          <GridTile
            key={tile.img}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
            actionIcon={<IconButton>Click</IconButton>}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    );
  }
}
