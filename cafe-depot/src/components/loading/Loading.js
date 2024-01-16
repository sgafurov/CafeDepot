import loadingGif from "../../assets/icons/loading-video-unscreen.gif";
import "../../styles/Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <img src={loadingGif} alt="searching" />
    </div>
  );
}
