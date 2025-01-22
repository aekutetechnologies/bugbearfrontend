import { useState, useEffect } from "react";
import { likePost } from "../../util/api";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import {
  ArrowLeft,
  MoreHorizontal,
  MessageCircle,
  Heart,
  Bookmark,
  Share2,
} from "lucide-react";

export default function PostItem({ post, updatePostInFeed }) {
  const [localLikes, setLocalLikes] = useState(post?.likes?.length || 0);
  const [showFullContent, setShowFullContent] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const updatedPost = await likePost(post.id, accessToken);
      setLocalLikes(updatedPost.likes?.length || 0);
      updatePostInFeed(updatedPost);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleReplyClick = () => {
    router.push(`/post/${post.id}`); // Redirect to post detail page
  };

  const toggleContent = () => setShowFullContent(!showFullContent);

  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e6e6e6",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "20px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header Section */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <img
            src={post.user?.profile_pic_url || "/assets/imgs/default-avatar.png"}
            alt={`${post.user?.first_name || "User"}'s profile`}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginRight: "12px",
            }}
          />
          <div>
            <h5 style={{ fontSize: "16px", margin: 0 }}>{post.user?.first_name || "Anonymous"}</h5>
            <span style={{ color: "#6c757d", fontSize: "12px" }}>{timeAgo}</span>
          </div>
        </div>
        <MoreHorizontal size={20} color="#6c757d" />
      </div>

      {/* Content Section */}
      <div style={{ marginBottom: "12px" }}>
        <h6 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>{post.title}</h6>
        <p style={{ fontSize: "14px", color: "#495057", marginBottom: 0 }}>
          {showFullContent ? post.content : `${post.content.slice(0, 100)}...`}
          {post.content.length > 100 && (
            <span
              onClick={toggleContent}
              style={{
                color: "#007bff",
                cursor: "pointer",
                marginLeft: "6px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {showFullContent ? "See Less" : "See More"}
            </span>
          )}
        </p>

        {/* Image Section */}
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
          style={{ color: "#6c757d", fontSize: "14px", cursor: "pointer" }}
          onClick={handleReplyClick}
        >
          <MessageCircle size={18} color="#6c757d" /> 1 reply
        </span>
        <span
          className="d-flex align-items-center gap-1"
          style={{ color: localLikes > 0 ? "#ff4d4f" : "#6c757d", fontSize: "14px", cursor: "pointer" }}
          onClick={handleLike}
        >
          <Heart size={18} color={localLikes > 0 ? "#ff4d4f" : "#6c757d"} /> {localLikes} likes
        </span>
        <span
          className="d-flex align-items-center gap-1"
          style={{ color: "#6c757d", fontSize: "14px", cursor: "pointer" }}
        >
          <Share2 size={18} color="#6c757d" /> Share
        </span>
      </div>
    </div>
  );
}
