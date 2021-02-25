import React, {useState} from "../_snowpack/pkg/react.js";
import {FaSpotify, FaSearch, FaMusic} from "../_snowpack/pkg/react-icons/fa.js";
const Header = ({newEntry}) => {
  const [value, setValue] = useState("");
  const [select, setSelect] = useState("artist");
  const handleSubmit = async () => {
    newEntry(value, select);
    setValue("");
  };
  return /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("div", {
    className: "logo-title"
  }, /* @__PURE__ */ React.createElement(FaSpotify, {
    className: "fa-spotify"
  }), /* @__PURE__ */ React.createElement("h1", null, /* @__PURE__ */ React.createElement("span", {
    className: "spotify-name"
  }, "Spotify"), " Dashboard")), /* @__PURE__ */ React.createElement("div", {
    className: "search"
  }, /* @__PURE__ */ React.createElement(FaSearch, {
    className: "fa-search",
    onClick: handleSubmit
  }), /* @__PURE__ */ React.createElement("input", {
    value,
    onChange: (e) => setValue(e.target.value),
    type: "text",
    placeholder: "Search for artist, podcats, etc..."
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "type"
  }, "Choose a medium:"), /* @__PURE__ */ React.createElement("select", {
    value: select,
    onChange: (e) => setSelect(e.target.value),
    name: "type",
    id: "type"
  }, /* @__PURE__ */ React.createElement("option", {
    value: "artist"
  }, "Artist"), /* @__PURE__ */ React.createElement("option", {
    value: "show"
  }, "Podcast"), /* @__PURE__ */ React.createElement("option", {
    value: "playlist"
  }, "Playlist"))), /* @__PURE__ */ React.createElement(FaMusic, {
    className: "header-music-icon"
  }));
};
export default Header;
