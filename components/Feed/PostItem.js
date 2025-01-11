import { useState } from "react";
import { likePost } from "../../util/api";
import CommentList from "./comments/CommentList";

export default function PostItem({ post, updatePostInFeed }) {
  // Local states for immediate UI feedback (optional)
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments || []);

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(post.id);
      // Update local states
      setLocalLikes(updatedPost.likes);
      setComments(updatedPost.comments);
      // Notify parent to sync
      updatePostInFeed(updatedPost);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  // Child comment components will call this to update the entire post
  const handleUpdatePost = (updated) => {
    setLocalLikes(updated.likes);
    setComments(updated.comments || []);
    updatePostInFeed(updated);
  };

  return (
    <div className="card-grid-2 hover-up mb-20">
      <div className="card-block-info p-20">
        {/* Post Header */}
        <div className="d-flex align-items-center mb-15">
          <div className="image-box mr-15">
            <img
              src={post.userImage || "/assets/imgs/default-avatar.png"}
              alt={post.userName}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
          </div>
          <div>
            <h5 className="mb-0">{post.userName}</h5>
            <span className="text-muted text-small">
              {new Date(post.createdAt).toLocaleString() || "Just now"}
            </span>
          </div>
        </div>

        {/* Post Content */}
        <p className="mt-10 mb-10">{post.text}</p>

        {/* Post Images */}
        {post.images && post.images.length > 0 && (
          <div className="mb-10">
            {post.images.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt="Post"
                style={{ maxWidth: "100%", marginRight: "10px" }}
              />
            ))}
          </div>
        )}

        {/* Like & Comment Controls */}
        <div className="d-flex justify-content-between mt-10 mb-10">
          <button className="btn btn-grey-small" onClick={handleLike}>
            <i className="fa fa-thumbs-up" /> Like ({localLikes})
          </button>
          <span>{comments.length} Comment(s)</span>
        </div>

        {/* Comments Section */}
        <CommentList
          postId={post.id}
          comments={comments}
          updatePostInFeed={handleUpdatePost}
        />
      </div>
    </div>
  );
}
