import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import { grey300 } from 'material-ui/styles/colors';

class Search extends Component {

  captureQuery = (e) => this.props.passQuery(e.target.value);

  render() {
    const styles = {
      underlineStyle: {
        borderColor: grey300,
      },
      hintText: {
        color: '#F4F4F6',
      }
    };
    return (
      <TextField
        className="Search"
        hintText="search..."
        hintStyle={styles.hintText}
        underlineFocusStyle={styles.underlineStyle}
        onChange= {this.captureQuery}
      />
    )
  }
}

export default Search;
