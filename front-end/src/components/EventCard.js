import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardMedia, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class EventCard extends Component {

  state = {
    expanded: false,
  }

  componentDidMount() {
    if (!this.props.expanded) return;
    else this.setState({expanded: true});
  }

  handleExpandChange = expanded => this.setState({expanded: expanded});

  renderAttachments = () => {
    const style = {
      button: {
        backgroundColor: '#d3d3d3',
      },
      text: {
        paddingBottom: 0,
      }
    }
    if (!this.props.data.attachments) return null;
    const { attachments } = this.props.data;
    return attachments.map((attachment, i) => {
      console.log(attachment);
      if (attachment.type === 'text') return <CardText style={style.text} key={i} expandable={true}>{attachment.text}</CardText>
      if (attachment.type === 'img') return (
        <CardMedia key={i} expandable={true}>
          <img src={attachment.imageURL} alt={i}/>
        </CardMedia>
      )
      if (attachment.type === 'link') return (
        <CardActions key={i} expandable={true}>
          <FlatButton href={attachment.link} style={style.button} label="Learn More"/>
        </CardActions>
      )
      else return null;
    });
  }

  render() {
    const { title } = this.props.data;
    return (
      <Card className="EventCard" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={title}
        />
        {this.renderAttachments()}
      </Card>
    );
  }
}

export default EventCard;
