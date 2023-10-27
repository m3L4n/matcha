import React from "react";
import "./UserTags.scoped.css";

export default function UserTags({ allTags, tags, handleChange, ourProfile }) {
  return (
    <div className="container__user-tags">
      <h3 className="title-1"> Tags </h3>
      <ul className="ul__user-tags">
        {allTags?.map((elem, index) => {
          return (
            <button
              key={index}
              value={elem.tag_name}
              name="tags"
              className={tags?.findIndex((tag) => tag == elem.tag_name) > -1 ? "button-select active body" : "button-select body"}
              onClick={handleChange}
              disabled={ourProfile ? false : true}
            >
              {elem.tag_name}
            </button>
          );
        })}
      </ul>
    </div>
  );
}
