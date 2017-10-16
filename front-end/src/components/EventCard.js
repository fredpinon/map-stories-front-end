import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import TweetEmbed from 'react-tweet-embed';
import ReactPlayer from 'react-player';

class EventCard extends Component {

  state = {
    expanded: false,
    shadow: 1,
  }

  componentDidMount() {
    if (!this.props.expanded) return;
    else this.setState({expanded: true});
  }

  handleExpandChange = expanded => this.setState({expanded: expanded});
  onMouseOver = () => this.setState({ shadow: 3 });
  onMouseOut = () => this.setState({ shadow: 1 });

  renderLinks = (attachment, i) => {
    const children = (
      <div className="LinkChildren">
        <a href={attachment.link}>{attachment.title}</a>
        <img src={attachment.imageURL} alt={i}/>
      </div>
    );
    return <CardText className="Link" key={i} expandable={true} children={children}></CardText>;
  }

  renderVideos = (attachment, i) => {
    const children = <ReactPlayer className="Video" url={attachment.videoURL}/>;
    return <CardMedia key={i} expandable={true} children={children}></CardMedia>;
  }

  renderImages = (attachment, i) => (
    <CardMedia key={i} expandable={true}>
      <img src={attachment.imageURL} alt={i}/>
    </CardMedia>
  )

  renderTweets = (attachment, i) => {
    let tweetID = attachment.tweetURL.split('/');
    tweetID = tweetID.pop();
    const children = <TweetEmbed id={tweetID} />;
    return <CardMedia key={i} expandable={true} children={children}></CardMedia>;
  }

  renderAttachments = () => {
    if (!this.props.data.attachments) return null;
    const { attachments } = this.props.data;
    return attachments.map((attachment, i) => {
      if (attachment.type === 'Text') return <CardText key={i} expandable={true}>{attachment.text}</CardText>;
      if (attachment.type === 'Image') return this.renderImages(attachment, i);
      if (attachment.type === 'Link') return this.renderLinks(attachment, i);
      if (attachment.type === 'Video') return this.renderVideos(attachment, i);
      if (attachment.type === 'Tweet') return this.renderTweets(attachment, i);
      else return null;
    });
  }

  render() {
    const { title } = this.props.data;
    const titleStyle = {
      fontWeight: 'bold',
    };
    return (
      <Card
        className="EventCard"
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        zDepth={this.state.shadow}
        >
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          titleColor='rgba(0, 0, 0, 0.54)'
          style={titleStyle}
          title={title}
        />
        {this.renderAttachments()}
      </Card>
    );
  }
}

export default EventCard;
