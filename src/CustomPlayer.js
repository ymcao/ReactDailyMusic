'use strict';
var React = require('react-native');
var {
    Image,
    PixelRatio,
    TouchableOpacity,
    StyleSheet,
    Text,
    AlertIOS,
    Dimensions,
    View
    } = React;
import Video from 'react-native-video';
var deviceHeight = Dimensions.get('window').height;
var barMarginTop=deviceHeight-64-160-90-20;
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
       width:200,
       height:160,
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
      height:30,
      marginLeft:10,
      justifyContent:'center',
    	borderRadius :5
    },
    musicBtn : {
      alignSelf:'center',
      justifyContent:'center',
      fontSize:15,
    	color : '#ffffff'
    },
   innerProgressCompleted: {
    height: 6,
    backgroundColor: '#f39c12',
   },
   innerProgressRemaining: {
    height: 6,
    backgroundColor: '#ffffff',
   },
   progress: {
      flex: 1,
      flexDirection:'row',
      borderRadius: 6,
      marginTop:10,
      marginLeft:30,
      marginRight:30,
      overflow: 'hidden',
   },
   musicBtn : {
        alignSelf:'center',
        justifyContent:'center',
        fontSize:18,
        color : '#f39c12'
   }
})
module.exports = React.createClass({
  getInitialState() {
      return {
        paused: false,
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
      }
  },
  videoError() {
  },
  onLoad(data) {
    this.setState({duration: data.duration});
  },
  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  },
  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
       return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
       return 0;
    }
  },
  play() {
        this.setState({
            paused: !this.state.paused
        });
  },

  render() {

        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        var text=this.state.paused ? (
            <Text style={styles.musicBtn}>播放</Text>
          ):
          (
            <Text style={styles.musicBtn}>暂停</Text>
          );
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => {this.setState({paused: !this.state.paused})}}>
              <View style={styles.cardContainter} >
                 {text}
               <Video source={{uri: this.props.url}}
                  rate={this.state.rate}
                  paused={this.state.paused}
                  volume={this.state.volume}
                  muted={this.state.muted}
                  resizeMode={this.state.resizeMode}
                  onLoad={this.onLoad}
                  onProgress={this.onProgress}
                  onEnd={() => { AlertIOS.alert('结束!') }}
                  repeat={false}
                onError={this.videoError}
              />
              </View>
            </TouchableOpacity>

          <View >
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
          </View>
       </View>
      );
    }
})
