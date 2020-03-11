import { StyleSheet } from 'react-native'

const colors = {
	bdazzledBlue: '#276180',
	seaBuckthorn: '#F79839',
	claret: '#88163B',
	carnationPink: '#FFA8BF',
	negroni: '#FFDBBF'
}

const globalStyles = StyleSheet.create({
	titleText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333'
	},
	paragraph: {
		marginVertical: 8,
		lineHeight: 20
	},
	container: {
		flex: 1,
		padding: 20
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 18,
		borderRadius: 6
	},
	errorText: {
		color: 'crimson',
		fontWeight: 'bold',
		marginBottom: 10,
		marginTop: 6,
		textAlign: 'center'
	},
	widget: {
		backgroundColor: 'hotpink',
		position: 'absolute',
		bottom: 40,
		right: 0,
		padding: 10
	},
	textCenter: {
		textAlign: 'center'
	},
	textWhite: {
		color: 'white'
	},
	container: {
		flex: 1,
		padding: 20
	},
	titleText: {
		fontSize: 18,
		color: '#333'
	}
})

export { globalStyles }
