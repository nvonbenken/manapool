const accessToken = '';

export function GetAccessToken() {
  return fetch('https://cors-anywhere.herokuapp.com/https://api.tcgplayer.com/token', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    },
    method: 'POST',
    body:
      'grant_type=client_credentials&client_id=0A436DDE-5EB7-4B14-881B-3971A625B541&client_secret=62EF4907-FD23-445A-A586-0581DDBE4CB3',
  })
    .then(response => response.json())
    .then(responseData => responseData)
    .catch(error => console.warn(error));
}

export function GetProductIds(card) {
  const data = {
    offset: 0,
    limit: 10,
    includeAggregates: true,
    filters: [
      {
        name: 'ProductName',
        values: [card.name],
      },
      {
        name: 'SetName',
        values: [card.setName],
      },
    ],
  };

  return fetch(
    'https://cors-anywhere.herokuapp.com/http://api.tcgplayer.com/v1.6.0/catalog/categories/1/search',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    },
  )
    .then(response => response.json())
    .then(responseData => responseData)
    .catch(error => console.warn(error));
}

export function GetProductInfo(ids) {
  return fetch(
    `https://cors-anywhere.herokuapp.com/http://api.tcgplayer.com/v1.5.0/catalog/products/${ids.join()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
    },
  )
    .then(response => response.json())
    .then(responseData => responseData)
    .catch(error => console.warn(error));
}

export function GetProductMarketPrice(ids) {
  return fetch(
    `https://cors-anywhere.herokuapp.com/http://api.tcgplayer.com/v1.6.0/pricing/product/${ids.join()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
    },
  )
    .then(response => response.json())
    .then(responseData => responseData.results[0])
    .catch(error => console.warn(error));
}
