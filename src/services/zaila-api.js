import axios from "axios";

const get = endpoint => {
  return axios
    .get(endpoint)
    .then(res => {
      return res.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export { get };
