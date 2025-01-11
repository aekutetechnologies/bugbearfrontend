import { useState } from "react";

export default function NewPostForm({ onCreatePost, onCancel }) {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postContent.trim() && selectedImages.length === 0) return;
    onCreatePost(postContent.trim(), selectedImages);
    setPostContent("");
    setSelectedImages([]);
  };

  const handleFileChange = (e) => {
    setSelectedImages([...e.target.files]);
  };

  return (
    <div className="card-grid-2 hover-up p-20">
      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <textarea
            className="form-input"
            rows={2}                    // Reduced rows for a smaller, cleaner look
            style={{
              resize: "none",         // Prevent user from dragging the corner
              minHeight: "48px",      // Adjust as desired
              maxHeight: "120px",     // Keep it from growing too large
            }}
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
        <div className="mb-10">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="form-input"    // Keeps consistent theme styling
          />
        </div>
        <div>
          <button className="btn btn-default btn-find font-sm mr-10" type="submit">
            Post
          </button>
          <button
            className="btn btn-grey-small font-sm"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
