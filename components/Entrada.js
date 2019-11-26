/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Button,
 } from 'react-native';

 export default class Entrada extends Component {
    
      state = {
        valorEntrada: '',
      }
     render() {
         return (
            <View style={styles.areaentrada}>
              <TextInput style={styles.entrada}
                placeholder="Adicione o texto..."
                underlineColorAndroid="transparent"
                ref={input => this.inputEntrada = input}
                onChangeText={texto => this.setState({valorEntrada: texto})} />
              <Button
                color={'black'}
                title="Salvar"
                onPress={() => {
                    this.props.adicionaListaCallback(this.state.valorEntrada,
                      this.inputEntrada);
                    this.setState({valorEntrada: ''});
                  }} />
          </View>
         );
     }
 }

const styles = StyleSheet.create({
    entrada: {
        borderBottomWidth: 1,
        borderColor: '#bbb',
        fontSize: 20,
        flex: 1,
        marginRight: 20,
      },
      areaentrada: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        paddingBottom: 20,
      },
});