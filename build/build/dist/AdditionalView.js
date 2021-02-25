import React from "../_snowpack/pkg/react.js";
const AdditionalView = ({currentView}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "additional-info"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "additional-header"
  }, /* @__PURE__ */ React.createElement("h1", null, currentView ? currentView.title : ""), /* @__PURE__ */ React.createElement("div", {
    className: "additional-entertainer-release"
  }, /* @__PURE__ */ React.createElement("p", null, currentView ? currentView.entertainer : ""), /* @__PURE__ */ React.createElement("p", null, currentView ? currentView.released_date : ""))), /* @__PURE__ */ React.createElement("div", {
    className: "additional-image"
  }, /* @__PURE__ */ React.createElement("img", {
    src: currentView ? currentView.image : "",
    alt: "image"
  })), currentView && (currentView.fullDescription || currentView.description) ? /* @__PURE__ */ React.createElement("div", {
    className: "additional-description"
  }, /* @__PURE__ */ React.createElement("h4", null, "Full Description:"), /* @__PURE__ */ React.createElement("p", null, currentView ? currentView.fullDescription || currentView.description : "")) : "");
};
export default AdditionalView;
