import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  FlatList
} from 'react-native';

import Firebase from '../api/config'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Spending',
  };

  constructor(props) {
    super(props)
    this.state = {items: null };
    const items = Firebase.database().ref('users/doris')
    items.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        //Convert firebase objects into an array
        const convertedItems = Object.values(data);
        this.setState({items:convertedItems})
      }
      
    })
  }

  shouldComponentUpdate(newProps, newState) {
    const valueFromOtherScreen = newProps.navigation.getParam("passedData", false);

    if (valueFromOtherScreen) {
      alert(valueFromOtherScreen);
    }

    return true;
  }


  render() {

    const date = new Date()

    const testData = this.state.items || [];
    
    const totalAmount = testData
      .map(item => Number(item.price))
      .reduce((acc,value) => acc + value, 0);

    const Card = ({amount = 0, item = "no-name"}) => (
        <View style={{
          padding:20,
          borderWidth:0.5,
          borderColor:"#d6d7da",             
          flexDirection:"row",
          justifyContent:"space-between"}}>
        <Text>{item}</Text>
        <Text>RM {amount}</Text>
      </View>
    )

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          
        <View>
            <View style={{
                borderWidth:0.5,
                padding:20,
                borderColor:"#d6d7da", 
                backgroundColor:"LightGray",}}>
              <Text>{date.toLocaleDateString()}</Text>
            </View>
            {/* <Card amount={8} item={"Food"} /> */}
            {/* <Card /> */}
            <FlatList
              data={testData}
              renderItem={({item}) => (
                <Card amount={Number(item.price).toFixed(2)} item = {item.desc} />
              )}
            />           
          </View>
        </ScrollView>

        {/* <View style={styles.tabBarInfoContainer}> */}
        <View style={styles.staticBottomBar}>
          <Text style={{fontWeight: 'bold'}}>Total</Text>
          <Text style={{fontWeight: 'bold'}}>RM {totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  staticBottomBar: {
      backgroundColor:"pink",
      padding:20,
      flexDirection:"row",
      justifyContent:"space-between",
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  }
});