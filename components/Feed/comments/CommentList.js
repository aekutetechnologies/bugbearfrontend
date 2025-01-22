import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import { replyPost, fetchComments } from "../../../util/api";
import { Send } from "lucide-react";

export default function CommentList({ postId, updatePostInFeed }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [accessToken, setAccessToken] = useState(null);

  // Fetch user token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAccessToken(token);
  }, []);

  // Fetch comments when the component mounts
  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetchComments(postId);
  
        if (response) {
          setComments(response); // Update the state with fetched comments
        } else {
          console.error("Failed to fetch comments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
      loadComments();
  }, [postId]);
  

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      router.push('/login');
      return;
    }
    if (!commentText.trim()) return;

    try {
      const updatedPost = await replyPost(postId, commentText.trim(), accessToken);
      setCommentText(""); // Clear the input field
      setComments(updatedPost.comments); // Update comments with new data
      updatePostInFeed(updatedPost); // Update the parent feed
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className="mb-10">
      {/* Render existing comments */}
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            border: "1px solid #e1e1e1",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "12px",
          }}
        >
          <CommentItem
            comment={comment}
            postId={postId}
            updatePostInFeed={updatePostInFeed}
          />
        </div>
      ))}

      {/* Add New Comment */}
      {accessToken && (
  <div
    style={{
      padding: "2px", // Add padding around the form
    }}
  >
    <form onSubmit={handleAddComment} style={{ position: "relative" }}>
      <textarea
        className="form-input"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows={1}
        maxLength={200} // Limit to 200 characters
        style={{
          width: "100%", // Full width to hold the icon inside
          resize: "none",
          minHeight: "34px",
          maxHeight: "60px",
          overflow: "auto",
          padding: "8px 60px 8px 8px", // Add right padding for the larger icon
          boxSizing: "border-box",
        }}
      />
      <button
        type="submit"
        style={{
          position: "absolute",
          right: "10px",
          top: "40%", // Adjusted top to shift the icon upwards
          transform: "translateY(-60%)",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        <Send size={36} color="#3C65F5" /> {/* Increased icon size to 36 */}
      </button>
      {/* Show remaining characters */}
      <div style={{ fontSize: "12px", marginTop: "5px", color: "gray" }}>
        {200 - commentText.length} characters remaining
      </div>
    </form>
  </div>
)}



    </div>
  );
}
