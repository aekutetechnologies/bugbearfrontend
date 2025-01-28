import React, { useState, useEffect } from "react";
import { createPost } from "../../util/api";

const PostModal = ({ isOpen, onClose, onCreatePost }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // Handles multiple images
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null); // State to store user token

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setToken(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!content.trim()) {
      alert("Content is required.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await createPost({
        content: content.trim(),
        images, // This can be an empty array if no images are selected
        token,
      });

      console.log("response", response);
  
      if (response) { 
        const newPost = await response;
        if (onCreatePost) onCreatePost(newPost); // Notify parent component
        setContent("");
        setImages([]); // Reset images state
        onClose();
      } else {
        alert("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages([...e.target.files]); // Convert FileList to an array
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
      onClick={onClose} // Close the modal when clicking the backdrop
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-white w-full max-w-md p-6 rounded shadow-md"
          onClick={(e) => e.stopPropagation()} // Prevent click bubbling
        >
          <h2 className="text-lg font-bold mb-4">Create a Post</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              multiple // Allow selecting multiple images
              onChange={handleImageChange}
              className="mb-4"
            />
            {images.length > 0 && (
              <p className="text-sm text-gray-500 mb-4">
                {images.length} image(s) selected
              </p>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
