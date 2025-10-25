import axios from 'axios';

export const catchAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        console.error("Axios error response:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        throw new Error(`Request failed with status ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Axios error request:", error.request);
        throw new Error("No response received from server.");
      } else {
        // Something else happened in setting up the request
        console.error("Axios error message:", error.message);
        throw new Error(`Error setting up request: ${error.message}`);
      }
    } else {
      // General error
      console.error("Unexpected error:", error);
      throw error;
    }
}