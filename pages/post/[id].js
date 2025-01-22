import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Use Next.js router for dynamic routing
import Layout from "../../components/Layout/Layout"; // Import Layout component
import { fetchPosts, fetchPostDetails } from "../../util/api"; // Assuming you have an API utility
import { formatDistanceToNow } from "date-fns"; // Import date-fns functions
import CommentList from "../../components/Feed/comments/CommentList"; // Adjust the path accordingly

import {
  ArrowLeft,
  MoreHorizontal,
  MessageCircle,
  Heart,
  Bookmark,
  Share2,
} from "lucide-react";

export default function Post() {
  const router = useRouter();
  const { id } = router.query; // Use router.query to access dynamic URL parameter
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [timeAgo, setTimeAgo] = useState(null);
  const [localLikes, setLocalLikes] = useState(0);

  const handleLike = async () => {
    if (!userToken) {
      router.push("/login");
      return;
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      const updatedPost = await likePost(post.id, accessToken);
      setLocalLikes(updatedPost.likes?.length || 0);
      updatePostInFeed(updatedPost);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  // Fetch user token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setUserToken(token);
  }, []);

  console.log("Post ID:", id);

  // Fetch post details when post ID or userToken changes
  useEffect(() => {
    console.log("Fetching post details...");
    const loadPostDetails = async () => {
      if (!id || loading) return; // Don't load if there's no post ID or if it's already loading

      setLoading(true);
      try {
        // Fetch post details using the post ID from the URL
        const postDetails = await fetchPostDetails(id);
        console.log(postDetails);

        // Update the state with the fetched post details
        setPost(postDetails);

        const response = await fetchPosts(1, 5);
        console.log("posts", response);
        setPosts(response);

        if (postDetails?.created_at) {
          const timeAgoString = formatDistanceToNow(
            new Date(postDetails.created_at),
            {
              addSuffix: true,
            }
          );
          setTimeAgo(timeAgoString);
        }

        if (postDetails?.likes) {
          setLocalLikes(postDetails.likes.length);
        }
      } catch (error) {
        console.error("Failed to fetch post details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadPostDetails(); // Only fetch post details if user is logged in and ID is available
  }, [id]); // Fetch post details when ID or userToken changes

  if (loading) {
    return <div className="spinner-container mt-3">
    <div className="spinner"></div> 
  </div>; // Display loading indicator while fetching data
  }

  if (!post) {
    return <div>Post not found</div>; // Display a message if post is not found
  }

  // Update the post in the feed (could be an API call or state update)
  const updatePostInFeed = (updatedPost) => {
    // For example, you could update the post list in your parent component here
    setPost(updatedPost);
  };

  return (
    <Layout>
      <section
        className="section-box mt-30"
        style={{
          borderTop: "1px solid #e1e1e1",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="container-fluid">
          <div className="row">
            {/* LEFT SIDEBAR */}
            <div
              className="col-lg-2 col-md-3 col-sm-12"
              style={{ borderRight: "1px solid #e1e1e1", minHeight: "80vh" }}
            >
              <nav className="p-3">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <a href="#" className="d-flex align-items-center">
                      <i className="fa fa-home mr-2" />
                      <span>Home</span>
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#" className="d-flex align-items-center">
                      <i className="fa fa-newspaper mr-2" />
                      <span>News</span>
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#" className="d-flex align-items-center">
                      <i className="fa fa-podcast mr-2" />
                      <span>Pods</span>
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#" className="d-flex align-items-center">
                      <i className="fa fa-rocket mr-2" />
                      <span>Startup Showcase</span>
                    </a>
                  </li>
                  <li className="mb-3">
                    <a href="#" className="d-flex align-items-center">
                      <i className="fa fa-bell mr-2" />
                      <span>Notifications</span>
                    </a>
                  </li>
                </ul>
                <div className="mt-5">
                  <button className="btn btn-grey-small">Switch theme</button>
                </div>
                <div className="mt-3">
                  <small>
                    <a href="#">Blog</a> · <a href="#">Feedback</a> ·{" "}
                    <a href="#">Privacy</a> <br />
                    Community Guidelines
                  </small>
                </div>
              </nav>
            </div>

            {/* MAIN POST SECTION */}
            <div
              className="col-lg-6 col-md-9 col-sm-12 pt-3 pb-3"
              style={{
                borderRight: "1px solid #e1e1e1",
                height: "100vh",
                overflowY: "auto",
              }}
            >
              {/* User Info */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                <img
                  src={
                    post.user?.profile_pic_url ||
                    "/assets/imgs/default-avatar.png"
                  }
                  alt={`${post.user?.first_name || "User"}'s profile`}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: "12px",
                  }}
                />
                <div>
                  <h5 style={{ fontSize: "16px", margin: 0 }}>
                    {post.user?.first_name || "Anonymous"}
                  </h5>
                  <span style={{ color: "#6c757d", fontSize: "12px" }}>
                    {timeAgo}
                  </span>
                </div>
              </div>
              <MoreHorizontal size={20} color="#6c757d" />
            </div>

            {/* Content Section */}
            <div style={{ marginBottom: "12px" }}>
              <h6
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                {post.title}
              </h6>
              <p
                style={{ fontSize: "14px", color: "#495057", marginBottom: 0 }}
              >
                {post.content}
              </p>

              {post.post_image_url && (
                <div style={{ marginTop: "12px" }}>
                  <img
                    src={post.post_image_url}
                    alt="Post Image"
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Actions Section */}
            <div
              className="d-flex align-items-center justify-content-between"
              style={{
                borderTop: "1px solid #e6e6e6",
                paddingTop: "12px",
                marginTop: "12px",
              }}
            >
              <span
                className="d-flex align-items-center gap-1"
                style={{
                  color: "#6c757d",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <MessageCircle size={18} color="#6c757d" /> {post.comments?.length} replies
              </span>
              <span
                className="d-flex align-items-center gap-1"
                style={{
                  color: localLikes > 0 ? "#ff4d4f" : "#6c757d",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={handleLike}
              >
                <Heart
                  size={18}
                  color={localLikes > 0 ? "#ff4d4f" : "#6c757d"}
                />{" "}
                {localLikes} likes
              </span>
              <span
                className="d-flex align-items-center gap-1"
                style={{
                  color: "#6c757d",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <Share2 size={18} color="#6c757d" /> Share
              </span>
            </div>

            {/* Replies Section */}
            <div style={{ marginTop: "20px" }}>
              {/* Check if there are replies */}
              {post.comments?.length > 0 ? (
                <>
                  <h3>Replies</h3>
                </>
              ) : (
                <p>No replies</p>
              )}
            </div>

            {/* Comment Section */}
            <div style={{ marginTop: "20px" }}>
              <CommentList
                postId={post.id}
                updatePostInFeed={updatePostInFeed} // Pass the function to update the post in the feed
              />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-lg-4 col-md-12 col-sm-12 pt-3 pb-3">
              <div className="p-3">
              <h5>Trending Posts</h5>
              <ul className="list-unstyled mt-3">
              {posts.results.map((post, i) => (
                <li
                key={i}
                className="mb-2 pb-2"
                style={{ borderBottom: "1px solid #e1e1e1" }}
                >
                <a href={`/post/${post.id}`}>{post.content.length > 100
              ? `${post.content.slice(0, 100)}...`
              : post.content}</a>
                </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </section>
    </Layout>
  );
}
