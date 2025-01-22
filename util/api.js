import API_BASE_URL from "./config";

// Utility function to add token to API requests
export const fetchWithToken = async (url, options = {}, token) => {
  try {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchWithToken:", error);
    throw error;
  }
};


export const fetchProfileData = async (token) => {
  return await fetchWithToken("user/user-details/", { method: "GET" }, token);
};

export const fetchCandidateDetails = async (id, token) => {
  return await fetchWithToken(`user/candidate/${id}/`, { method: "GET" }, token);
};

export const fetchJobApplicants = async (id, token) => {
  return await fetchWithToken(`jobs/applicants/${id}/`, { method: "GET" }, token);
};

export const fetchPosts = async (page, limit) => {
  try {
    if (!page || !limit) {
      page = 1;
      limit = 5;
    }
    const response = await fetch(`${API_BASE_URL}posts/?page=${page}&limit=${limit}`, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export async function createPost({ content, images, token }) {
  const formData = new FormData();
  formData.append("content", content);
  console.log("images", images);

  images.forEach((image) => {
    console.log("image", image);
    formData.append("image", image);
  });

  return await fetchWithToken(
    "posts/",
    {
      method: "POST",
      body: formData,
    },
    token
  );
}


export async function likePost(postId, token) {
  return await fetchWithToken(`posts/${postId}/like/`, { method: "POST" }, token);
}


export async function replyPost(postId, commentText, token) {
  try {
    const response = await fetchWithToken(
      `posts/comments/${postId}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: commentText }),
      },
      token
    );
    return response;
  } catch (error) {
    console.error("Error adding comment to post:", error);
    throw error;
  }
}

export async function likeComment(postId, commentId, token) {
  try {
    const response = await fetchWithToken(
      `posts/like/${commentId}/`,
      { method: "POST" },
      token
    );
    return response;
  } catch (error) {
    console.error("Error liking/unliking comment:", error);
    throw error;
  }
}

export async function replyComment(postId, commentId, replyText, token) {
  try {
    const response = await fetchWithToken(
      `posts/comments/update/${commentId}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: replyText }),
      },
      token
    );
    return response;
  } catch (error) {
    console.error("Error replying to comment:", error);
    throw error;
  }
}

export async function fetchComments(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}posts/comments/${postId}/`, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}
  

export async function fetchPostDetails(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}posts/${postId}/`, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
}