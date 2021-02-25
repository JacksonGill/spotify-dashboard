const storageRouter = require('express').Router();
const axios = require('axios');
const config = require('./config/initializeID');
const spotifyObjects = require('./config/spotifyObjects');

storageRouter.post('/', async (request, response) => {
  const body = request.body;
  const promiseArray = body.map(async (d) => {
    let token = await config.initilizeToken();
    switch (d.type) {
      case 'show':
        return axios.get(`https://api.spotify.com/v1/shows/${d.id}?market=US`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      case 'artist':
        const artist = await axios.get(
          `https://api.spotify.com/v1/artists/${d.id}?market=US`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const artistObject = await axios.get(
          `https://api.spotify.com/v1/artists/${d.id}/albums?include_groups=single%2Cappears_on%2Calbum&limit=10&market=US`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return {
          ...artistObject,
          artistID: d.id,
          entertainer: d.entertainer,
          logo: artist.data.images[0].url,
        };
      case 'playlist':
        return axios.get(
          `https://api.spotify.com/v1/playlists/${d.id}?market=US`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      default:
        return null;
    }
  });

  const resolved = await Promise.all(promiseArray);
  const data = resolved.map((d) => {
    if (d.data.type === 'show') {
      return spotifyObjects.getShowObject(d.data);
    } else if (d.data.type === 'playlist') {
      return spotifyObjects.getPlaylistObject(d.data);
    } else {
      const sortedTrackData = d.data.items.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
      });
      const condensedTrackData = sortedTrackData[0];
      return spotifyObjects.getArtistObject({
        ...condensedTrackData,
        artistID: d.artistID,
        entertainer: d.entertainer,
        logo: d.logo,
      });
    }
  });
  response.json(data);
});

module.exports = storageRouter;
