const sendNewRouter = require('express').Router();
const axios = require('axios');
require('dotenv').config();
const config = require('./config/initializeID');
const spotifyObjects = require('./config/spotifyObjects');

sendNewRouter.get('/:q/:type', async (request, response) => {
  const type = request.params.type;
  const fetchedObject = await config.getIndividualId(request.params.q, type);
  if (fetchedObject.error) {
    return response.status(400).json({ error: fetchedObject.error });
  }
  const token = await config.initilizeToken();
  if (token.error) {
    response.json({ error: 'Soptify Service unavaiable: Status Code 503 ' });
  }
  switch (type) {
    case 'show':
      const showData = await axios.get(
        `https://api.spotify.com/v1/shows/${fetchedObject.id}?market=US`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      response.json({
        ...spotifyObjects.getShowObject(showData.data),
        entertainer: fetchedObject.entertainer,
        logo: fetchedObject.logo,
        id: fetchedObject.id,
      });
      break;
    case 'artist':
      const validUri = encodeURI(
        `https://api.spotify.com/v1/search?q=${fetchedObject.entertainer}&type=track&market=US&limit=40`
      );
      const artistData = await axios.get(validUri, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedTracksByDate = artistData.data.tracks.items.sort((a, b) => {
        return new Date(b.album.release_date) - new Date(a.album.release_date);
      });
      const condensedTrackData = sortedTracksByDate[0];
      const artists = condensedTrackData.album.artists.map((a) => a.name);
      response.json({
        ...spotifyObjects.getArtistObject(condensedTrackData.album),
        artists,
        entertainer: fetchedObject.entertainer,
        logo: fetchedObject.logo,
        id: fetchedObject.id,
        duration: condensedTrackData.duration_ms / 60000,
      });
      break;
    case 'playlist':
      const playlistData = await axios.get(
        `https://api.spotify.com/v1/playlists/${fetchedObject.id}/tracks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      response.json({
        ...spotifyObjects.getPlaylistObject({
          tracks: playlistData.data,
          name: fetchedObject.entertainer,
          id: fetchedObject.id,
          images: [{ url: fetchedObject.logo }],
          external_urls: { spotify: fetchedObject.playlistUrl },
        }),
      });
      break;
    default:
      return null;
  }
});

module.exports = sendNewRouter;
