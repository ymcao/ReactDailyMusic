/**
 * Tmall 3c Fp Page
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Component,
  TouchableOpacity,
  ScrollView,
  View
} = React;

var MusicList = require('./MusicList');
var SearchMusic = require('./SearchMusic');
var Tabs = require('./MusicTabNar');
var MainApp =  React.createClass({

    getInitialState() {
        return {
            keyword :'刘德华',
        };
    },
    handleSearchList(keyword) {
        this.setState({
            keyword : keyword,
        })
    },
    render() {
        var keyword = this.state.keyword;
        return (
            <View style={{flex : 1}}>
                <ScrollView  >
                    <SearchMusic />
                    <View style={{height : 3, backgroundColor : '#F2F2F2'}} />
                    <Tabs handleSearchList={this.handleSearchList} />
                    <MusicList keyword={keyword} navigator={this.props.navigator} />

                </ScrollView>
            </View>
        );
    }
});
module.exports=MainApp;
