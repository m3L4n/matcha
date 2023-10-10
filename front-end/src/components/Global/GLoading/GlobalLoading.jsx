import React from "react";
import "GlobalLoading.scoped.css";

export default function GlobalLoading() {
  return (
    <div className="container">
      <div className="container-center-text">
        <div className="lds-heart">
          <div></div>
        </div>
        <h1 className="header text_loading">Loading</h1>
      </div>
    </div>
  );
}
