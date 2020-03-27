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
				.catch(err => {
					throw err
				})
		}
	})
}

const post = (endpoint, data, auth = '') => {
	return axios
		.post(endpoint, data, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth}`
			}
		})
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}

export { get, post }
