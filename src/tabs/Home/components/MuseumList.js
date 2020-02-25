import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";


const MuseumList = ({navigation}) => {
  const [scrollOffsetY, setScrollOffsetY] = useState(0);

  const [museums, setMuseums] = useState([
    {
      title: "Zelda, Breath of Fresh Air",
      desc: "Lorem ipsum",
      key: 1
    },
    {
      title: "Gotta catch them all (again)",
      desc: "Lorem ipsum",
      key: 2
    },
    {
      title: 'Not So "Final Fantasy"',
      desc: "Lorem ipsum",
      key: 3
    },
    {
      title: 'Not So "Final Fantasy2"',
      desc: "Lorem ipsum",
      key: 4
    },
    {
      title: 'Not So "Final Fantasy3"',
      desc: "Lorem ipsum",
      key: 5
    },
    {
      title: 'Not So "Final Fantasy4"',
      desc: "Lorem ipsum",
      key: 6
    },
    {
      title: 'Not So "Final Fantasy5"',
      desc: "Lorem ipsum",
      key: 7
    },
    {
      title: 'Not So "Final Fantasy6"',
      desc: "Lorem ipsum",
      key: 8
    },
    {
      title: 'Not So "Final Fantasy7"',
      desc: "Lorem ipsum",
      key: 9
    },
    {
      title: 'Not So "Final Fantasy8"',
      desc: "Lorem ipsum",
      key: 10
    },
    {
      title: 'Not So "Final Fantasy9"',
      desc: "Lorem ipsum",
      key: 11
    },
    {
      title: 'Not So "Final Fantasy10"',
      desc: "Lorem ipsum",
      key: 12
    },
    {
      title: 'Not So "Final Fantasy11"',
      desc: "Lorem ipsum",
      key: 13
    },
    {
      title: 'Not So "Final Fantasy12"',
      desc: "Lorem ipsum",
      key: 14
    },
    {
      title: 'Not So "Final Fantasy13"',
      desc: "Lorem ipsum",
      key: 15
    }
  ]);

  const padding = (key, scroll) => {
    const y = museums.find(museum => museum.key === key).y;
    return {
      marginLeft: y - scroll > 425 || (!y && key > 8) ? "50%" : 0
    };
  };

  return (
    <View style={styles.museumContainer}>
      <ScrollView
        style={styles.museumList}
        onScroll={event => setScrollOffsetY(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        {museums.map(museum => (
          <TouchableOpacity
            key={museum.key}
            onPress={()=>{navigation.navigate('ExhibitionDetail')}}
            onLayout={event => {
              museums.find(m => m.key === museum.key).y =
                event.nativeEvent.layout.y;
              setMuseums(museums);
            }}
          >
            <View style={[styles.museum, padding(museum.key, scrollOffsetY)]}>
              <Text>{museum.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  museumList: {
    paddingTop: 40
  },
  museum: {
    padding: 15,
    marginTop: 5,
    borderWidth: 2
  }
});

export default MuseumList;
