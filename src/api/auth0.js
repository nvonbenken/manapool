export function SaveMetadata(metadata, auth) {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://manapool.auth0.com/api/v2/users/${
      auth.userProfile.sub
    }`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${auth.getAccessToken()}`,
      },
      method: 'PATCH',
      body: `{ "user_metadata": ${JSON.stringify(metadata)} }`,
    },
  );
}

export function SetFavoriteCard(cardId, auth) {
  auth.userProfile.user_metadata.favorite_cards.push(cardId);
  SaveMetadata(auth.userProfile.user_metadata, auth);
}

export function RemoveFavoriteCard(cardId, auth) {
  auth.userProfile.user_metadata.favorite_cards.splice(
    auth.userProfile.user_metadata.favorite_cards.indexOf(cardId),
    1,
  );
  SaveMetadata(auth.userProfile.user_metadata, auth);
}
