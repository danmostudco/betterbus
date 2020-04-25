import React, { useContext } from "react";
import { RouteContext } from "./RouteContext";

const Tag = props => {
  const [routes, setRoutes] = useContext(RouteContext);

  const removeRoute = route => {
    // isolate this route from state
    const thisRoute = routes.activeRoutes.find(e => e.RouteID === route);
    const updatedCache = [...routes.cachedRoutes];
    let updateTheCache = true;

    // if route is NOT in cache, push route to updatedCache
    for (var i = 0; i < updatedCache.length; i++) {
      if (thisRoute.RouteID === updatedCache[i].RouteID) {
        updateTheCache = false;
        break;
      } else {
        updateTheCache = true;
      }
    }
    if (updateTheCache === true) {
      updatedCache.push(thisRoute);
    }

    // remove the clicked route from the array using an array filter
    const newRoutes = [...routes.activeRoutes].filter(e => {
      return e.RouteID !== route;
    });

    // set activeRoutes and take spread of cachedRoutes and add this route
    setRoutes({
      activeRoutes: newRoutes,
      cachedRoutes: updatedCache
    });
  };

  return (
    <button
      className="tag"
      onClick={() => {
        removeRoute(props.RouteID);
      }}
    >
      <span className="tag__route">{props.RouteID}</span>
      <span className="tag__x">x</span>
    </button>
  );
};

export default Tag;
