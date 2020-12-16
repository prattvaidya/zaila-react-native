// React and React Native
import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Services
import { get } from "zaila/src/services/zaila-api.js";

// Core components
import ZailaText from "zaila/src/core/ZailaText";

// Components
import Loading from "zaila/src/shared/Loading";
import MuseumInfo from "zaila/src/tabs/Home/components/MuseumDetail/MuseumInfo";

// Other
import { formatDate } from "zaila/src/shared/Helper";
import { colors } from "zaila/styles/global";

const MuseumDetail = ({ route, navigation }) => {
  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  const [museum, setMuseum] = useState(undefined);
  const [museumInfo, setMuseumInfo] = useState(undefined);

  useEffect(() => {
    get(`api/museum/${route.params.museumId}`)
      .then((res) => {
        console.log("Museum Detail", res);
        setMuseum(res);

        // Bundle the properties that need to be sent to the MuseumInfo component
        // The following code cherry picks the properties that are needed
        setMuseumInfo(
          (({ name, imageURL, address, city, province, museum_category }) => ({
            name,
            imageURL,
            address,
            city,
            province,
            museum_category,
          }))(res.museum)
        );
        // console.log(museumInfo)
      })
      .catch((err) => console.log(err));
  }, []);

  const padding = (exhibitionId, scroll, index) => {
    const y = museum.museum.exhibitionsList.find(
      (exhibition) => exhibition.exhibitionId === exhibitionId
    ).y;
    const pos = y - scroll;
    const cutoff = 400;
    return {
      marginLeft:
        !y && index > 2
          ? "50%"
          : pos > cutoff
          ? `${110 - (cutoff / pos) * 100}%`
          : 0,
    };
  };

  const descVisibility = (exhibitionId, scroll, index) => {
    const y = museum.museum.exhibitionsList.find(
      (exhibition) => exhibition.exhibitionId === exhibitionId
    ).y;
    return {
      display: y - scroll > 325 || (!y && index > 2) ? "none" : "flex",
    };
  };

  const imgAlignment = (exhibitionId, scroll, index) => {
    const y = museum.museum.exhibitionsList.find(
      (exhibition) => exhibition.exhibitionId === exhibitionId
    ).y;
    return y - scroll > 325 || (!y && index > 2)
      ? { justifyContent: "center" }
      : {};
  };

  const imgInnerAlignment = (exhibitionId, scroll, index) => {
    const y = museum.museum.exhibitionsList.find(
      (exhibition) => exhibition.exhibitionId === exhibitionId
    ).y;
    return y - scroll > 325 || (!y && index > 2)
      ? { flex: 1, alignItems: "center", marginTop: 40 }
      : {};
  };

  const headerInnerAlignment = (exhibitionId, scroll, index) => {
    const y = museum.museum.exhibitionsList.find(
      (exhibition) => exhibition.exhibitionId === exhibitionId
    ).y;
    return y - scroll > 325 || (!y && index > 2)
      ? { alignSelf: "center", marginLeft: 0 }
      : {};
  };

  const headerFont = (exhibitionId, scroll, index) => {
    const y = museum.museum.exhibitionsList.find(
      (exhibition) => exhibition.exhibitionId === exhibitionId
    ).y;
    return y - scroll > 325 || (!y && index > 2)
      ? { fontSize: 12, textAlign: "center" }
      : { fontSize: 14 };
  };

  const addrFont = (exhibitionId, scroll, index) => {
    const y = museum.museum.exhibitionsList.find(
      (exhibition) => exhibition.exhibitionId === exhibitionId
    ).y;
    return y - scroll > 325 || (!y && index > 2)
      ? { fontSize: 10 }
      : { fontSize: 14 };
  };

  return !museum || !museumInfo ? (
    <Loading />
  ) : (
    <View>
      <MuseumInfo museum={museumInfo} />
      <View>
        <ZailaText style={styles.header} weight="bold">
          Current Exhibitions
        </ZailaText>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            setScrollOffsetY(event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
          style={styles.exhibitionsContainer}
        >
          {museum.museum.exhibitionsList.map((exhibition, index) => (
            <TouchableOpacity
              key={exhibition.exhibitionId}
              onPress={() => {
                navigation.navigate("ExhibitionDetail", {
                  exhibitionId: exhibition.exhibitionId,
                });
              }}
              onLayout={(event) => {
                museum.museum.exhibitionsList.find(
                  (ex) => ex.exhibitionId === exhibition.exhibitionId
                ).y = event.nativeEvent.layout.y;
                setMuseum(museum);
              }}
            >
              <View
                style={[
                  styles.exhibition,
                  padding(exhibition.exhibitionId, scrollOffsetY, index),
                ]}
              >
                <View
                  style={[
                    styles.exhibitionHeader,
                    headerInnerAlignment(
                      exhibition.exhibitionId,
                      scrollOffsetY,
                      index
                    ),
                  ]}
                >
                  <ZailaText
                    style={[
                      styles.exhibitionName,
                      headerFont(exhibition.exhibitionId, scrollOffsetY, index),
                    ]}
                    weight="semiBold"
                  >
                    {exhibition.name.toUpperCase()}
                  </ZailaText>
                </View>
                <View
                  style={[
                    styles.exhibitionInfo,
                    imgAlignment(exhibition.exhibitionId, scrollOffsetY, index),
                  ]}
                >
                  <View
                    style={[
                      styles.exhibitionImgWrapper,
                      imgInnerAlignment(
                        exhibition.exhibitionId,
                        scrollOffsetY,
                        index
                      ),
                    ]}
                  >
                    <Image
                      style={styles.exhibitionImg}
                      source={{ uri: exhibition.imageURL }}
                    />
                  </View>
                  <View
                    style={[
                      styles.exhibitionDescWrapper,
                      descVisibility(
                        exhibition.exhibitionId,
                        scrollOffsetY,
                        index
                      ),
                    ]}
                  >
                    <ZailaText
                      style={[
                        headerFont(
                          exhibition.exhibitionId,
                          scrollOffsetY,
                          index
                        ),
                        styles.exhibitionDate,
                      ]}
                    >
                      {formatDate(exhibition.startDate)} -{" "}
                      {formatDate(exhibition.endDate)}
                    </ZailaText>
                    <ZailaText
                      style={[styles.paraTextSize, styles.exhibitionDesc]}
                    >
                      {exhibition.description.substring(0, 150)}...more
                    </ZailaText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    paddingTop: 5,
    textAlign: "center",
    color: colors.bdazzledBlue,
  },
  exhibitionsContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  exhibition: {
    marginBottom: 15,
  },
  alignCenter: {
    textAlign: "center",
  },
  exhibitionHeader: {
    backgroundColor: colors.claret,
    padding: 5,
    borderRadius: 10,
    zIndex: 1,
    alignSelf: "flex-start",
    marginLeft: 95,
    position: "absolute",
    borderColor: colors.seaBuckthorn,
    borderWidth: 1.5,
  },
  exhibitionName: {
    fontSize: 18,
    color: "white",
  },
  paraTextSize: {
    fontSize: 12,
  },
  exhibitionInfo: {
    flex: 1,
    flexDirection: "row",
  },
  exhibitionDate: {
    color: colors.bdazzledBlue,
  },
  exhibitionImgWrapper: {
    flexBasis: "20%",
    zIndex: 2,
  },
  exhibitionImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.seaBuckthorn,
    zIndex: 3,
  },
  exhibitionDescWrapper: {
    backgroundColor: "white",
    padding: 10,
    paddingTop: 40,
    paddingLeft: 50,
    flexBasis: "75%",
    flexGrow: 1,
    zIndex: 0,
    borderRadius: 10,
    marginTop: -5,
    marginLeft: -15,
    justifyContent: "space-between",
    width: "95%",
    borderColor: colors.seaBuckthorn,
    borderWidth: 1.5,
  },
  exhibitionDesc: {
    color: colors.bdazzledBlue,
  },
});

export default MuseumDetail;
