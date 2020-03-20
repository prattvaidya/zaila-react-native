import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const get = endpoint => {
	return SecureStore.getItemAsync('id_token').then(value => {
		if (value) {
			return axios
				.get(endpoint, {
					headers: {
						Authorization: `Bearer ${value}`
					}
				})
				.then(res => res.data.data)
				.catch(err => console.log(err))
		}
	})
}

const post = (endpoint, data) => {
	return axios
		.post(endpoint, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.data)
		.catch(err => console.log(err))
}

export { get, post }
