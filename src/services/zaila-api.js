import axios from 'axios'

const JWT =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcklkIjoyNSwicHJlZmVycmVkTGFuZ3VhZ2UiOiJlbi1VUyIsIm5hbWUiOiJSMSIsImVtYWlsIjoickByLmNvbSIsImF1dG9QbGF5RGVzY3JpcHRpb24iOjEsImF1dG9FbnJvbGxRdWVzdCI6MSwidXNlclhQIjowfSwiaWF0IjoxNTg0MjE2ODU3LCJleHAiOjE1ODQ4MjE2NTd9.drsAyo6GEF2XzO4lswBBb3WoCSQlc07_XUcDcQAD_a4'

const get = endpoint => {
	return axios
		.get(endpoint, {
			headers: {
				Authorization: `Bearer ${JWT}`
			}
		})
		.then(res => {
			return res.data.data
		})
		.catch(err => {
			alert(err)
		})
}

export { get }
