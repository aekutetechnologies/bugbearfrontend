import { useState } from "react";
import { likeComment, replyComment } from "../../../util/api";
import ReplyItem from "./ReplyItem";

export default function CommentItem({ postId, comment, updatePostInFeed }) {
  const [localLikes, setLocalLikes] = useState(comment.likes);
  const [replies, setReplies] = useState(comment.replies || []);
  const [replyText, setReplyText] = useState("");

  const handleLikeComment = async () => {
    try {
      const updatedPost = await likeComment(postId, comment.id);
      // Find updated comment in the returned post
      const updatedComment = updatedPost.comments.find((c) => c.id === comment.id);
      setLocalLikes(updatedComment.likes);
      setReplies(updatedComment.replies);
      // Propagate changes up
      updatePostInFeed(updatedPost);
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      const updatedPost = await replyComment(postId, comment.id, replyText.trim());
      setReplyText("");
      // Find updated comment in the returned post
      const updatedComment = updatedPost.comments.find((c) => c.id === comment.id);
      setReplies(updatedComment.replies);
      updatePostInFeed(updatedPost);
    } catch (error) {
      console.error("Failed to reply to comment:", error);
    }
  };

  return (
    <div className="pl-20 mb-10">
      {/* Comment Header */}
      <div className="d-flex align-items-center mb-5">
        <div className="image-box mr-10">
          <img
            src={comment.userImage || "/assets/imgs/default-avatar.png"}
            alt={comment.userName}
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          />
        </div>
        <div>
          <strong>{comment.userName}</strong>
        </div>
      </div>

      {/* Comment Text */}
      <div className="mb-5">{comment.text}</div>

      {/* Like & Reply Buttons */}
      <div className="d-flex align-items-center mb-10">
        <button className="btn btn-grey-small mr-10" onClick={handleLikeComment}>
          <i className="fa fa-thumbs-up" /> Like ({localLikes})
        </button>
      </div>

      {/* Replies */}
      {replies.map((reply) => (
        <ReplyItem
          key={reply.id}
          postId={postId}
          parentCommentId={comment.id}
          reply={reply}
          updatePostInFeed={updatePostInFeed}
        />
      ))}

      {/* Reply Form */}
      <form onSubmit={handleReply}>
        <div className="d-flex mb-5">
          <textarea
            className="form-input mr-10"
            placeholder="Reply..."
            rows={1}
            style={{ width: "70%" }}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button className="btn btn-grey-small" type="submit">
            Reply
          </button>
        </div>
      </form>
      <hr />
    </div>
  );
}
