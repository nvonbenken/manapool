import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu } from 'semantic-ui-react';

import SearchBar from './SearchBar';
import Filters from './Filters';

class SidebarOverlay extends Component {
  static propTypes = {
    onSearchComplete: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      t: '',
      f: ['', '', '', '', ''],
      page: 1,
      visible: true,
    };

    this.handleScroll = this.handleScroll.bind(this, this.state.page, this.state.cards);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const windowHeight =
      'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({ page: this.state.page + 1 });
      this.setState({
        cards: this.state.cards + this.cardSearch(this.state.t, this.state.f, this.state.page),
      });
    }
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  cardSearch(term, filters, page) {
    this.setState({ t: term });
    this.setState({ f: filters });
    if (filters === undefined || filters === null) {
      fetch(
        `https://api.magicthegathering.io/v1/cards?contains=imageUrl&pageSize=28&page=${page}&name=${term}`,
      )
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            cards: this.state.cards.concat(responseJson.cards),
          });
          this.props.onSearchComplete(responseJson.cards);
        });
    } else {
      fetch(
        `https://api.magicthegathering.io/v1/cards?contains=imageUrl&pageSize=28&page=${page}&name=${term}&colors=${filters[0]}&types=${filters[1]}&rarity=${filters[2]}&cmc=${filters[3]}&gameFormat=${filters[4]}`,
      )
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            cards: this.state.cards.concat(responseJson.cards),
          });
          this.props.onSearchComplete(responseJson.cards);
        });
    }
  }

  resetSearch() {
    this.setState({ page: 1 });
    this.setState({ cards: [] });
    this.props.onSearchComplete('');
  }

  render() {
    const cardSearch = _.debounce((term) => {
      this.resetSearch();
      this.cardSearch(term, null, 1);
    }, 300);

    const applyFilter = _.debounce((filters) => {
      this.resetSearch();
      this.cardSearch(
        document.getElementsByClassName('searchBar')[0].querySelector('input').value,
        filters,
        1,
      );
    });

    const { visible } = this.state;

    return (
      <div style={{ width: '250px' }}>
        <Sidebar
          as={Menu}
          visible={visible}
          icon="labeled"
          vertical
          inverted
          style={{ position: 'inherit', padding: 0 }}
        >
          <Menu.Item name="search">
            <SearchBar onSearchTermChange={cardSearch} />
          </Menu.Item>
          <Menu.Item name="filters">
            <Filters onFilterChange={applyFilter} />
          </Menu.Item>
        </Sidebar>
      </div>
    );
  }
}

export default SidebarOverlay;
