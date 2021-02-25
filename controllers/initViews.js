const initViews = require('express').Router();
const axios = require('axios');
const config = require('./config/initializeID');

initViews.get('/', async (_request, response) => {
  const token = await config.initilizeToken();
  if (token.error) {
    response.json({ error: 'Soptify Service unavaiable: Status Code 503 ' });
  }
  const spotifyData = await axios.get(
    'https://api.spotify.com/v1/browse/new-releases?country=US&limit=8',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const cleanedSpotifyData = spotifyData.data.albums.items.map(async (d) => {
    let token = await config.initilizeToken();
    const artist = await axios.get(
      `https://api.spotify.com/v1/artists/${d.artists[0].id}?market=US`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const artists = d.artists.map((a) => a.name);

    return {
      entertainer: d.artists[0].name,
      logo: artist.data.images[0].url,
      id: d.artists[0].id,
      albumType: d.album_type,
      externalUrl: d.external_urls.spotify,
      image: d.images[0].url,
      released_date: d.release_date,
      artists,
      name: d.name,
      type: 'artist',
    };
  });
  const resolved = await Promise.all(cleanedSpotifyData);
  response.json(resolved);
});

module.exports = initViews;
