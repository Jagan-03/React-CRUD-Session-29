import React from "react";
import axios from "axios";
import { Collapse } from "@material-ui/core";

const Post = ({ match }) => {
  
  const [showComments, setShowComments] = React.useState(false);
  const [post, setPost] = React.useState({
    userId: "",
    title: "",
    body: "",
  });
  const [user, setUser] = React.useState({
    name: "",
    website: "",
    phone: "",
    email: "",
  });
  const [comments, setComments] = React.useState([]);

  const postURL = `https://jsonplaceholder.typicode.com/posts/${match.params.id}`;
  const commentURL = `https://jsonplaceholder.typicode.com/comments`;
  const userURL = `https://jsonplaceholder.typicode.com/users/${post.userId}`;
  
  
  
  const getPost = async () => {
    try {
      const { data } = await axios.get(postURL);
      setPost((prevValue) => {
        return { ...prevValue, ...data };
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await axios.get(userURL);
      setUser((prevValue) => {
        return { ...prevValue, ...data };
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getComments = async () => {
    try {
      const { data } = await axios.get(commentURL);
      const postComments = data.filter((comment) => +(match.params.id) === comment.postId);
      setComments(postComments);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
      getPost();
      getComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
      getUser();
  }, [post]) // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className="post row m-0">
      <div className="col-md-3 user-info mb-5">
        <div className="card bg-dark">
          <img src="/images/avatar.png" className="card-img-top" alt="avatar" />
          <div className="card-body">
            <ul className="list-unstyled text-light">
              <li>{user.name}</li>
              <hr />
              <li>{user.website}</li>
              <hr />
              <li>{user.phone}</li>
              <hr />
              <li>{user.email}</li>
              <hr />
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-9 d-flex flex-column post-info">
        <h1 className="text-info display-3">{post.title}</h1>
        <hr className="bg-white" />
        <img src="https://picsum.photos/800/300" alt="post-pic" className="img-fluid mb-3"></img>
        <h3 className="text-white-50">{post.body}</h3>
        <div className="comments mt-5">
        <hr className="bg-white" />
          <p className="text-white show-comments" onClick={() => setShowComments(!showComments)}>
            {showComments ? "Hide" : "Show"} comments {showComments ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
          </p>
          <Collapse in={showComments}>
          <div className="comments-warpper">
            {comments.map((comment, index) => {
              return <div key={index} className="comment bg-dark rounded p-3 mb-3">
              <h6 className="text-white">{comment.name}</h6>
              <h6 className="text-muted">By : {comment.email}</h6>
              <hr className="bg-white" />
              <p className="text-white-50">{comment.body}</p>
            </div>
            })}
          </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Post;
