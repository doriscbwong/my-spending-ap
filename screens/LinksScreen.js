import React from 'react';
import {Platform, StyleSheet, View, Text, TextInput, TouchableOpacity, DatePickerIOS, DatePickerAndroid } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Spending',
  };

  constructor(props) {
    super(props);
    this.state = {price:0, desc:"", date: null };
  }

  onPressDate = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      this.setState({date: new Date(year, month, day)})
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }


  render() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    return (

        <View style={styles.container}>


            <View>
              <View style={{
                padding:20,
                borderWidth:0.5,
                borderColor:"#d6d7da",             
                flexDirection:"row",
                justifyContent:"space-between"}}>

                <Text>Price (RM)</Text>
                <TextInput
                  style={{height:40,width:100,backgroundColor:"pink"}}
                  onChangeText={(price) => this.setState({price})}
                  keyboardType={"number-pad"}
                />
              </View>
              <View style={{
                padding:20,
                borderWidth:0.5,
                borderColor:"#d6d7da"}}>
                <TextInput
                    style={{height:40,backgroundColor:"pink"}}
                    onChangeText={(desc) => this.setState({desc})}
                    placeholder="Description"
                  />          
              </View>
              <View>
                {
                  Platform.OS === 'ios' ?
                    <DatePickerIOS
                      date={this.state.date}
                      onDateChange={(date) => this.setState({ date })}
                    /> :
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.onPressDate}
                    >
                    
                    <Text>{this.state.date === null ? "Spending Date" : this.state.date.toLocaleDateString('en-GB', options)}</Text>
                    </TouchableOpacity>
                }
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert(JSON.stringify(this.state))}
            >
              <Text>ADD</Text>
            </TouchableOpacity>
          </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection:"column",
    justifyContent:"space-between"
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20
  },
});
