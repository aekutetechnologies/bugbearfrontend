import { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import PostItem from "../components/Feed/PostItem";
import NewPostForm from "../components/Feed/NewPostForm";
import { fetchProfileData, fetchPosts } from "../util/api";
import { set } from "date-fns";
import PostModal from "../components/Feed/PostModal";

export default function Feed() {
  const [selectedTab, setSelectedTab] = useState("Trending");
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userToken, setUserToken] = useState(null); // State to store user token
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false); // To track loading state
  const [page, setPage] = useState(1); // For pagination
  const [hasMorePosts, setHasMorePosts] = useState(true); // Flag to indicate if more posts are available

  // Fetch user token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setUserToken(token);
  }, []);

  const loadPosts = async () => {
    if (loading || !hasMorePosts) return; // Avoid multiple simultaneous loads

    setLoading(true); // Start loading
    try {
      const profile = await fetchProfileData(userToken);
      setProfileData(profile);

      // Fetch posts with pagination
      const data = await fetchPosts(page, 5);

      // Check if data exists and update state
      if (data?.results) {
        setPosts((prevPosts) => [...prevPosts, ...data.results]);
        setHasMorePosts(data.next !== null);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch posts on token change and page change
  useEffect(() => {
    if (userToken) loadPosts();
  }, [userToken, page]); // Fetch posts when page or userToken changes

  // Handle scrolling and trigger fetching of more posts
  const handleScroll = useCallback((event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 1;
    if (bottom && !loading && hasMorePosts) {
      setPage((prevPage) => prevPage + 1); // Increment page to load more posts
    }
  }, [loading, hasMorePosts]);

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post at the top of the feed
  };

  const handleCancel = () => {
    setShowModal(false);
    loadPosts(); // Reload posts after canceling
    console.log("Post creation canceled");
  };

  const handlePostSubmit = () => {
    console.log("Post submitted");
    loadPosts(); // Reload posts after submitting
    setShowModal(false); // Close modal after submitting the post
  };

  return (
    <Layout>
      <section
        className="section-box mt-30"
        style={{
          borderTop: "1px solid #e1e1e1",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div className="container-fluid" style={{ flex: 1, display: "flex" }}>
          <div className="row w-100">
            {/* LEFT SIDEBAR */}
            <aside className="col-lg-3 col-md-4 col-sm-12 fixed-left p-4 bg-white border-r"
                  style={{
                    borderRight: "1px solid #e1e1e1",  // Add this line for the vertical border
                  }}>
              <div className="space-y-6">
                {/* Profile Section */}
                <div className="text-center p-4 border rounded-lg shadow-sm" style={{ border: "1px solid #e1e1e1" }}>
                  <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={profileData?.profile_pic_url || "/assets/imgs/default-avatar.png"}
                    alt="avatar"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  </div>
                  <h2 className="font-semibold text-lg">{profileData?.first_name}</h2>
                  <p className="text-sm text-gray-600 mb-2">{profileData?.email}</p>
                  <p className="text-sm text-gray-500">{profileData?.city}, {profileData?.country}</p>
                  <div className="text-sm text-primary mt-2">{profileData?.phone}</div>
                </div>

                {/* Profile Stats */}
                <div className="space-y-2 p-4 border-t border rounded-lg shadow-sm" style={{ border: "1px solid #e1e1e1" }}>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Profile viewers</span>
                    <span className="text-primary">55</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Post impressions</span>
                    <span className="text-primary">65</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN FEED SECTION */}
            <div
              className="col-lg-6 col-md-8 col-sm-12 pt-3 pb-3 no-scrollbar"
              style={{
                borderRight: "1px solid #e1e1e1",
                height: "100vh",
                overflowY: "auto",
              }}
              onScroll={handleScroll}
            >

              {/* "Begin Posting" input area */}
              <div className="d-flex align-items-center mb-4">
                {/* (Optional) Profile avatar */}
                <img
                  src={profileData?.profile_pic_url || "/assets/imgs/default-avatar.png"}
                  alt="avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                {/* Clicking this opens the modal */}
                <input
                  type="text"
                  placeholder="Begin Posting"
                  className="form-input"
                  style={{ cursor: "pointer" }}
                  onFocus={() => setShowModal(true)}
                  readOnly
                />
                {/* Or a separate Post button if you prefer */}
                <button
                  className="btn btn-default btn-find font-sm ml-2"
                  onClick={() => setShowModal(true)}
                >
                  Post
                </button>
              </div>

              {/* FEED ITEMS */}
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))
              ) : (
                <div className="spinner-container">
                  <div className="spinner"></div> {/* Spinner Animation */}
                </div>
              )}

              {loading && (
                <div className="spinner-container mt-3">
                  <div className="spinner"></div>
                </div>
              )}

              {/* Show when no more posts */}
              {!hasMorePosts && !loading && (
                <p className="text-center mt-3">No more posts to load.</p>
              )}

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-3 col-md-12 col-sm-12 pt-3 pb-3">
              {/* Trending Posts */}
              <div className="p-3">
                <h5>Trending Posts</h5>
                <ul className="list-unstyled mt-3">
                  {posts.slice(0, 5).map((post, i) => (
                    <li
                      key={i}
                      className="mb-2 pb-2"
                      style={{ borderBottom: "1px solid #e1e1e1" }}
                    >
                      <a href={`/post/${post.id}`}>
                        {post.content.length > 100
                          ? `${post.content.slice(0, 100)}...`
                          : post.content}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Modal for Creating a New Post */}
      <PostModal
  isOpen={showModal} // Corrected prop name
  onClose={handleCancel}
  onSubmit={handlePostSubmit}
/>

    </Layout>
  );
}
