import React from 'react';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';

const styles = {
  gridList: {
    width: '100%',
    maxHeight: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

export default ({gridData}) => {
  return(
    <div className="mdl-cell mdl-cell--12-col">
      <GridList
        cellHeight={200}
        cols={4}
        style={styles.gridList}
      >
        {gridData.map(tile => (
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
    </div>
  );
}

// export default class ActivityGrid extends React.Component {
//
//   render() {
//     return (
//       <GridList
//         cellHeight={200}
//         style={styles.gridList}
//       >
//         {data.map(tile => (
//           <GridTile
//             key={tile.img}
//             title={tile.title}
//             subtitle={<span>by <b>{tile.author}</b></span>}
//             actionIcon={<IconButton>Click</IconButton>}
//           >
//             <img src={tile.img} />
//           </GridTile>
//         ))}
//       </GridList>
//     );
//   }
// }
