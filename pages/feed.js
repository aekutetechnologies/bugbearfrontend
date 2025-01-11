import { useState } from "react";
import Layout from "../components/Layout/Layout";
import PostItem from "../components/Feed/PostItem";
import NewPostForm from "../components/Feed/NewPostForm";

export default function Feed() {
  const [selectedTab, setSelectedTab] = useState("Trending");
  const [showModal, setShowModal] = useState(false);

  // Example post data
  const samplePosts = [
    {
      id: 1,
      userName: "Rudra Narayan Samal",
      userImage: "/assets/imgs/brands/brand-1.png",
      text: "We are thrilled to announce that Evatto Pvt Ltd is now officially recognized under Startup India!",
      images: ["/assets/imgs/posts/sample.png"],
      likes: 13,
      comments: 13,
    },
    {
      id: 2,
      userName: "Abinash Karunanidhi",
      userImage: "/assets/imgs/brands/brand-2.png",
      text: "Is an consultant based AI worth it!?",
      images: [],
      likes: 3,
      comments: 0,
    },
  ];

  return (
    <Layout>
      <section className="section-box mt-30">
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

            {/* MAIN FEED SECTION */}
            <div
              className="col-lg-6 col-md-9 col-sm-12 pt-3 pb-3"
              style={{ borderRight: "1px solid #e1e1e1", minHeight: "80vh" }}
            >
              {/* TAB NAV (Trending / Latest) */}
              <div className="d-flex align-items-center mb-3">
                <ul className="nav nav-tabs border-0">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        selectedTab === "Trending" ? "active" : ""
                      }`}
                      onClick={() => setSelectedTab("Trending")}
                    >
                      Trending
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        selectedTab === "Latest" ? "active" : ""
                      }`}
                      onClick={() => setSelectedTab("Latest")}
                    >
                      Latest
                    </button>
                  </li>
                </ul>
              </div>

              {/* "Begin Posting" input area */}
              <div className="d-flex align-items-center mb-4">
                {/* (Optional) Profile avatar */}
                <img
                  src="/assets/imgs/brands/brand-1.png"
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
              {samplePosts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  updatePostInFeed={(updatedPost) =>
                    console.log("updatePostInFeed called", updatedPost)
                  }
                />
              ))}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4 col-md-12 col-sm-12 pt-3 pb-3">
              {/* Top Users */}
              <div className="mb-3 p-3" style={{ border: "1px solid #e1e1e1" }}>
                <h5>Top Users</h5>
                <div className="d-flex mt-3">
                  {[
                    { name: "User1", avatar: "/assets/imgs/brands/brand-1.png" },
                    { name: "User2", avatar: "/assets/imgs/brands/brand-2.png" },
                    { name: "User3", avatar: "/assets/imgs/brands/brand-3.png" },
                    { name: "User4", avatar: "/assets/imgs/brands/brand-4.png" },
                  ].map((user, index) => (
                    <div
                      className="mr-3 text-center"
                      style={{ cursor: "pointer" }}
                      key={index}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Posts */}
              <div className="p-3" style={{ border: "1px solid #e1e1e1" }}>
                <h5>Trending Posts on Medial</h5>
                <ul className="list-unstyled mt-3">
                  {[
                    "Need feedback on this AI idea...",
                    "Looking for co-founder in EdTech...",
                    "Feature suggestions for polls...",
                    "New startup launching soon...",
                  ].map((postTitle, i) => (
                    <li key={i} className="mb-2">
                      <a href="#">{postTitle}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Modal for Creating a New Post */}
      {showModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
          onClick={() => setShowModal(false)} // closes if clicked outside
        >
          <div
            className="modal-dialog modal-lg"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              width: "600px",
              maxWidth: "90%",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()} // prevent close if clicked inside
          >
            <div className="modal-header p-3 border-bottom">
              <h5 className="mb-0">Create a New Post</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body p-3">
              {/* NewPostForm (or your custom post UI) */}
              <NewPostForm
                onCreatePost={(content, images) => {
                  console.log("Creating new post (modal):", { content, images });
                  // your API call here
                  setShowModal(false);
                }}
                onCancel={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
