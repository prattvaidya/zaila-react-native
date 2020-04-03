import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';

// Core components
import ZailaText from 'zaila/src/core/ZailaText';

const UserSnippet = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Sunny',
    thumbnailUri: 'zaila/assets/img/snapshot.jpg',
    level: 16
  });

  return (
    <View style={styles.container}>
      <View style={styles.snapshotContainer}>
        <Image
          style={styles.snapshot}
          source={require('zaila/assets/img/user-snapshot.png')}
        />
      </View>
      <View style={styles.levelTextContainer}>
        <ZailaText style={styles.levelText}>Lv.{userInfo.level}</ZailaText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F79839'
  },
  snapshotContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    width: 65,
    height: 65,
    position: 'relative',
    top: 10
  },
  snapshot: {
    width: '100%',
    height: '100%'
  },
  levelTextContainer: {
    backgroundColor: '#421A15',
    width: '80%',
    borderRadius: 5,
    position: 'relative',
    top: 5
  },
  levelText: {
    textAlign: 'center',
    color: 'white'
  }
});

export default UserSnippet;
