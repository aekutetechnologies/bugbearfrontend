import { useState } from "react";
import { likeComment } from "../../../util/api";

export default function ReplyItem({
  postId,
  parentCommentId,
  reply,
  updatePostInFeed,
}) {
  const [localLikes, setLocalLikes] = useState(reply.likes.length);
  const [accessToken, setAccessToken] = useState(null);

  // Fetch user token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAccessToken(token);
  }, []);

  const handleLikeReply = async () => {
    try {
      const updatedPost = await likeComment(postId, reply.id, accessToken);
      const updatedParent = updatedPost.comments.find((c) => c.id === parentCommentId);
      if (updatedParent && updatedParent.replies) {
        const updatedReply = updatedParent.replies.find((r) => r.id === reply.id);
        setLocalLikes(updatedReply.likes.length); // Update local likes count
      }
      updatePostInFeed(updatedPost); // Propagate changes
    } catch (error) {
      console.error("Failed to like reply:", error);
    }
  };

  return (
    <div className="pl-40 mb-5">
      <div className="d-flex align-items-center mb-5">
        <div className="image-box mr-10">
          <img
            src={reply.comment_user.profile_picture || "/assets/imgs/default-avatar.png"}
            alt={reply.comment_user.username}
            style={{ width: 25, height: 25, borderRadius: "50%" }}
          />
        </div>
        <div>
          <strong>{reply.comment_user.username}</strong>
        </div>
      </div>
      <div className="mb-5">{reply.body}</div>
      <button className="btn btn-grey-small mr-5" onClick={handleLikeReply}>
        <i className="fa fa-thumbs-up" /> Like ({localLikes})
      </button>
    </div>
  );
}
