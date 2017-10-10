import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class EventCard extends Component {

  state = {
    expanded: false,
  }

  componentDidMount() {
    if (!this.props.expanded) return;
    else this.setState({
      expanded: true,
    })
  }

  handleExpandChange = expanded => this.setState({expanded: expanded});

  render() {
    return (
      <Card className="EventCard" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title="Event title"
        />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin.
        </CardText>
      </Card>
    );
  }
}

export default EventCard;
