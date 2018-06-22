import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { FlatList } from 'react-native-gesture-handler';

class MyListItem extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {points: 0}
    this.addPoints = this.addPoints.bind(this);
  }

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
        <View
          style={{
            flexDirection: 'row',
            height: 100,
            padding: 20,
        }}>
          <Text style={{ color: textColor }}>
            {this.props.title}
          </Text>
          <Text>__{this.state.points}</Text>
          <Button title="+1" onPress={ () => {this.addPoints(1)}} />
          <Button title="+5" onPress={ () => {this.addPoints(5)}}  />
          <Button title="+10" onPress={ () => {this.addPoints(10)}}  />
          <Button title="-" onPress={() => {this.addPoints(-1)}}  />
        </View>
    );
   
  }

  addPoints(pts) {
    this.setState({points: this.state.points + pts});  
  }

  
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
   constructor(props)
   {
     super(props);
     this.state = {
       players: [{id: 1, name: "Player 1", points: 0}]
     }
     this.addPlayer = this.addPlayer.bind(this);
   }

   addPlayer()
   {
     this.setState({
       players: [...this.state.players, this._newPlayer(this.state.players.length+1)]
       });
   }
 
   _newPlayer(nbr)
   {
     return {name: 'Player '+nbr, points: 0}
   }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>Board game points</Text>
            <Button 
              title="Add"
              onPress= {this.addPlayer}/>
          </View>

          <View style={styles.getStartedContainer}>
           <FlatList 
             data={this.state.players}
             renderItem={this._renderItem}
           />
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );


  }


  _onAdd(pts) {
    this.props.points += pts;
  }

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      title={item.name}
      points={item.points} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
