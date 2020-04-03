import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { globalStyles } from 'zaila/styles/global';
import ProfileHeader from 'zaila/src/tabs/Profile/components/ProfileHeader';
import CircleMenu from 'zaila/src/tabs/Profile/components/CircleMenu';

import * as SecureStore from 'expo-secure-store';

import jwtDecode from 'jwt-decode';

//Menu Content
import ZailaSettings from 'zaila/src/tabs/Profile/components/ZailaSettings';
import Settings from 'zaila/src/tabs/Profile/components/Settings';

const ProfileTab = ({ route }) => {
  const [currentMenu, setCurrentMenu] = useState('zaila');
  const [userInfo, setUserInfo] = useState({ name: 'Unknown' });
  const [backgroundPosition, setBackgroundPosition] = useState({
    top: 0,
    right: 0
  });

  useEffect(() => {
    //Get user profile
    SecureStore.getItemAsync('id_token').then((value) => {
      if (value) {
        const info = jwtDecode(value);
        setUserInfo(info.sub);
        SecureStore.setItemAsync('preferLang', info.sub.preferredLanguage);
      }
    });
  }, []);

  const handleSwitchMenu = (menuName) => {
    setCurrentMenu(menuName);
    switch (menuName) {
      default:
      case 'settings':
        setBackgroundPosition({ top: 0, left: 0 });
        break;
      case 'zaila':
        setBackgroundPosition({ top: 0, right: 0 });
        break;
      case 'history':
        setBackgroundPosition({ bottom: 0, left: 0 });
        break;
      case 'badge':
        setBackgroundPosition({ bottom: 0, right: 0 });
        break;
    }
  };

  const renderMenuContent = () => {
    switch (currentMenu) {
      default:
      case 'zaila':
        return <ZailaSettings />;
      case 'settings':
        return <Settings setSignedIn={route.params.setSignedIn} />;
    }
  };

  return (
    <View style={globalStyles.container}>
      <ProfileHeader name={userInfo.name} />
      <View style={{ alignItems: 'center' }}>
        <CircleMenu
          currentMenu={currentMenu}
          handleSwitchMenu={handleSwitchMenu}
          position={backgroundPosition}
        />
      </View>
      {renderMenuContent()}
    </View>
  );
};

export default ProfileTab;
