import React, { useContext } from "react";
import Tag from "./Tag";
import { RouteContext } from "./RouteContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Tags = props => {
  const [routes, setRoutes] = useContext(RouteContext);

  // the CSSTransition needs to sit outside the component
  // end result is the <button> element will get the
  // move-enter, move-enter-active, move-exit, move-exit-active
  // classes added alongside its class "tag"
  return (
    <TransitionGroup className="exploremap__tags">
      {routes.activeRoutes.map(route => (
        <CSSTransition
          key={props.RouteID}
          timeout={500}
          classNames="move"
          key={route.RouteID}
        >
          <Tag RouteID={route.RouteID} key={route.RouteID} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Tags;
