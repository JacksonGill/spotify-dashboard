const getShowObject = (showData) => {
  const condensedShowData = showData.episodes.items[0]; // most recent
  const cleanedDescription =
    condensedShowData.description.length > 150
      ? condensedShowData.description.trim().slice(0, 150) + '...'
      : condensedShowData.description;
  latestShow = {
    entertainer: showData.name,
    logo: showData.images[1].url,
    id: showData.id,
    fullDescription: condensedShowData.description,
    description: cleanedDescription,
    externalUrl: condensedShowData.external_urls.spotify,
    image: condensedShowData.images[0].url,
    title: condensedShowData.name,
    released_date: condensedShowData.release_date,
    type: 'show',
  };
  return latestShow;
};

const getArtistObject = (artistData) => {
  const artists = artistData.artists.map((a) => a.name);
  const latestTrack = {
    entertainer: artistData.entertainer,
    logo: artistData.logo,
    id: artistData.artistID,
    albumType: artistData.album_type,
    externalUrl: artistData.external_urls.spotify,
    image: artistData.images[0].url,
    released_date: artistData.release_date,
    artists,
    name: artistData.name,
    type: 'artist',
  };
  return latestTrack;
};

const getPlaylistObject = (playlistData) => {
  const sortedPlaylistTracks = playlistData.tracks.items.sort((a, b) => {
    return new Date(b.added_at) - new Date(a.added_at);
  });
  const condensedPlaylistTrack = sortedPlaylistTracks[0];
  const playlistArtist = condensedPlaylistTrack.track.album.artists.map(
    (a) => a.name
  );

  const latestPlaylistTrack = {
    entertainer: playlistData.name,
    logo: playlistData.images[0].url,
    id: playlistData.id,
    description: playlistData.description,
    playlistUrl: playlistData.external_urls.spotify,
    albumType: condensedPlaylistTrack.track.album.album_type,
    image: condensedPlaylistTrack.track.album.images[0].url,
    addedAt: condensedPlaylistTrack.added_at,
    artists: playlistArtist,
    name: condensedPlaylistTrack.track.name,
    duration: condensedPlaylistTrack.track.duration_ms / 60000,
    type: 'playlist',
  };

  return latestPlaylistTrack;
};

module.exports = {
  getShowObject,
  getArtistObject,
  getPlaylistObject,
};
