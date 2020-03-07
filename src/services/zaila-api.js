import axios from "axios";

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcklkIjoyNywicHJlZmVycmVkTGFuZ3VhZ2UiOiJlbi1VUyIsIm5hbWUiOiJaYWlsYSBVc2VyIiwiZW1haWwiOiJ6YWlsYTEyMzQ1NkB6YWlsYS5jb20iLCJhdXRvUGxheURlc2NyaXB0aW9uIjoxLCJhdXRvRW5yb2xsUXVlc3QiOjEsInVzZXJYUCI6MH0sImlhdCI6MTU4MzU0NTc3OCwiZXhwIjoxNTg0MTUwNTc4fQ.C_7EGjjfLs7JoLkt6TsEsq1vUUuorgbtUj1KgomRwzE';

const get = endpoint => {
  return axios
    .get(endpoint,{
      headers: {
        'Authorization': `Bearer ${JWT}`
      }
    })
    .then(res => {
      console.log(res)
      return res.data.data;
    })
    .catch(err => {
      alert(err);
    });
};

export { get };
