import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

const styles = {
  center: {
    margin: '0 auto',
    textAlign: 'center',
  },
  card: {
    display: 'inline-block',
    width: 300,
    margin: 2
  },
};

export default class ComparisonContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.center}>
        <Card style={styles.card}>
          <a href="/" className="bus">
          </a>
          <CardTitle styles={styles.center} title="Bus" subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <div className="mdl-card__actions">
            <CardTitle styles={styles.center} title="1 hour" />
          </div>
        </Card>
        <Card style={styles.card}>
          <a href="/" className="uber">
          </a>
          <CardTitle styles={styles.center} title="Uber" subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <div className="mdl-card__actions">
            <CardTitle styles={styles.center} title="$ 25" />
          </div>

        </Card>
        <Card style={styles.card}>
          <a href="/" className="car">
          </a>
          <CardTitle styles={styles.center} title="Car" subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <div className="mdl-card__actions">
            <CardTitle styles={styles.center} title="$ 30" />
          </div>
        </Card>
      </div>
    );
  }

};
