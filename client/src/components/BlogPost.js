import React from "react";
import { Link } from "react-router-dom";

import { formatISO9075 } from "date-fns";

const BlogPost = ({ Postdata }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${Postdata._id}`}>
          <img
            src={"http://localhost:8000/" + Postdata.cover}
            alt="Not Avail"
          />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${Postdata._id}`}>
          <h2>{Postdata.title}</h2>
        </Link>
        <p className="info">
          <Link to={"/"} className="author">
            {Postdata.author.username}
          </Link>
          <time>{formatISO9075(new Date(Postdata.createdAt))}</time>
        </p>
        <p className="summary">{Postdata.summary}</p>
      </div>
    </div>
  );
};

export default BlogPost;
