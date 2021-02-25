import React from "../_snowpack/pkg/react.js";
import {FaMinusCircle} from "../_snowpack/pkg/react-icons/fa.js";
const Dashboard = ({data, currentView, deleteEntry, changeView}) => {
  if (data.length === 0 || currentView === void 0) {
    return null;
  }
  const handleViewChange = (view) => {
    changeView(view);
  };
  const deleteView = (view) => {
    deleteEntry(view);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "dashboard"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "featured"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "individual-updates"
  }, data.map((d, idx) => {
    return /* @__PURE__ */ React.createElement("div", {
      className: "node",
      key: idx
    }, /* @__PURE__ */ React.createElement("button", {
      className: "hvr-pulse-grow",
      onClick: () => handleViewChange(d)
    }, /* @__PURE__ */ React.createElement("img", {
      className: "node-image",
      src: d.logo,
      alt: "logo"
    })), /* @__PURE__ */ React.createElement("p", {
      className: currentView.entertainer === d.entertainer ? "isSelected" : ""
    }, d.entertainer), /* @__PURE__ */ React.createElement(FaMinusCircle, {
      onClick: () => deleteView(d),
      className: "fa-minus-circle"
    }));
  }))));
};
export default Dashboard;
