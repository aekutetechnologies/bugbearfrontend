import { useState } from "react";
import CommentItem from "./CommentItem";
import { replyPost } from "../../../util/api";

export default function CommentList({ postId, comments, updatePostInFeed }) {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const updatedPost = await replyPost(postId, commentText.trim());
      // Clear the input and pass new post data upward
      setCommentText("");
      updatePostInFeed(updatedPost);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className="mb-10">
      {/* Existing comments */}
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            postId={postId}
            comment={comment}
            updatePostInFeed={updatePostInFeed}
          />
        ))}

      {/* New Comment Form */}
      <form onSubmit={handleAddComment}>
        <div className="d-flex">
          <textarea
            className="form-input mr-10"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={1}
            style={{
              width: "80%",
              resize: "none",      // Prevent manual resize
              minHeight: "34px",   // Adjust as needed
              maxHeight: "60px",   // Keeps the box from growing too tall
              overflow: "auto",    // Enable scroll if needed
            }}
          />
          <button className="btn btn-grey-small" type="submit">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
