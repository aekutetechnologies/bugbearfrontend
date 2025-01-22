import { useState, useEffect } from "react";
import { likeComment, replyComment } from "../../../util/api";
import ReplyItem from "./ReplyItem";
import { ArrowLeft, MoreHorizontal, MessageCircle, Heart, Bookmark, Share2 } from "lucide-react";

export default function CommentItem({ postId, comment, updatePostInFeed }) {
  const [localLikes, setLocalLikes] = useState(comment.likes.length);
  const [replyText, setReplyText] = useState("");
  const [token, setToken] = useState(null);

  // Fetch user token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setToken(token);
  }, []);

  const handleLikeComment = async () => {
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const updatedPost = await likeComment(postId, comment.id, token);
      const updatedComment = updatedPost.comments.find((c) => c.id === comment.id);
      setLocalLikes(updatedComment.likes.length); // Update local likes
      updatePostInFeed(updatedPost); // Update the parent feed
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  return (
    <div className="pl-20 mb-10">
      {/* Comment Header */}
      <div className="d-flex align-items-center mb-5">
        <div className="image-box mr-10">
          <img
            src={comment.comment_user.profile_pic_url || "/assets/imgs/default-avatar.png"}
            alt={comment.comment_user.first_name}
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          />
        </div>
        <div>
          <strong>{comment.comment_user.first_name}</strong>
        </div>
      </div>

      {/* Comment Body */}
      <div className="mb-5">{comment.body}</div>

      {/* Like Button */}
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
          style={{ color: localLikes > 0 ? "#ff4d4f" : "#6c757d", fontSize: "14px", cursor: "pointer" }}
          onClick={handleLikeComment}
        >
          <Heart size={18} color={localLikes > 0 ? "#ff4d4f" : "#6c757d"} /> {localLikes} likes
        </span>
      </div>
    </div>
  );
}
