import { useState } from "react";
import { createPost } from "../../util/api";

export default function NewPostForm({ onCreatePost, onCancel, token }) {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    console.log("now submitting");
    e.preventDefault();
  
    console.log("Selected images:", selectedImages); // Debugging log
    if (!postContent.trim()) {
      alert("content is required.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await createPost({
        content: postContent.trim(),
        images: selectedImages,
        token,
      });
  
      if (response.ok) {
        const newPost = await response.json();
        onCreatePost(newPost);
        setPostContent("");
        setSelectedImages([]);
      } else {
        const errorData = await response.json();
        console.error("Failed to create post:", errorData);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
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
            rows={2}
            style={{
              resize: "none",
              minHeight: "48px",
              maxHeight: "120px",
            }}
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-10">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <button
            className="btn btn-default btn-find font-sm mr-10"
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
          <button
            className="btn btn-grey-small font-sm"
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
