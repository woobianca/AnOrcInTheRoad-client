import React from 'react';
import { View,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import socket from '../socket/socket';
import {  } from '../actions/actions';

const friends = [
  { id: 2, name: 'Frodo' },
  { id: 3, name: 'Bilbo' },
];

class PartyList extends React.Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(friends),
      modalVisible: true,
      char_id: this.props.user.char_id,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchParty(this.props.user.char_id);
  // }

  renderRow(quest) {
    return (
      <Text>Friend 1</Text>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        
          <ListView
            key={this.props.party}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeperator={this.renderSeperator}
            enableEmptySections={true}
            contentContainerStyle={styles.listView}
          />
         
      </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default PartyList;