import React, { useState } from "react";

const PostModal = ({ isOpen, onClose }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    // Handle post submission logic here, including image upload
    console.log("Submitting post:", { content, image });
    onClose();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
      onClick={onClose} // This closes the modal when clicking the backdrop
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-white w-full max-w-md p-6 rounded shadow-md"
          onClick={(e) => e.stopPropagation()} // Prevent click bubbling
        >
          <h2 className="text-lg font-bold mb-4">Create a Post</h2>
          <textarea
            className="w-full p-2 border rounded mb-4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
