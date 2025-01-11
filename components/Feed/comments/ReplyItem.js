import { useState } from "react";
import { likeComment, replyComment } from "../../../util/api";

export default function ReplyItem({
  postId,
  parentCommentId,
  reply,
  updatePostInFeed,
}) {
  const [localLikes, setLocalLikes] = useState(reply.likes);

  // If you want to let users reply to a reply (nested threads), you'd do it here.
  // For this example, we only show likes on a reply.

  const handleLikeReply = async () => {
    try {
      // We'll use the same likeComment API if your backend handles "reply" as a nested comment
      const updatedPost = await likeComment(postId, reply.id);
      // Find the updated parent comment
      const updatedParent = updatedPost.comments.find((c) => c.id === parentCommentId);
      if (updatedParent && updatedParent.replies) {
        // Find the updated reply
        const updatedReply = updatedParent.replies.find((r) => r.id === reply.id);
        setLocalLikes(updatedReply.likes);
      }
      updatePostInFeed(updatedPost);
    } catch (error) {
      console.error("Failed to like reply:", error);
    }
  };

  return (
    <div className="pl-40 mb-5">
      <div className="d-flex align-items-center mb-5">
        <div className="image-box mr-10">
          <img
            src={reply.userImage || "/assets/imgs/default-avatar.png"}
            alt={reply.userName}
            style={{ width: 25, height: 25, borderRadius: "50%" }}
          />
        </div>
        <div>
          <strong>{reply.userName}</strong>
        </div>
      </div>
      <div className="mb-5">{reply.text}</div>
      <button className="btn btn-grey-small mr-5" onClick={handleLikeReply}>
        <i className="fa fa-thumbs-up" /> Like ({localLikes})
      </button>
    </div>
  );
}
