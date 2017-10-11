import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import TweetEmbed from 'react-tweet-embed';
import ReactPlayer from 'react-player';

class EventCard extends Component {

  state = {
    expanded: false,
  }

  componentDidMount() {
    if (!this.props.expanded) return;
    else this.setState({expanded: true});
  }

  handleExpandChange = expanded => this.setState({expanded: expanded});

  renderLinks = (attachment, i, style) => {
    const childrenWithDesc = (
      <div className="LinkChildrenWithDesc">
        <p>{attachment.description}</p>
        <div className="LinkChildren">
          <a href={attachment.link}>{attachment.title}</a>
          <img src={attachment.imageURL} alt={i}/>
        </div>
      </div>
    )
    const childrenNoDesc = (
      <div className="LinkChildren">
        <a href={attachment.link}>{attachment.title}</a>
        <img style={style.linkImage} src={attachment.imageURL} alt={i}/>
      </div>
    )
    return (
      <CardMedia key={i} expandable={true} style={style}>
        {attachment.description ? (
            <CardText
              className="Link"
              key={i}
              expandable={true}
              children={childrenWithDesc}>
            </CardText>
          ) : (
            <CardText
              className="Link"
              key={i}
              expandable={true}
              children={childrenNoDesc}>
            </CardText>
          )
        }
      </CardMedia>
    )
  }

  renderVideos = (attachment, i, style) => {
    const children = (
      <div className="VideoChildren">
        <CardText>{attachment.description}</CardText>
        <ReactPlayer url={attachment.videoURL}/>
      </div>
    )
    return <CardMedia key={i} expandable={true} style={style} children={children}></CardMedia>;
  }

  renderImages = (attachment, i, style) => (
    <CardMedia key={i} expandable={true} style={style}>
      <img src={attachment.imageURL} alt={i}/>
    </CardMedia>
  )

  renderTweets = (attachment, i, style) => {
    let tweetID = attachment.tweetURL.split('/');
    tweetID = tweetID.pop();
    const children = (
      <div>
        <CardText>{attachment.description}</CardText>
        <TweetEmbed id={tweetID} />
      </div>
    );
    return <CardMedia key={i} expandable={true} style={style} children={children}></CardMedia>;
  }

  renderAttachments = () => {
    if (!this.props.data.attachments) return null;
    const style = {
      borderBottom: '1px solid #cccecf',
      maxWidth: '100%',
    }
    const { attachments } = this.props.data;
    return attachments.map((attachment, i) => {
      if (attachment.type === 'text') return <CardText style={style} key={i} expandable={true}>{attachment.text}</CardText>;
      if (attachment.type === 'img') return this.renderImages(attachment, i, style);
      if (attachment.type === 'link') return this.renderLinks(attachment, i, style);
      if (attachment.type === 'video') return this.renderVideos(attachment, i, style);
      if (attachment.type === 'tweet') return this.renderTweets(attachment, i, style);
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
