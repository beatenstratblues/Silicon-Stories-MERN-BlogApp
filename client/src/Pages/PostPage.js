import { formatISO9075 } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../UserContext";

const PostPage = () => {
  const params = useParams();
  const [PostInfo, setPostInfo] = useState();
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:8000/post/${params.id}`).then((response) => {
      response.json().then((postData) => {
        setPostInfo(postData);
      });
    });
  }, [params.id]);

  if (!PostInfo) return "";
  return (
    <div className="post-Page">
      <h1>{PostInfo.title}</h1>
      <time>{formatISO9075(PostInfo.createdAt)}</time>
      <div className="author">by @{PostInfo.author.username}</div>
      {userInfo === PostInfo.author.username && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${PostInfo._id}`}>
            Edit this Post
          </Link>
        </div>
      )}
      <div className="image">
        <img
          src={"http://localhost:8000/" + PostInfo.cover}
          alt="img not avail"
        />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: PostInfo.content }}
      />
    </div>
  );
};

export default PostPage;
