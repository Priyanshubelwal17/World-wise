import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position: {lat},{lng} {setSearchParams}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 80 });
        }}
      >
        Changeboss
      </button>
    </div>
  );
}

export default Map;
