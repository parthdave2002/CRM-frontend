import axios from "axios";

// default
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url, params ) => {
    let response;

    let paramKeys = [];

    if(params){
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key])
        return paramKeys;
    });
    
      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
        response = axios.get(`${url}`, params);
    }

    return response;
  }
  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url,params) => {
    let response;

    let paramKeys = [];

    if(params){
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key])
        return paramKeys;
    });
    
      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.delete(`${url}?${queryString}`);
    } else {
        response = axios.delete(`${url}`);
    }

    return response;
  };

  postMultipart = async (url, body) => {
    try {   
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTljNzk2MzAyMmU4MzUyYzYwZDViZiIsIm5hbWUiOiJkZXZhcnNoaSB0aXZlZGkiLCJlbWFpbCI6ImRldmFyc2hpLnRyaXZlZGlAY21hcml4LmNvbSIsImlhdCI6MTczOTE4Mzk3OSwiZXhwIjoxNzM5NjE1OTc5fQ.TOftLzkcHwE4TasvyVS5PxrM7E1IathTfNYaoKZ8Wx4";
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error("Error:", error);
  
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/");
        toast.error("Token expired");
      }
  
      throw error;
    }
  };
}
const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };