/**
 * Created by echessa on 4/24/15.
 */

'use strict';

var React = require('react-native');
var REQUEST_URL = 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&page=1&pagesize=15&showtype=1&callback=kgJSONP238513750%3Cspan%20style=%22white-space:pre&keyword=';
var MusicCell = require('./MusicCell');
var {
    Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS
    } = React;

var styles = StyleSheet.create({

    listView: {
        backgroundColor: '#FFFFFF'
    },
    loading: {
        flex: 1,
        marginTop:15,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = React.createClass({

  getInitialState() {
      return {
          dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
          loaded: false,
      };
  },
  componentWillReceiveProps(nextProps) {
        this.setState({
            loaded : false,
        })
        this.fetchData(nextProps.keyword);
    },
    componentDidMount() {
        this.fetchData(this.props.keyword);
    },
    fetchData: function(keyword) {

        var apiUrl = REQUEST_URL + encodeURIComponent(keyword);
        fetch(apiUrl)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data.info),
                    loaded: true,
                });
          })
          .catch(error =>
              this.setState({
                  loaded: true,
              }))
          .done();
    },
    renderRow(info) {
        return (
            <MusicCell info={info}  navigator={this.props.navigator} />
        );
    },
    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <ActivityIndicatorIOS
                    size='large'/>
                <Text>
                    正在加载中...
                </Text>
            </View>
        );
    },
    render() {
          if (!this.state.loaded) {
              return this.renderLoadingView();
          }
          return (
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  style={styles.listView}
                  />
          );
      }
})
