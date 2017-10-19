import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import TweetEmbed from 'react-tweet-embed';
import ReactPlayer from 'react-player';
import { Player, BigPlayButton } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";


class EventCard extends Component {

  state = {
    shadow: 1,
    textColor: 'rgba(0, 0, 0, 0.54)'
  }

  onMouseOver = () => this.setState({ shadow: 3 });
  onMouseOut = () => this.setState({ shadow: 1 });

  renderLinks = (attachment, i) => {
    const children = (
      <div className="LinkChildren">
        <a href={attachment.url}>{attachment.title}</a>
        <img src={attachment.urlImg} alt={i}/>
      </div>
    );
    return <CardText className="Link" key={i} expandable={false} children={children}></CardText>;
  }

  renderVideos = (attachment, i) => {
    let children = null;
    if ((/\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4)/i).test(attachment.url)) {
      children = (
        <div className="previewVideo">
          <Player
            id="player"
          >
            <source src={attachment.url} />
            <BigPlayButton position="center" />
        </Player>
        </div>
      )
    } else {
      children = (
        <div className="previewVideo">
          <ReactPlayer
            width={400}
            height={225}
            url={attachment.url}
          />
        </div>
      )
    }
    return <CardMedia key={i} expandable={false} children={children}></CardMedia>;
  }

  renderImages = (attachment, i) => (
    <CardMedia key={i} expandable={false}>
      <img src={attachment.imageUrl} alt={i}/>
    </CardMedia>
  )

  renderTweets = (attachment, i) => {
    let tweetID = attachment.url.split('/');
    tweetID = tweetID.pop();
    const children = <TweetEmbed id={tweetID} />;
    return <CardMedia key={i} expandable={false} children={children}></CardMedia>;
  }

  renderAttachments = () => {
    if (!this.props.data.attachments) return null;
    const { attachments } = this.props.data;
    return attachments.map((attachment, i) => {
      if (attachment.type === 'text') return <CardText key={i} expandable={false}>{attachment.text}</CardText>;
      if (attachment.type === 'image') return this.renderImages(attachment, i);
      if (attachment.type === 'link') return this.renderLinks(attachment, i);
      if (attachment.type === 'video') return this.renderVideos(attachment, i);
      if (attachment.type === 'tweet') return this.renderTweets(attachment, i);
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
        expanded={this.props.expanded}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        zDepth={this.state.shadow}
        >

        <CardHeader
          titleColor={this.state.textColor}
          style={titleStyle}
          title={this.props.data.attachments[0].type}
        />
        {this.renderAttachments()}
      </Card>
    );
  }
}


export default EventCard;
