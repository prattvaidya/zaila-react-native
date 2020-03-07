import axios from "axios";

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcklkIjoyOCwicHJlZmVycmVkTGFuZ3VhZ2UiOiJlbi1VUyIsIm5hbWUiOiJTdW5ueSIsImVtYWlsIjoic0BzLmNvbSIsImF1dG9QbGF5RGVzY3JpcHRpb24iOjEsImF1dG9FbnJvbGxRdWVzdCI6MSwidXNlclhQIjowfSwiaWF0IjoxNTgzNTQxNDAxLCJleHAiOjE1ODM1NDUwMDF9.gZQHUkdVkcdSkxgD0hpYiL4BA-fHS40rGssqNsJJ5z4';

const get = endpoint => {
  return axios
    .get(endpoint,{
      headers: {
        'Authorization': `Bearer ${JWT}`
      }
    })
    .then(res => {
      return res.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export { get };
