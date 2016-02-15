'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Component,
    TouchableHighlight,
    TextInput
} = React;
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop:10,
        marginBottom:10,
    },
    searchContainer: {
        height: 36,
        borderWidth: 1,
        borderColor: '#d5d5d5',
        flex: 1,
        fontSize: 16,
        borderRadius: 4,
        padding:5,
        marginLeft: 5,
        marginRight: 5
    },
    button: {
        width:72,
        height: 36,
        backgroundColor: '#f39c12',
        borderRadius: 8,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center'
    },

});

var SearchMusic=  React.createClass({

  getInitialState() {
      return {
          keyword : '刘德华'
      };
  },
  searchMusic(keyword) {
        this.props.handleSearchList && this.props.handleSearchList(keyword);
  },
  render() {
    var spinner = this.state.isLoading ?
        ( <ActivityIndicatorIOS
            hidden='true'
            size='large'/> ) :
        ( <View/>);
      return (
        <View style={styles.container}>

            <TextInput style={styles.searchContainer} placeholder='输入歌曲或者歌手名字'/>

            <TouchableHighlight style={styles.button}
                                underlayColor='#f1c40f'
                                onPress={()=> this.searchMusic(this.state.keyword)}>
                <Text style={styles.buttonText}>搜索</Text>
            </TouchableHighlight>
            {spinner}
        </View>
      );
  }
});
module.exports=SearchMusic;
