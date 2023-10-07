/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import RNFS from "react-native-fs"
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {ArViewerView} from 'react-native-ar-viewer';
import {Platform} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  // var RNFS = require('react-native-fs');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [localModelPath, setLocalModelPath] = React.useState<string>();
  const [showArView, setShowArView] = React.useState(true);
  const ref = React.useRef() as React.MutableRefObject<ArViewerView>;

  const loadPath = async () => {
    const modelSrc ='https://github.com/riderodd/react-native-ar/blob/main/example/src/dice.glb?raw=true'

    const modelPath = `${RNFS.DocumentDirectoryPath}/model.glb`;
    console.log("modelPath",modelPath);
    
    const exists = await RNFS.exists(modelPath);
    if (!exists) {
      await RNFS.downloadFile({
        fromUrl: modelSrc,
        toFile: modelPath,
      }).promise;
    }

    setLocalModelPath(modelPath);
  };
  

  React.useEffect(() => {
    loadPath();
  },[]);

  console.log(localModelPath);
  
  // console.log(require("./assets/salam.png"));

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <ArViewerView
        style={{flex: 1}}
        model={localModelPath}
        lightEstimation
        manageDepth
        allowRotate
        allowScale
        allowTranslate
        disableInstantPlacement
        onStarted={() => console.log('started')}
        onEnded={() => console.log('ended')}
        onModelPlaced={() => console.log('model displayed')}
        onModelRemoved={() => console.log('model not visible anymore')}
        planeOrientation="both"
      />
      {/* <Image source={require("./assets/salam.png")}></Image> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
   flex:1
  }
});

export default App;
