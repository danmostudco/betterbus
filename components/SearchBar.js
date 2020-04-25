// working from this post https://www.robinwieruch.de/react-hooks-fetch-data/

import React, { useState, useContext, useEffect } from "react";
import { RouteContext } from "./RouteContext";
import axios from "axios";
import routeNames from "../data/routeNames";

const SearchBar = (props) => {
  const [searchParam, setParam] = useState("");
  const [routes, setRoutes] = useContext(RouteContext);

  const checkRouteExists = () => {
    // TODO: check cache (not yet created)

    // iterate over routeNames, return true if you find it
    // use a for loop so you can break if you find a match
    let hasRoute = false;

    for (var i = 0; i < routeNames.length; i++) {
      const thisRoute = routeNames[i].toString().toLowerCase();
      const thisParam = searchParam.toString().toLowerCase();

      if (thisRoute === thisParam) {
        hasRoute = true;
        break;
      }
    }
    return hasRoute;
  };

  const checkRouteOnMap = () => {
    let hasRoute = false;

    for (var i = 0; i < routes.activeRoutes.length; i++) {
      const thisRoute = routes.activeRoutes[i].RouteID.toString().toLowerCase();
      const thisParam = searchParam.toString().toLowerCase();

      if (thisRoute === thisParam) {
        hasRoute = true;
        break;
      }
    }
    return hasRoute;
  };

  const checkRouteInCache = () => {
    let hasRoute = false;

    for (var i = 0; i < routes.cachedRoutes.length; i++) {
      const thisRoute = routes.cachedRoutes[i].RouteID.toString().toLowerCase();
      const thisParam = searchParam.toString().toLowerCase();

      if (thisRoute === thisParam) {
        hasRoute = true;
        break;
      }
    }
    return hasRoute;
  };

  const fillRouteFromCache = () => {
    const thisParam = searchParam.toString().toLowerCase();
    let updatedRoutes = [...routes.activeRoutes];

    // find route in Cache and add it to updatedRoutes
    for (var i = 0; i < routes.cachedRoutes.length; i++) {
      if (
        thisParam === routes.cachedRoutes[i].RouteID.toString().toLowerCase()
      ) {
        updatedRoutes.push(routes.cachedRoutes[i]);
      }
    }
    setRoutes({
      activeRoutes: updatedRoutes,
      cachedRoutes: routes.cachedRoutes,
    });
  };

  const fetchRoute = async () => {
    // go to API route and get results
    const result = await fetch(`/api/route/${searchParam}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });

    // convert payload into routes
    try {
      result.direction0LatLongs = stripLatLongs(result);
      const newRoutes = [...routes.activeRoutes, result];
      setRoutes({
        ...routes,
        activeRoutes: newRoutes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const stripLatLongs = (result) => {
    // TODO for both Direction0 and Direction1
    // right now only for Direction0
    const routeLatLongs = [];
    result.Direction0.Shape.forEach((objectPair) => {
      routeLatLongs.push([objectPair.Lon, objectPair.Lat]);
    });
    return routeLatLongs;
  };

  const submitRoute = (e) => {
    e.preventDefault();
    // check is the route in the known route list?
    if (checkRouteExists() === true) {
      // check route is NOT on the map
      if (checkRouteOnMap() != true) {
        // check route is in cache
        if (checkRouteInCache() === true) {
          // route is already in the cache and should be pulled from there
          fillRouteFromCache();
          e.target.reset();
        } else {
          // finally, try to hit the API
          try {
            fetchRoute();
            e.target.reset();
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        // route is already on the map and nothing should happen
        e.target.reset();
        console.log("already on the map");
      }
    } else {
      console.log("that route doensn't exist bub");
      e.target.reset();
    }
  };

  // update Searchbar state to reflect param typed in
  const updateParam = (e) => {
    setParam(e.target.value);
  };

  const DataList = () => {
    return (
      <datalist id="routes">
        {routeNames.map((route) => (
          <option>{route}</option>
        ))}
      </datalist>
    );
  };

  return (
    <div className="exploremap__search">
      <span className="icon">⚲</span>
      <form className="exploremap__form" onSubmit={submitRoute}>
        <input
          type="search"
          id="search"
          onChange={updateParam}
          placeholder="Search Bus Route"
          list="routes"
        />
        <button type="submit" value="Add Route" className="exploremap__submit">
          Add
        </button>
      </form>
      <DataList />
    </div>
  );
};

export default SearchBar;
