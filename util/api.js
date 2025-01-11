// util/api.js

import API_BASE_URL from "./config";

export const fetchProfileData = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}user/user-details/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching profile data:", error);
        throw error;
    }
};

export const fetchCandidateDetails = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}user/candidate/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,  // Pass token in Authorization header
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch candidate details");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching candidate details:", error);
        throw error;
    }
};

export const fetchJobApplicants = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}jobs/applicants/${id}/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch applicants: ${response.status}`);
        }

        const applicants = await response.json();
        return applicants;
    } catch (error) {
        console.error("Error fetching job applicants:", error);
        throw error;
    }
};


export async function fetchPosts() {
    const res = await fetch(`${API_BASE_URL}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return await res.json();
  }
  
  export async function createPost(text, images) {
    // Convert images to form-data or handle them however your API expects
    // For simplicity, assume images can be base64 or not used.
    const formData = new FormData();
    formData.append("text", text);
    images.forEach((file) => formData.append("images", file));
  
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to create post");
    return await res.json();
  }
  
  export async function likePost(postId) {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to like post");
    return await res.json();
  }
  
  export async function replyPost(postId, commentText) {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: commentText }),
    });
    if (!res.ok) throw new Error("Failed to comment on post");
    return await res.json();
  }
  
  export async function likeComment(postId, commentId) {
    const res = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments/${commentId}/like`,
      { method: "POST" }
    );
    if (!res.ok) throw new Error("Failed to like comment");
    return await res.json();
  }
  
  export async function replyComment(postId, commentId, replyText) {
    const res = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments/${commentId}/reply`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: replyText }),
      }
    );
    if (!res.ok) throw new Error("Failed to reply to comment");
    return await res.json();
  }