import React, { useState } from "react";
import { View } from "react-native";
import { globalStyles } from "zaila/styles/global";
import ProfileHeader from "zaila/src/tabs/Profile/components/ProfileHeader";
import CircleMenu from "zaila/src/tabs/Profile/components/CircleMenu";

//Menu Content
import ZailaSettings from "zaila/src/tabs/Profile/components/ZailaSettings";
import Settings from "zaila/src/tabs/Profile/components/Settings";

const ProfileTab = () => {
  const [currentMenu, setCurrentMenu] = useState("zaila");

  const handleSwitchMenu = menuName => {
    setCurrentMenu(menuName);
  };

  const renderMenuContent = () => {
    switch (currentMenu) {
      default:
      case "zaila":
        return <ZailaSettings />;
      case "settings":
        return <Settings />;
    }
  };

  return (
    <View style={globalStyles.container}>
      <ProfileHeader name="Sunny" />
      <View style={{ alignItems: "center" }}>
        <CircleMenu
          currentMenu={currentMenu}
          handleSwitchMenu={handleSwitchMenu}
        />
      </View>
      {renderMenuContent()}
    </View>
  );
};

export default ProfileTab;
