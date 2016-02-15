/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS,
  Text,
  View
} from 'react-native';
var MainApp = require('./src/MainApp');

var Root = React.createClass({
  /*configureScene(route){
      return Navigator.SceneConfigs.FloatFromRight;
    },
    renderScene(router, navigator){
      var Component = null;this._navigator = navigator;
      switch(router.name){
        case "Home":
          Component = Home;
          break;
        case "WebLoad":
          Component = WebLoad;
          break;
      }
      return <Component params={router.params} navigator={navigator} />
    },*/
    render() {
        return (
          <View style={{flex: 1}}>
            <NavigatorIOS
               style={{flex : 1,backgroundColor: '#ffffff'}}
               tintColor='#f39c12'
               initialRoute={{
                  title: '音乐播放器',
                  component: MainApp,
               }}
               itemWrapperStyle={{backgroundColor: '#ffffff'}}
             />
          </View>
        );


    }
});

AppRegistry.registerComponent('ReactDailyMusic', () => Root);
