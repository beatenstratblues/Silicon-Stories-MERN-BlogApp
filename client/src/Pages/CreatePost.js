import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setredirect] = useState(false);

  async function createNewPost(ev) {
    const Data = new FormData();
    Data.set("title", title);
    Data.set("summary", summary);
    Data.set("content", content);
    Data.set("file", file[0]);

    ev.preventDefault();
    const response = await fetch("http://localhost:8000/post", {
      method: "POST",
      body: Data,
      credentials:"include",
    });

    if (response.ok) setredirect(true);
  }

  if (redirect) return <Navigate to={"/"} />;
  return (
    <form onSubmit={createNewPost}>
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
      <Editor onChange={setContent} value={content}/>
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
};

export default CreatePost;
