import React from "react";

export default function Banner() {
  return (
    <div class="banner">
      <iframe
        className="home-banner"
        src="http://www.youtube.com/embed/-vrmc_l6sJY?autoplay=1&mute=1&enablejsapi=1"
      >
        >
      </iframe>
      <div className="banner-content">
        <h1>American Horror Story</h1>
        <span>
          An anthology of stories consisting of a house with a deadly secret, a
          demented asylum, <br></br>a witch coven, an unusual show, a hotel,
          <br></br>a haunted farmhouse, a cult and an apocalypse.
        </span>
      </div>
    </div>
  );
}
