//Import axios
import axios from "axios";

//Public method
/**
 * Description: handle post method for url with header and body
 * @param {string} url
 * @param {object} header
 * @param {object} body
 * @return {null}
 */
const post = (url = "", header = {}, body = "") =>
  axios
    .post(url,body, header)
    .then(handleResponse)
    .catch(error);

/**
 * Description: handle post method for url with header and body
 * @param {string} url
 * @param {object} header
 * @param {object} body
 * @return {null}
 */
const get = (url = "", header = {}, body = "") =>
  axios
    .get(url, body, header)
    .then(handleResponse)
    .catch(error);

//Private Methods
/**
 * Description: Handle callback for success response
 * @param {object} _response
 * @return {object}
 */
const handleResponse = _response => {
  return _response;
};

/**
 * Description: Handle callback for error
 * @param {object} _error
 * @return {object}
 */
const error = _error => {
  return _error;
};

//export APIService
export const APIService = { post, get };
