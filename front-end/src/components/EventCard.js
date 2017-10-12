import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';

class EventCard extends Component {

  state = {
    expanded: false,
  }

  componentDidMount() {
    if (!this.props.expanded) return;
    else this.setState({expanded: true});
  }

  handleExpandChange = expanded => this.setState({expanded: expanded});

  renderLinks = (attachment, i) => {
    const children = (
      <div className="LinkChildren">
        <a href={attachment.link}>{attachment.title}</a>
        <img src={attachment.imageURL} alt={i}/>
      </div>
    );
    return <CardText className="Link" key={i} expandable={true} children={children}></CardText>;
  }

  renderAttachments = () => {
    const style = { maxWidth: '100%' };
    if (!this.props.data.attachments) return null;
    const { attachments } = this.props.data;
    return attachments.map((attachment, i) => {
      if (attachment.type === 'text') return <CardText style={style} key={i} expandable={true}>{attachment.text}</CardText>
      if (attachment.type === 'img') return (
        <CardMedia key={i} expandable={true}>
          <img src={attachment.imageURL} alt={i}/>
        </CardMedia>
      );
      if (attachment.type === 'link') return this.renderLinks(attachment, i);
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
