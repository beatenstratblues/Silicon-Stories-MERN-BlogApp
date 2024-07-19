import React from "react";

const BlogPost = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://techcrunch.com/wp-content/uploads/2017/09/vitalik-buterin-147a2578.jpg?resize=2048,1365"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>Ethereum co-founder’s warning against ‘pro-crypto’ candidates:</h2>
        <p className="info">
          <a href="" className="author">
            Jatin Singh
          </a>
          <time>2023-01-01 16:45</time>
        </p>
        <p className="summary">
          Vitalik Buterin, the co-founder of Ethereum, issued a warning on
          Wednesday against choosing a candidate purely based on whether they
          claim to be “pro-crypto.”
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
