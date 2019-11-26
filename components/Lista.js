/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableHighlight,
 } from 'react-native';

export default class Lista extends Component {
    //state = {  }
    render() {
        return (
          <FlatList style={styles.lista}
                keyExtractor={item => item.cod_lista}
                data={this.props.dados}
                scrollEnabled={true}
                onEndReachedThreshold={0.1}
                renderItem={ ({item}) =>
                  <View style={styles.item}>
                    <Text style={styles.itemTexto}>{item.texto}</Text>
                    <TouchableHighlight style={styles.itemBotao}
                        underlayColor={'gray'} onPress={()=>{this.props.deletaItemCallback(item.cod_lista);}}>
                        <Text style={styles.textoBotao}>X</Text>
                    </TouchableHighlight>
                  </View>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
  item: {
      justifyContent: 'center',
      padding: 5,
      margin: 3,
      height: 100,
      backgroundColor: '#F6F6F6',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#CCC',
      flexDirection: 'row',
    },
    itemTexto: {
      flex: 1,
      marginLeft: 15,
    },
    itemBotao: {
      backgroundColor: 'red',
      height: 30,
      width: 30,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0,
      },
    },
    lista: {
      //
    },
    textoBotao: {
      fontSize: 10,
      color: 'white',
    },
});
