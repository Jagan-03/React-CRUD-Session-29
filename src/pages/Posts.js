import React from "react";
import axios from "axios";
import { Collapse } from "@material-ui/core";

const Posts = ({ history }) => {
  
  const [addPost, setAddPost] = React.useState(false);
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [post, setPost] = React.useState({
    posts: [],
    userId: "",
    title: "",
    body: "",
  });

  React.useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { data } = await axios.get(URL);
      setPost((prevValue) => {
        return { ...prevValue, posts: data };
      });
    } catch (error) {
      console.error(error);
    }
  };
  const deletePost = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      const posts = post.posts.filter((post) => post.id !== id);
      setPost((prevValue) => {
        return { ...prevValue, posts };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setPost((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setAddPost(false);
    if (post.id) updatePosts();
    else createPosts();
  };
  const createPosts = async () => {
    try {
      const { userId, title, body } = post;
      const { data } = await axios.post(URL, {
        userId,
        title,
        body,
      });
      const aposts = [...post.posts];
      aposts.push({...data, id : aposts.length + 1});
      setPost({ posts: aposts, userId: "", title: "", body: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const updatePosts = async () => {
    try {
      if(post.id < 100) {
        const { data } = await axios.put(`${URL}/${post.id}`, {
          userId : post.userId,
          title : post.title,
          body : post.body,
          id : post.id,
        })
        console.log(data);
        const posts = post.posts.map((post) => {
          if (post.id === data.id) return data;
          else return post;
        });
        setPost({ posts : posts, userId: "", title: "", body: "" });
      } else {
        const data = {
          userId : post.userId,
          title : post.title,
          body : post.body,
          id : post.id,
        };
        console.log(data);
        const posts = post.posts.map((post) => {
          if (post.id === data.id) return data;
          else return post;
        });
        setPost({ posts : posts, userId: "", title: "", body: "" }); 
      }
    } catch (error) {
      console.error(error);
    }
  };
  const editPost = (e, post) => {
    setPost((prevValue) => {
      return { ...prevValue, ...post };
    });
    setAddPost(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setAddPost(false);
    setPost({ ...post, userId: "", title: "", body: "" });
  };

  const options = [];
  for (let i = 1; i <= 10; i++) {
    options.push(<option value={i} key={i}>{i}</option>);
  }

  return (
    <>
      <div className="posts">
        <div className="post-head d-flex justify-content-between p-4">
          <h1 className="text-light">{addPost ? "Add Post" : "All Posts"}</h1>
          <button
            className="btn btn-warning rounded-circle"
            onClick={() => setAddPost(true)}
          >
            <i className="fas fa-plus text-dark"></i>
          </button>
        </div>
        <Collapse in={addPost}>
          <div className="post-form p-3 bg-light rounded-top">
            <form>
              <div className="form-outline mb-4">
                <select
                  className="form-select"
                  name="userId"
                  id="userId"
                  value={post.userId}
                  onChange={handleChange}
                >
                  <option value="Selected">-- Select User Id</option>
                  {options}
                </select>
              </div>

              <div className="form-outline mb-4">
                <label>
                  Title
                </label>
                <input
                  type="email"
                  id="title"
                  className="form-control border"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label>
                  Body
                </label>
                <textarea
                  className="form-control border"
                  id="body"
                  rows="4"
                  name="body"
                  value={post.body}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* <div className="d-flex"> */}
              <button type="submit" className="btn btn-primary mb-4 ms-2" onClick={handleSubmit}>
                Post
              </button>
              <button className="btn btn-danger mb-4 ms-2" onClick={handleCancel}>
                Cancel
              </button>
              {/* </div> */}
            </form>
          </div>
        </Collapse>
        <table className="table table-light table-striped table-responsive table-hover rounded text-center">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-start">
            {post.posts.map((post, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{post.userId}</th>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <table>
                      <tbody>
                        <tr className="d-flex">
                          <td>
                            <button className="btn ms-3"  onClick={(e) => editPost(e, post)}>
                              <i className="fas fa-pen text-dark"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="btn ms-3"
                            >
                              <i className="fas fa-trash-alt text-danger"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => history.push(`/posts/${post.id}`)}
                              className="btn ms-3"
                            >
                              <i className="fas fa-eye text-primary"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Posts;
