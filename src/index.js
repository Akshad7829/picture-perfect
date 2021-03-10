import { StrictMode, useState } from "react";
import Typical from "react-typical";
import DownloadLink from "react-download-link";
import ReactDOM from "react-dom";
import ProgressiveImage from "react-progressive-image-loading";
import { LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import download from "./down.png";

import axios from "axios";
import "./styles.css";

function App() {
const {REACT_APP_client_id}=process.env;
  const [photos, setphotos] = useState("");

  const [dark, setMode] = useState(false);
  const [result, getresult] = useState([]);
  function handleChange(event) {
    setphotos(event.target.value);
  }

  function handleSubmit(event) {
    console.log(photos);



    const url =
      `https://api.unsplash.com/search/photos?page=1&per_page=30&count=100&query=` +
      photos +
      `&client_id=${process.env.REACT_APP_client_id}`;
    axios.get(url).then((response) => {
      console.log(response);
      getresult(response.data.results);
    });



      }


  return (
    <div className="body">
      <div className="App">
        <div className="container">
        <Typical
      className="heading"
      steps={[  "Picture Perfect!",5000]}
      loop={Infinity}
      wrapper="h1"
    />



          <div className="form">
            <input
              className="take"
              onChange={handleChange}
              type="text"
              placeholder="search photos E.g:-Car,bikes....."
              name="photos"
            />
            <button className="btn" onClick={handleSubmit} type="submit">
              Search
            </button>

            <div className="card-list">

              {result.map((photos) => (<div className="card">

                  <LazyLoadImage
                    className="image"
                  preview={photos.blur_hash}
                  src={photos.urls.small}


                  border-radius="2px"
                  padding="2%"
                  flex-wrap="wrap"
                  placeholderSrc={photos.blur_hash}
                   effect="blur"/>
            <p className="des">{photos.alt_description}</p>

                  <a className="icon"
                    href={photos.links.download + "?force=true"}

                  ><img  src={download} width="50px"/></a>   </div>
              ))}

            </div>
          </div>
        </div>
        <p className="foot"> Made With 🧡<br/> By Akshad Nayakwadi</p>
      </div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(
  <App />,

  rootElement
);
