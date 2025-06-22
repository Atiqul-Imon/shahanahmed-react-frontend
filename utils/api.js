import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => response, 
  async (error) => {

    if (error.response && error.response.status === 401) {
      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

   
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const postData = async (url, formData) => {
  try {
    const response = await apiClient.post(url, formData);
    return response.data;
  } catch (error) {
    console.error("postData error:", error);
    return {
      error: true,
      message:
        error.response?.data?.message || `HTTP error! status: ${error.response?.status}`,
      status: error.response?.status,
    };
  }
};

export const uploadPhoto = async (url, formData) => {
  try {
    const response = await axios.post(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
     
      },
    });

    return response.data;
  } catch (error) {
    console.error("uploadPhoto error:", error);
    if (error.response) {
      
      return {
        error: true,
        message:
          error.response.data?.message ||
          `HTTP error! status: ${error.response.status}`,
        status: error.response.status,
      };
    } else {
    
      return {
        error: true,
        message: "Network error or server unreachable",
      };
    }
  }
};


export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    console.error("fetchDataFromApi error:", error);
    return error;
  }
};

export const editData = async (url, updateData, config) => {
  try {
    const response = await apiClient.put(url, updateData, { ...config });
    return response.data;
  } catch (error) {
    console.error("editData error:", error);
    return error.response?.data || { message: "Request failed" };
  }
};

export const deleteData = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error("deleteData error:", error);
    return {
      error: true,
      message:
        error.response?.data?.message || "Failed to delete data",
      status: error.response?.status || 500,
    };
  }
};

export const createBlog = async (formData) => {
  try {
    const response = await apiClient.post('/api/blog/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateBlog = async (id, formData) => {
  try {
    const response = await apiClient.put(`/api/blog/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await apiClient.delete(`/api/blog/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const handleApiError = (error) => {
  console.error("API Error:", error);
  return {
    error: true,
    message: error.response?.data?.message || "An error occurred",
    status: error.response?.status || 500
  };
};





export const updateSnippet = async (id, snippetData) => {
  try {
    const response = await apiClient.put(`/api/snippet/${id}`, snippetData);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteSnippet = async (id) => {
  try {
    const response = await apiClient.delete(`/api/snippet/${id}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};


export const createProject = async (formData) => {
  try {
    const response = await apiClient.post('/api/project/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};


export const updateProject = async (id, formData) => {
  try {
    const response = await apiClient.put(`/api/project/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await apiClient.delete(`/api/project/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const uploadEditorImage = async (formData) => {
  try {
    const response = await apiClient.post('/api/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};