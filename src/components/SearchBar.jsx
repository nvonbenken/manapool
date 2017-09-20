import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import '../styles/app.css';

class SearchBar extends Component {
  static propTypes = {
    onSearchTermChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };
  }

  onInputChange(term) {
    this.setState({
      term,
    });
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <div className="search-bar">
        <h4>Card Name:</h4>
        <Input
          icon="search"
          className="searchBar"
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          placeholder="Card Name"
        />
      </div>
    );
  }
}

export default SearchBar;
