import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import Flag from "./Flag";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id } = city;
  return (
    <Link className={styles.cityItem} to={`${id}`}>
      <li className={styles.cityItem}>
        <span className={styles.emoji}>
          <Flag flag={emoji} />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </li>
    </Link>
  );
}

export default CityItem;
