
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  View,
  AlertIOS
} = React;

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from './ScrollableTabBar';
import {SONGERS} from './MusicConstant'

var styles = StyleSheet.create({
  container: {
     flex: 1,
     height: 50,
     backgroundColor: '#fff',
     borderBottomWidth: 1,
     borderBottomColor: '#e3e3e3'
    },
    item: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      borderLeftColor: '#e3e3e3'
    },

    itemText : {
      fontSize: 14,
      color: '#adadad',

  },
});

module.exports = React.createClass({

    getInitialState() {
        return {
            activeCatId : 0,
        };
    },
    handleCateChange(cateId,keyword) {
        this.setState({
            activeCatId : cateId,
            keyword: keyword
        });
        this.props.handleSearchList && this.props.handleSearchList(keyword);
    },
   renderItems() {
     var me=this;
       return SONGERS.map(function(g,i){
           return(
             <TouchableOpacity key={i} style={[styles.item, {
               'borderLeftWidth': i === 0 ? 0 : 1,
               'borderBottomWidth': me.state.activeCatId === g.code ? 2 : 1,
               'borderBottomColor': me.state.activeCatId === g.code ? '#f39c12' : '#e3e3e3'
             }]} onPress={()=> me.handleCateChange(g.code,g.name)}>
                   <Text  style={styles.itemText}>{g.name}</Text>
             </TouchableOpacity>
           );
       })

   },
  render() {
        return (
          <View style={{flex : 1,flexDirection : 'row'}}>
           <ScrollView
             ref={'scrollView'}
             contentContainerStyle={styles.container}
             showsHorizontalScrollIndicator={false}
             horizontal={true}>
             {this.renderItems()}
        </ScrollView>
       </View>
      );
    }
})
