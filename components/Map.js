import MapGL, { Marker, CanvasOverlay } from "react-map-gl";
import React, { useState, useContext, PureComponent } from "react";
import mapboxaccesstoken from "../mapboxaccesstoken";
import "mapbox-gl/dist/mapbox-gl.css";
import { RouteContext } from "./RouteContext";

class PolylineOverlay extends PureComponent {
  _redraw({ width, height, ctx, isDragging, project, unproject }) {
    const {
      points,
      color = "#FF482D",
      lineWidth = 3,
      renderWhileDragging = true
    } = this.props;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    if ((renderWhileDragging || !isDragging) && points) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.beginPath();
      points.forEach(point => {
        const pixel = project([point[0], point[1]]);
        ctx.lineTo(pixel[0], pixel[1]);
      });
      ctx.stroke();
    }
  }

  render() {
    return <CanvasOverlay redraw={this._redraw.bind(this)} />;
  }
}

// main map component is here
const Map = () => {
  const [routes, setRoutes] = useContext(RouteContext);
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: 38.889726473242526,
    longitude: -77.00320124234425,
    zoom: 12.721197192553936
  });

  const _onViewportChange = viewport =>
    setViewPort({ ...viewport, transitionDuration: 20 });

  return (
    <MapGL
      {...viewport}
      mapboxApiAccessToken={mapboxaccesstoken}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onViewportChange={_onViewportChange}
    >
      {routes.activeRoutes.map(route => (
        <PolylineOverlay
          points={route.direction0LatLongs}
          key={route.RouteID}
        />
      ))}
    </MapGL>
  );
};

export default Map;
