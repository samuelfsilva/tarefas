/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableHighlight,
 } from 'react-native';
 import { Icon } from 'react-native-elements';

export default class Lista extends Component {
    //state = {  }
    exibePrioridade(valor) {
      console.log('Prioridade > ',valor,typeof valor);
      switch (valor) {
        case 1:
            return <View style={styles.pBaixa} />;
        case 2:
            return <View style={styles.pMedia} />;
        case 3:
            return <View style={styles.pAlta} />;
      }
    }
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
                    {this.exibePrioridade(item.prioridade)}
                    <Icon
                      reverse
                      name="close"
                      color="red"
                      size={10}
                      onPress={()=>{this.props.deletaItemCallback(item.cod_lista);}} />
                  </View>
                }
            />
        );
    }
}

const tamanhoPrioridade = 20;
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
      fontSize: 40,
      color: 'white',
    },
    pBaixa: {
      width: tamanhoPrioridade,
      height: tamanhoPrioridade,
      borderRadius: tamanhoPrioridade / 2,
      backgroundColor: 'green',
      marginRight: 20,
    },
    pMedia: {
      width: tamanhoPrioridade,
      height: tamanhoPrioridade,
      borderRadius: tamanhoPrioridade / 2,
      backgroundColor: 'orange',
      marginRight: 20,
    },
    pAlta: {
      width: tamanhoPrioridade,
      height: tamanhoPrioridade,
      borderRadius: tamanhoPrioridade / 2,
      backgroundColor: 'red',
      marginRight: 20,
    },
});
