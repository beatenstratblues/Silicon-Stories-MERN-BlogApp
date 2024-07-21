import React from "react";
import { Link } from "react-router-dom";

import {formatISO9075} from "date-fns";

const BlogPost = ({ Postdata }) => {
  return (
    <div className="post">
      <div className="image">
        <img
          src={Postdata.cover}
          alt="Not Avail"
        />
      </div>
      <div className="texts">
        <h2>{Postdata.title}</h2>
        <p className="info">
          <Link to={'/'} className="author">
            Jatin Singh
          </Link>
          <time>{formatISO9075(new Date(Postdata.createdAt))}</time>
        </p>
        <p className="summary">
          {BlogPost.content}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
