import React, { useEffect, useState } from '../_snowpack/pkg/react.js';
import Header from './Header.js';
import MainView from './MainView.js';
import Dashboard from './Dashboard.js';
import ExtraInfo from './ExtraInfo.js';
import AdditionalView from './AdditionalView.js';
import { isEmpty, pick } from '../_snowpack/pkg/lodash.js';
import spotifyService from './services/spotifyService.js';
const App = () => {
  const [indexTracker, setIndexTracker] = useState(0);
  const [data, setData] = useState([]);
  const [currentView, setCurrentView] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    (async () => {
      if (window.localStorage.getItem('spotify-dashboard-id')) {
        const savedData = JSON.parse(
          window.localStorage.getItem('spotify-dashboard-id')
        );
        const retreievedData = await spotifyService.initializeLocalStorageData(
          savedData
        );
        setData(retreievedData);
        setIsDefault(false);
        return null;
      } else {
        const randomData = await spotifyService.initializeData();
        setData(randomData);
        setIsDefault(true);
      }
    })();
  }, []);
  useEffect(() => {
    if (data.length === 0) {
      setCurrentView({});
      window.localStorage.clear();
    } else {
      const localStorageObject = data.map((d) => {
        return pick(d, ['id', 'entertainer', 'type']);
      });
      window.localStorage.setItem(
        'spotify-dashboard-id',
        JSON.stringify(localStorageObject)
      );
    }
  }, [data]);
  const newEntry = async (value, select) => {
    const newObject = await spotifyService.getNew({
      q: value,
      type: select,
    });
    if (data.find((d) => d.id === newObject.id)) {
      setErrorMessage('You can not have two of the same thing!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4e3);
      return null;
    }
    if (newObject.error) {
      setErrorMessage(newObject.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5e3);
      return null;
    }
    setData(data.concat(newObject));
    setIsDefault(false);
  };
  const handleIndexChange = (side) => {
    if (side === 'right') {
      if (indexTracker === data.length - 1) {
        setIndexTracker(0);
      } else {
        setIndexTracker(indexTracker + 1);
      }
    } else {
      if (indexTracker === 0) {
        setIndexTracker(data.length - 1);
      } else {
        setIndexTracker(indexTracker - 1);
      }
    }
  };
  const deleteEntry = (view) => {
    const updatedData = data.filter((d) => d.id !== view.id);
    if (data.length > 1) {
      if (
        data.findIndex((d) => d.id === view.id) <= indexTracker &&
        indexTracker !== 0
      ) {
        setIndexTracker(indexTracker - 1);
      }
    }
    setData(updatedData);
  };
  const changeView = (view) => {
    const index = data.findIndex((d) => d.entertainer === view.entertainer);
    setIndexTracker(index);
  };
  const whatIsCurrentView = (currentView2) => {
    setCurrentView(currentView2);
  };
  return /* @__PURE__ */ React.createElement(
    React.Fragment,
    null,
    /* @__PURE__ */ React.createElement(Header, {
      newEntry,
    }),
    /* @__PURE__ */ React.createElement(
      'p',
      {
        className: 'error-message',
      },
      errorMessage !== null ? errorMessage : ''
    ),
    /* @__PURE__ */ React.createElement(MainView, {
      data,
      whatIsCurrentView,
      indexTracker,
      handleIndexChange,
    }),
    /* @__PURE__ */ React.createElement(
      'p',
      {
        className: 'featured-text',
      },
      '- Latest Updates and Releases -'
    ),
    /* @__PURE__ */ React.createElement(Dashboard, {
      data,
      currentView,
      deleteEntry,
      changeView,
    }),
    isDefault
      ? /* @__PURE__ */ React.createElement(
          'p',
          {
            className: 'default',
          },
          '* You have not selected any of your favorite artists - the default view is displayed -'
        )
      : null,
    !isEmpty(currentView)
      ? /* @__PURE__ */ React.createElement(AdditionalView, {
          currentView,
        })
      : '',
    /* @__PURE__ */ React.createElement(ExtraInfo, null),
    /* @__PURE__ */ React.createElement('div', {
      className: 'seperator',
    })
  );
};
export default App;
