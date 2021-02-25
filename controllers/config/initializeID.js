const axios = require('axios');
const btoa = require('btoa');
const { response } = require('express');
const qs = require('qs');
require('dotenv').config();

const initilizeToken = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: qs.stringify({
        grant_type: 'client_credentials',
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(
          process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
        )}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    return response.json({
      error: 'Spotify API, Service Unavaiable. Try again',
    });
  }
};

const getIndividualId = async (q, type) => {
  const token = await initilizeToken();
  const validUri = encodeURI(
    `https://api.spotify.com/v1/search?q=${q}&type=${type}&market=US&limit=5`
  );

  try {
    const initalIDRequest = await axios.get(validUri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    switch (type) {
      case 'show':
        const showObject = initalIDRequest.data.shows.items[0];
        return {
          id: showObject.id,
          entertainer: showObject.name,
          logo: showObject.images[1].url,
        };
      case 'artist':
        const artistObject = initalIDRequest.data.artists.items[0];
        if (!artistObject) {
          throw new Error(
            JSON.stringify({
              errorMessage: `unable to find the ${type} of ${q}`,
            })
          );
        }
        return {
          id: artistObject.id,
          entertainer: artistObject.name,
          logo: artistObject.images[1].url,
        };
      case 'playlist':
        const playlistObject = initalIDRequest.data.playlists.items[0];
        return {
          id: playlistObject.id,
          logo: playlistObject.images[0].url,
          entertainer: playlistObject.name,
          playlistUrl: playlistObject.external_urls.spotify,
        };
      default:
        return null;
    }
  } catch (error) {
    if (error instanceof TypeError) {
      return { error: 'invalid search query' };
    }
    return { error: JSON.parse(error.message).errorMessage };
  }
};

module.exports = {
  initilizeToken,
  getIndividualId,
};
