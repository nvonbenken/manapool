import React, { Component } from 'react';
import { Item, Image } from 'semantic-ui-react';

import NavBar from './Navbar';
import Footer from './Footer';
import '../styles/home.css';
import '../styles/main.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };

    this.getFeed();
  }

  getFeed = () => {
    const FeedParser = require('feedparser');
    const request = require('request');

    const req = request(
      'https://cors-anywhere.herokuapp.com/https://magic.wizards.com/en/rss/rss.xml?tags=Daily%20MTG&lang=en',
    );
    const parser = new FeedParser();
    const articles = [];

    req.on('error', (err) => {
      // handle request error
    });

    req.on('response', (res) => {
      // check if status code is not correct
      if (res.statusCode !== 200) {
        return req.emit('error', new Error('Bad status code'));
      }
      // if the res is correct, when can pipe the response
      req.pipe(parser); // pipe response to feedparser
    });

    parser.on('error', (err) => {
      // handle parser error
    });

    parser.on('end', () => {
      // handle that we've finished reading articles
    });

    parser.on('readable', () => {
      let item = parser.read();
      const meta = parser.meta; // get the metadata of the feed
      while (item) {
        if (articles.count === 10) {
          break;
        }
        // do whatever you want with the item
        articles.push(item);
        // get the next item, if none, then item will be null next time
        item = parser.read();
      }
      this.setState({ articles: articles.slice(0, 3) });
    });
  };

  render() {
    return (
      <div className="wrapper">
        <NavBar auth={this.props.auth} />
        <div className="home-container">
          <h1>Welcome to ManaPool!</h1>
          <p>
            This site provides the functionality to look up cards you may be interested in based on
            a number of available filters. It also allows you to create a deck, which is broken down
            by a few statistics with more coming soon! You can also opt to create an account in
            order to save decks and load them on your next visit.
          </p>
          <p>
            In the future I plan to expand the filters and statistics further, while making the site
            more useful for you! I'm also planning to get a more funtional mobile version of the
            site completed soon, so look out for that.
          </p>
          <p>
            If you have any suggestions or discover a bug, please tell me about it{' '}
            <a href="https://bitbucket.org/nvonbenken/manapool/issues/new">here.</a>
          </p>
          <h2>Recent Acticles</h2>
          <div style={{ textAlign: 'left', padding: '10px' }}>
            {!this.state.articles || this.state.articles.count === 0 ? (
              <div>No articles found</div>
            ) : (
              <Item.Group divided>
                {this.state.articles.map(article => (
                  <Item href={article.link}>
                    <Item.Image
                      src={/<img[^>]*src="([^"]*)"/.exec(article.description)[1]}
                      size="small"
                    />
                    <Item.Content>
                      <Item.Header>{article.title}</Item.Header>
                      <Item.Meta>{article['rss:pubdatestring']['#']}</Item.Meta>
                      {/<p>/.test(article.description) ? (
                        <Item.Description id={article.title}>
                          {/<p>(.*)<\/p>/.exec(article.description)[1].replace(/(<([^>]+)>)/gi, '')}
                        </Item.Description>
                      ) : null}
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            )}
          </div>
          <a href="https://magic.wizards.com/en/articles">More?</a>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
