import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
import {FaArrowLeft, FaArrowRight} from "../_snowpack/pkg/react-icons/fa.js";
import backgroundStyles from "./config/backgroundStyles.js";
import has from "../_snowpack/pkg/lodash/has.js";
const MainView = ({
  data,
  whatIsCurrentView,
  indexTracker,
  handleIndexChange
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState({});
  const [getStyles, setGetStyles] = useState(backgroundStyles);
  useEffect(() => {
    if (data.length !== 0) {
      setIsLoaded(true);
      setCurrentView(data[indexTracker]);
    } else {
      setCurrentView({});
      setIsLoaded(false);
    }
  }, [data]);
  useEffect(() => {
    setCurrentView(data[indexTracker]);
  }, [indexTracker]);
  useEffect(() => {
    whatIsCurrentView(currentView);
  }, [currentView]);
  const handleViewClick = (side) => {
    if (side === "right") {
      const shiftedRightView = getStyles.slice(0, -1);
      shiftedRightView.unshift(getStyles[getStyles.length - 1]);
      setGetStyles(shiftedRightView);
      handleIndexChange("right");
    } else {
      const shiftedLeftView = getStyles.slice(1, getStyles.length);
      shiftedLeftView.push(getStyles[0]);
      setGetStyles(shiftedLeftView);
      handleIndexChange("left");
    }
  };
  const minTommss = (minutes) => {
    var sign = minutes < 0 ? "-" : "";
    var min = Math.floor(Math.abs(minutes));
    var sec = Math.floor(Math.abs(minutes) * 60 % 60);
    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
  };
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(FaArrowLeft, {
    onClick: () => handleViewClick("left"),
    className: "arrow-icon far-left-arrow"
  }), /* @__PURE__ */ React.createElement("div", {
    onClick: () => handleViewClick("left"),
    style: {
      backgroundColor: getStyles[0].bg,
      color: getStyles[0].textColor
    },
    className: "previous-content-2 hover-preview"
  }), /* @__PURE__ */ React.createElement("div", {
    onClick: () => handleViewClick("left"),
    style: {
      backgroundColor: getStyles[1].bg,
      color: getStyles[1].textColor
    },
    className: "previous-content hover-preview"
  }), /* @__PURE__ */ React.createElement("div", {
    style: {
      backgroundColor: getStyles[2].bg,
      color: getStyles[2].textColor
    },
    className: "content-slideshow"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "entertainer"
  }, !isLoaded ? /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, "No Current View Selected \u{1F61E}")) : has(currentView, "entertainer") ? /* @__PURE__ */ React.createElement("h2", null, currentView.entertainer) : null, !isLoaded ? "" : has(currentView, "released_date") || has(currentView, "addedAt") ? /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, currentView.released_date || currentView.addedAt.slice(0, 10))) : null), /* @__PURE__ */ React.createElement("div", {
    className: "logo"
  }, !isLoaded ? "" : has(currentView, "logo") ? /* @__PURE__ */ React.createElement("img", {
    src: currentView.logo,
    alt: "logo"
  }) : null), /* @__PURE__ */ React.createElement("div", {
    className: "image-main"
  }, !isLoaded ? "" : has(currentView, "image") ? /* @__PURE__ */ React.createElement("img", {
    className: "content-image",
    src: !isLoaded ? "" : currentView.image,
    alt: "main-image"
  }) : null), /* @__PURE__ */ React.createElement("div", {
    className: "extra-info"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "extra-info-inner"
  }, /* @__PURE__ */ React.createElement("h4", null, !isLoaded ? "" : currentView.title || `Track: ${currentView.name}`), /* @__PURE__ */ React.createElement("p", null, !isLoaded ? "" : currentView.description || `Artists: ${currentView.artists.join(", ")}`), !isLoaded ? "" : has(currentView, "duration") ? /* @__PURE__ */ React.createElement("p", null, "Duration: ", minTommss(currentView.duration), "s") : "", !isLoaded ? "" : has(currentView, "albumType") ? /* @__PURE__ */ React.createElement("p", null, "- ", currentView.albumType) : "")), /* @__PURE__ */ React.createElement(FaArrowLeft, {
    onClick: () => handleViewClick("left"),
    className: "arrow-icon far-left-arrow-mobile"
  }), /* @__PURE__ */ React.createElement(FaArrowRight, {
    onClick: () => handleViewClick("right"),
    className: "arrow-icon far-right-arrow-mobile"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "external-url"
  }, /* @__PURE__ */ React.createElement("a", {
    href: !isLoaded ? "" : currentView.externalUrl || currentView.playlistUrl,
    target: "_blank"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "./images/open-in-spotify.png",
    alt: "open in spotify"
  })))), /* @__PURE__ */ React.createElement("div", {
    onClick: () => handleViewClick("right"),
    style: {
      backgroundColor: getStyles[3].bg,
      color: getStyles[3].textColor
    },
    className: "next-content hover-preview"
  }), /* @__PURE__ */ React.createElement("div", {
    onClick: () => handleViewClick("right"),
    style: {
      backgroundColor: getStyles[4].bg,
      color: getStyles[4].textColor
    },
    className: "next-content-2 hover-preview"
  }), /* @__PURE__ */ React.createElement(FaArrowRight, {
    onClick: () => handleViewClick("right"),
    className: "arrow-icon far-right-arrow"
  }));
};
export default MainView;
