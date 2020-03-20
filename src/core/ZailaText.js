import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import * as Font from 'expo-font'

// How to use:
// 1. Import the component
// 2. Pass any styles through the 'style' prop
// 3. Write the text to display inside the opening and closing tags
// 4. Pass the font-weight through the 'weight' prop (Default is regular)
//    Accepted values are 'bold', 'extraBold', 'light', and 'semiBold'

// const ZailaText = ({ children, style, bold = false }) => {
//   const [fontLoaded, setFontLoaded] = useState(false);

//   useEffect(() => {
//     const loadFonts = async () => {
//       await Font.loadAsync({
//         "open-sans-regular": require("zaila/assets/fonts/OpenSans-Regular.ttf"),
//         "open-sans-bold": require("zaila/assets/fonts/OpenSans-Bold.ttf")
//       });
//       setFontLoaded(true);
//     };
//     loadFonts();
//   }, []);

//   return (
//     fontLoaded &&
//     (!bold ? (
//       <Text style={[styles.text, style]}>{children}</Text>
//     ) : (
//       <Text style={[styles.boldText, style]}>{children}</Text>
//     ))
//   );
// };

// const styles = StyleSheet.create({
//   text: {
//     fontFamily: "open-sans-regular",
//     fontSize: 16
//   },
//   boldText: {
//     fontFamily: "open-sans-bold",
//     fontSize: 16
//   }
// });

const ZailaText = ({ bold = false, children, style, weight = 'regular' }) => {
	const [fontLoaded, setFontLoaded] = useState(false)

	useEffect(() => {
		const loadFonts = async () => {
			await Font.loadAsync({
				'open-sans-bold': require('zaila/assets/fonts/OpenSans-Bold.ttf'),
				'open-sans-extraBold': require('zaila/assets/fonts/OpenSans-ExtraBold.ttf'),
				'open-sans-light': require('zaila/assets/fonts/OpenSans-Light.ttf'),
				'open-sans-regular': require('zaila/assets/fonts/OpenSans-Regular.ttf'),
				'open-sans-semiBold': require('zaila/assets/fonts/OpenSans-SemiBold.ttf')
			})
			setFontLoaded(true)
		}
		loadFonts()
	}, [])

	return fontLoaded ? (
		<Text style={[styles.text, style, { fontFamily: `open-sans-${weight}` }, bold && { fontFamily: `open-sans-bold` }]}>
			{children}
		</Text>
	) : (
		<></>
	)
}

const styles = StyleSheet.create({
	text: {
		fontSize: 16
	}
})

export default ZailaText
