import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import { Photos } from "./Gallary";

import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";

import { useTranslation } from "react-i18next";   // ✅ ADD

function Gallery() {

  const [index, setIndex] = useState(-1);
  const { t } = useTranslation();   // ✅ ADD

  return (
    <div className="container">

      {/* ✅ FIXED */}
      <h1 className="text-center m-4">
        {t("gallery")}
      </h1>

      <PhotoAlbum
        layout="rows"
        photos={Photos}
        targetRowHeight={160}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        slides={Photos}
        close={() => setIndex(-1)}
      />

    </div>
  );
}

export default Gallery;
