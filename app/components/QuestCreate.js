import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Slider, Picker, ScrollView, Image } from 'react-native';
import { Font } from 'exponent';
import MapCreate from './MapQuest';
import Layout from '../constants/Layout';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b9d3c2',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 30,
    fontWeight: '300',
  },
  heading2: {
    fontSize: 20,
    fontWeight: '200',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '100',
    color: 'gray',
  },
  label: {
    marginLeft: 20,
    marginBottom: 0,
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: '200',
     ...Font.style('luminari'),
  },
  image: {
    width: 200,
    height: 200,
  },
  group: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Font.style('luminari'),
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#701616',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#0eb27e',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#333',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 25,
    fontWeight: '600',
    ...Font.style('livingst'),
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    fontSize: 28,
    ...Font.style('luminari'),
  },
  modal: {
    paddingTop: 30,
    paddingBottom: 50,
  },
  picker: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 5,
    paddingBottom: 5,
  },
  map: {
    backgroundColor: '#fff',
    height: Layout.window.height / 2.5,
    width: Layout.window.width / 2,
  },
  scroll: {
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    padding: 35,
  },
  slider: {
    width: Layout.window.width - 30,
    alignSelf: 'center',
  }
});

class QuestCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: null,
      location: null,
      experience: null,
      questType: 'addFetchQuest',
      item_id: null,
      creator_id: null,
      lat: null,
      lng: null,
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onRegionChange(coords) {
    this.setState({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  }

  render() {
    console.log('QUEST CREATE PROPS', this.props);
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
          style={styles.modal}
        >
        <MapCreate style={styles.map} onRegionChange={coords => this.onRegionChange(coords)} />
        <Image style={styles.scroll} source={require('../assets/images/quest-create.png')} >
          <ScrollView contentContainerStyle={styles.modal}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              placeholder="Quest Name"
              value={this.state.name}
              maxLength = {20}
              autoCorrect = {false}
              returnKeyType = {'done'}
            />
          {/*}  <TextInput
              style={styles.input}
              onChangeText={(location) => this.setState({ location })}
              placeholder="Location"
              value={this.state.location}
              maxLength = {150}
              autoCorrect = {false}
              returnKeyType = {'done'}
            /> */}
            <Text style={styles.label}>Experience: {this.state.experience}</Text>
            <Slider
              style={styles.slider}
              step={10}
              minimumValue={0}
              maximumValue={1000}
              secureTextEntry={true}
              onValueChange={(value) => {
                value = Math.floor(value);
                this.setState({ experience: value });
              }}
              onSlidingComplete={(experience) => {
                experience = Math.floor(experience);
                this.setState({ experience });
              }}
            />
            {/*} <TextInput
              style={styles.input}
              onChangeText={(item_id) => this.setState({ item_id })}
              placeholder="Item Reward"
              value={this.state.item_id}
              maxLength = {60}
              autoCorrect = {false}
              returnKeyType = {'done'}
            /> */}   
            <Picker
              selectedValue={this.state.questType}
              onValueChange={(itemValue) => this.setState({ questType: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Fetch Quest" value="addFetchQuest" />
              <Picker.Item label="Battle - Solo" value="addBattleSoloQuest" />
              <Picker.Item label="Battle - Co-op" value="addCoopSoloQuest" />
            </Picker>
            <TouchableOpacity
              onPress={() => {
                this.props.onSubmitQuest(
                  this.state.name,
                  this.state.location,
                  this.state.questType,
                  this.state.experience,
                  this.state.lat,
                  this.state.lng,
                  this.props.user.char_id,
                  this.state.item_id,
                );
                this.setModalVisible(false);
              }}
              style={styles.submitButton}
            >
              <Text style={styles.buttonText}>Add Quest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </Image> 
        </Modal>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}
            style={styles.addButton}
          >
            <Text style={styles.buttonText}>Create New Quest</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default QuestCreate;
