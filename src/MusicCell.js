'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} = React;
var Player = require('./MusicPlayer');
var styles = StyleSheet.create({
    container: {
    	flex : 1,
    	padding : 10,
        flexDirection: 'row',
        borderBottomColor : '#eeeeee',
        borderBottomWidth : 1,
        backgroundColor: '#ffffff',
    },
    musicListImg : {
    	width : 110,
    	height : 110,
    	marginRight: 15
    },
    musicInfo : {
    	flex : 1,
    	flexDirection : 'column'
    },
    musicTit : {
    	fontSize : 16,
    	height : 40,
    	fontWeight : '700',
    	color : '#000000',
      textAlign: 'left',
      marginTop: 10,
      marginRight: 10,
    },
    musicRow : {
    	flexDirection : 'row',
    	alignItems: 'center',
    	marginTop : 5,
    	marginBottom : 10
    },
    oPrice : {
    	fontSize : 12,
    	color : '#b0b0b0'
    },
    musicExtra : {
    	flexDirection :'row',
    	alignItems: 'center',
    	justifyContent : 'space-between'
    },
    musicSold : {
    	color : '#b0b0b0'
    },
    musicBtnWarp : {
    	borderWidth : 1,
    	padding : 5,
    	borderColor : '#f39c12',
    	borderRadius : 3
    },
    musicBtn : {
    	color : '#f39c12'
    }

});

module.exports = React.createClass({
  getInitialState() {
      return {
          cellloaded: false,
          url:'',
          title:'',
      };
  },
  handleUrl(url,fileName) {
      this.props.navigator.push({
           title: fileName,
           component: Player,
           backButtonTitle: '返回',
           passProps: {
             url: url,
             title:fileName,
             player:Player,
           }
         });
  },
  fetchData(hash) {
      var apiUrl = 'http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=' +hash;
      console.log(apiUrl);
      fetch(apiUrl)
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
                //url:responseData.url,
                //title:responseData.fileName,
                cellloaded: true,
            });
            if(this.state.cellloaded){
               return  this.handleUrl(responseData.url,responseData.fileName);
            }
        })
        .catch(error =>
            this.setState({
                cellloaded: true,
                url:'',
                title:'',
            }))
        .done();
  },

	render() {
		var info = this.props.info;
		return (
				<View style={styles.container}>
					<Image style={styles.musicListImg} source={require('image!icon_music')} />
					<View style={styles.musicInfo}>
						<Text style={styles.musicTit} numberOfLines={2}>{info.filename}</Text>
						<View style={styles.musicRow}>
							<Text style={styles.oPrice}>&yen;{info.singername}</Text>
						</View>
						  <View style={styles.musicExtra}>
							    <Text style={styles.musicSold}>{info.duration}秒</Text>
                 <TouchableOpacity onPress={()=> this.fetchData(info.hash)}>
						  	  <View style={styles.musicBtnWarp}>
								    <Text style={styles.musicBtn}>立即播放</Text>
						   	 </View>
                </TouchableOpacity>
					  	</View>

					</View>
				</View>
		);
	}
})
