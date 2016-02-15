
import React from 'react-native'
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  PixelRatio,
  TouchableOpacity,
  DeviceEventEmitter,
  Component
} = React

import {PLAY_STATUS } from './MusicConstant'
var RCTAudio =require('react-native-player')
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var Subscribable = require('Subscribable');
var deviceHeight = Dimensions.get('window').height;
var barMarginTop=deviceHeight-64-200-90-20;
module.exports = React.createClass({
  getInitialState() {
      return {
          url: this.props.url,
      };
  },
  mixins: [Subscribable.Mixin],
 componentWillMount: function() {
     this.addListenerOn(RCTDeviceEventEmitter,
                      'error',
                      this.onError);
     this.addListenerOn(RCTDeviceEventEmitter,
                      'end',
                      this.onEnd);
     this.addListenerOn(RCTDeviceEventEmitter,
                      'ready',
                      this.onReady);
 },
 componentDidMount(){
      //playSong(this.state.url);
 },
  playSong(url) {
     RCTAudio.prepare(url, true);
 },
  pause(){
    RCTAudio.pause();
  },
  stop() {
    RCTAudio.stop();
  },
  resume() {
    RCTAudio.resume();
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainter} />
        <View style={styles.btnContainter}>
              <TouchableOpacity onPress={()=>this.pause()} >
                  <View style={styles.musicBtnWarp}>
                     <Text  style={styles.musicBtn}>暂停</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.playSong(this.state.url)}>
                 <View style={styles.musicBtnWarp}>
                    <Text style={styles.musicBtn} >播放</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.stop()} >
                  <View style={styles.musicBtnWarp}>
                     <Text  style={styles.musicBtn}>停止</Text>
                  </View>
              </TouchableOpacity>


        </View>
      </View>
    )
  }

});
var styles = StyleSheet.create({
  container: {
     flex:1,
     backgroundColor: '#3a3f41',
     marginTop:64,
  },
  cardContainter: {
       flexDirection: 'row',
        alignSelf: 'center',
       justifyContent:'center',
       backgroundColor: '#ffffff',
       width:200,
       height:200,
       marginTop:40
  },
  btnContainter: {
       flexDirection: 'row',
       alignSelf: 'center',
       justifyContent:'center',
       width:200,
       marginTop:barMarginTop
  },
   musicBtnWarp : {
    	borderWidth : 1,
    	borderColor : '#f39c12',
      width:90,
      height:60,
      marginLeft:10,
      justifyContent:'center',
    	borderRadius :5
    },
    musicBtn : {
      alignSelf:'center',
      justifyContent:'center',
      fontSize:15,
    	color : '#ffffff'
    }
})
