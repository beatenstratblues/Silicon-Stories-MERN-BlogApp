import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/post/" + id).then((respose) => {
      respose.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, [id]);

  async function updatePost(ev) {
    const Data = new FormData();
    Data.set("title", title);
    Data.set("summary", summary);
    Data.set("content", content);
    Data.set("id",id);
    if (file?.[0]) {
      Data.set("file", file?.[0]);
    }
    ev.preventDefault();
    const response = await fetch("http://localhost:8000/post", {
      method: "PUT",
      body: Data,
      credentials:"include",
    });

    if (response.ok) {
      setredirect(true);
    }
  }

  if (redirect) return <Navigate to={"/post/" + id} />;
  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="summary"
        placeholder="Summary..."
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
        }}
      />
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files);
        }}
      />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
};

export default EditPost;
