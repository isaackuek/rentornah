import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

export default class ActivitesList extends React.Component {
  render() {
    return (
      <Card>
        <CardMedia
          overlay={
            <CardTitle
              title="Space Needle"
              subtitle="Very touristy" />
          }
          >
          <img src="http://lorempixel.com/600/337/nature/" />
        </CardMedia>
      </Card>
    );
  }
}
