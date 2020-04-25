import dynamic from "next/dynamic";
import "../public/static/sass/styles.scss";
import SearchBar from "../components/SearchBar";
import Tags from "../components/Tags";
import { RouteProvider } from "../components/RouteContext";
import { CSSTransition } from "react-transition-group";

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const Home = (props) => (
  // wrap everything in the route provider to allow for
  // them to access the state with all the routes
  // note <Tags> now has a transition group for animations,
  // so no div is required
  <CSSTransition in={true} appear={true} timeout={1200} classNames="fade">
    <RouteProvider>
      <div className="exploremap" tabindex="0">
        <div className="titlebar">
          <h1>Better Bus</h1>
          <p>See where the bus can take you. Easily.</p>
        </div>
        <div className="stripes" />

        <div className="exploremap__body">
          <div className="exploremap__map">
            <MapWithNoSSR />
          </div>
          <div className="exploremap__search">
            <SearchBar />
          </div>
          <Tags />
        </div>

        <footer className="site-footer">Footer Section</footer>
      </div>
    </RouteProvider>
  </CSSTransition>
);

export default Home;
