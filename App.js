import React, { Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Animated} from 'react-native';

export default class App extends Component{

  constructor () {
    super()
    this.animation = new Animated.Value(0)
  }

  state = {
    img : require('./assets/cara.png'),
    moeda : ''
  }

  startAnimation = () =>{
    this.animation.setValue(0)
    Animated.timing(this.animation, {
      toValue: 1080,
      duration: 1000
    }).start();
  }

  trocarMoeda = () => {

    this.startAnimation();

    let randomImages = [
      require('./assets/cara.png'),
      require('./assets/coroa.png'),
    ];
  
    let img = randomImages[Math.floor(Math.random()*randomImages.length)];
    let moeda = img == 1 ? 'cara' : 'coroa';

    this.setState({
      img : img,
      moeda : moeda
    })
  }

  render(){

      const rotateInterpolate = this.animation.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "360deg"],
      })
   
      const animatedStyles = {
        transform: [
          {
            rotateY : rotateInterpolate
          }
        ]
      }

      return (
        <View style={styles.container}>
          <Text style={styles.texto}>Cara e Coroa</Text>
          <Text style={styles.texto}>Toque na moeda para jogar</Text>
    
          <TouchableOpacity onPress={this.trocarMoeda}> 
            <Animated.Image style={[styles.img, animatedStyles]} source={this.state.img}></Animated.Image>
          </TouchableOpacity>

          <Text style={styles.texto}>{this.state.moeda == '' ? '' : 'Você tirou: '+this.state.moeda}</Text>
      </View>
    );
  }
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00cc44',
    alignItems: 'center',
    justifyContent: "center",
  },
  img: {
    width: 300,
    height: 300
  },
  texto: {
    fontSize: 30,
    color: '#FFFF',
    paddingBottom: 30
  }
});
