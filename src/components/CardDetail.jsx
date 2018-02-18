import React, { Component } from "react";
import { Table, Divider, Button, Icon, Popup } from "semantic-ui-react";

import "../styles/cardDetail.css";

class CardDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cost: null,
      page: 0,
      loading: true,
      favorite: false
    };
  }

  getProductIds = () => {
    const data = {
      offset: 0,
      limit: 10,
      includeAggregates: true,
      filters: [
        {
          name: "ProductName",
          values: [this.props.cardArr[this.state.page].name]
        },
        {
          name: "SetName",
          values: [this.props.cardArr[this.state.page].setName]
        }
      ]
    };

    return fetch(
      "https://cors-anywhere.herokuapp.com/http://api.tcgplayer.com/v1.6.0/catalog/categories/1/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${this.props.accessToken}`
        },
        body: JSON.stringify(data)
      }
    ).then(response => response.json());
  };

  getProductInfo = ids =>
    fetch(
      `https://cors-anywhere.herokuapp.com/http://api.tcgplayer.com/v1.5.0/catalog/products/${ids.join()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${this.props.accessToken}`
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      });

  getProductMarketPrice = ids =>
    fetch(
      `https://cors-anywhere.herokuapp.com/http://api.tcgplayer.com/v1.6.0/pricing/product/${ids.join()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${this.props.accessToken}`
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ cost: responseJson.results[0] });
      });

  handleClick = (event, type) => {
    this.setState({ loading: true });
    this.setState({ cost: null });
    if (type === "next") {
      this.setState({ page: this.state.page + 1 });
    } else if (type === "previous") {
      this.setState({ page: this.state.page - 1 });
    }
  };

  setFavorite = () => {
    console.log(this.props.cardArr[this.state.page]);
    this.setState({ favorite: !this.state.favorite });
  };

  render() {
    if (!this.props.cardArr) {
      return <div>Loading...</div>;
    }

    let rulings = null;

    if (typeof this.props.cardArr[this.state.page].rulings === "undefined") {
      rulings = (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rulings</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>No rulings found.</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    } else {
      rulings = (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">Rulings</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Ruling</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.cardArr[this.state.page].rulings.map(item => (
              <Table.Row key={item.multiverseid}>
                <Table.Cell style={{ width: "100px" }}>{item.date}</Table.Cell>
                <Table.Cell>{item.text}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      );
    }

    let legalities = null;

    if (typeof this.props.cardArr[this.state.page].legalities === "undefined") {
      legalities = (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Legalities</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>No legalities found.</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    } else {
      legalities = (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">Legalities</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Format</Table.HeaderCell>
              <Table.HeaderCell>Legality</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.cardArr[this.state.page].legalities.map(item => (
              <Table.Row key={item.multiverseid}>
                <Table.Cell style={{ width: "100px" }}>
                  {item.format}
                </Table.Cell>
                <Table.Cell>{item.legality}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      );
    }

    let cost = null;

    if (this.state.cost === null && !this.state.loading) {
      cost = (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Card Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Not Found</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    } else if (this.state.cost === null) {
      cost = (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Card Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Loading...</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    } else {
      cost = (
        <div style={{ width: "180px" }}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">Card Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row key={this.state.cost.productId}>
                <Table.Cell style={{ width: "100px" }}>Low Price</Table.Cell>
                <Table.Cell>${this.state.cost.lowPrice.toFixed(2)}</Table.Cell>
              </Table.Row>
              <Table.Row key={this.state.cost.productId}>
                <Table.Cell style={{ width: "100px" }}>Mid Price</Table.Cell>
                <Table.Cell>${this.state.cost.midPrice.toFixed(2)}</Table.Cell>
              </Table.Row>
              <Table.Row key={this.state.cost.productId}>
                <Table.Cell style={{ width: "100px" }}>High Price</Table.Cell>
                <Table.Cell>${this.state.cost.highPrice.toFixed(2)}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div>
            Prices provided by <a href="www.tcgplayer.com">TCGPlayer</a>
          </div>
        </div>
      );
    }

    if (
      this.props.accessToken !== null &&
      this.state.cost === null &&
      this.state.loading
    ) {
      this.getProductIds().then(results => {
        if (results.totalItems > 0) {
          this.getProductMarketPrice(results.results).then(() => {
            this.setState({ loading: false });
          });
        } else {
          this.setState({ loading: false });
        }
      });
    }

    return (
      <div>
        <div className="details">
          {this.props.cardArr.length > 1 ? (
            this.state.page === 0 ? (
              <Button disabled style={{ background: "none" }}>
                <Icon name="arrow left" />
              </Button>
            ) : (
              <Button
                onClick={event => this.handleClick(event, "previous")}
                style={{ background: "none" }}
              >
                <Icon name="arrow left" />
              </Button>
            )
          ) : null}
          <div className="image-container">
            <img
              src={this.props.cardArr[this.state.page].imageUrl}
              alt="Loading..."
            />
            <a
              href={`http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${
                this.props.cardArr[this.state.page].multiverseid
              }`}
            >
              View on Wizards.com
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <label>
                <strong>Name: </strong>
              </label>
              {this.props.cardArr[this.state.page].name}
            </div>
            <div>
              <label>
                <strong>Mana Cost: </strong>
              </label>
              {this.props.cardArr[this.state.page].manaCost}
            </div>
            <div>
              <label>
                <strong>Type: </strong>
              </label>
              {this.props.cardArr[this.state.page].type}
            </div>
            <div>
              <label>
                <strong>Color: </strong>
              </label>
              {this.props.cardArr[this.state.page].colors}
            </div>
            <div>
              <label>
                <strong>Rarity: </strong>
              </label>
              {this.props.cardArr[this.state.page].rarity}
            </div>
            <div>
              <label>
                <strong>Set: </strong>
              </label>
              {this.props.cardArr[this.state.page].setName}
            </div>
            <div>
              <label>
                <strong>Text: </strong>
              </label>
              {this.props.cardArr[this.state.page].text}
            </div>
            <div>
              <label>
                <strong>Flavor: </strong>
              </label>
              {this.props.cardArr[this.state.page].flavor}
            </div>
            <div>
              <label>
                <strong>Artist: </strong>
              </label>
              {this.props.cardArr[this.state.page].artist}
            </div>
          </div>
          {this.props.cardArr.length > 1 ? (
            this.state.page === this.props.cardArr.length - 1 ? (
              <Button disabled style={{ background: "none" }}>
                <Icon name="arrow right" />
              </Button>
            ) : (
              <Button
                onClick={event => this.handleClick(event, "next")}
                style={{ background: "none" }}
              >
                <Icon name="arrow right" />
              </Button>
            )
          ) : null}
        </div>
        <div>
          <span>Card Actions:</span>
          {this.state.favorite ? (
            <Popup
              trigger={
                <Icon
                  name="star"
                  className="icon-favorite"
                  onClick={() => this.setFavorite()}
                />
              }
              content="Remove card from favorites."
            />
          ) : (
            <Popup
              trigger={
                <Icon
                  name="star empty"
                  className="icon-favorite"
                  onClick={() => this.setFavorite()}
                />
              }
              content="Add card to favorites."
            />
          )}
        </div>
        <Divider />
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "10px" }}>{legalities}</div>
            <div style={{ paddingRight: "10px" }}>{rulings}</div>
            <div style={{ paddingRight: "10px", width: "180px" }}>{cost}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardDetail;
