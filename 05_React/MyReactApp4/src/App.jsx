import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [postId, setPostId] = useState(1);
  const { post, isLoading } = useMyFetch(
    "https://jsonplaceholder.typicode.com/posts/" + postId,
  );

  return (
    <>
      <div>
        <h2>My Custom Hooks App</h2>
        <button onClick={() => setPostId(1)}>Get Post 1</button>
        <button onClick={() => setPostId(2)}>Get Post 2</button>
        <button onClick={() => setPostId(3)}>Get Post 3</button>
        {isLoading ? (
          "Loading..."
        ) : (
          <div>Post data: {JSON.stringify(post)}</div>
        )}
      </div>
    </>
  );
}

//Custom Hook
function useMyFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});

  async function getPost() {
    setIsLoading((s) => true);
    const response = await fetch(url);
    const jsonResp = await response.json();
    setPost(() => jsonResp);
    setIsLoading((s) => false);
  }

  useEffect(() => {
    getPost();
  }, [url]);

  return { post: post, isLoading: isLoading };
}
