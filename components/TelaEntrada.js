/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
  } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import Database from '../src/database/Database';

const db = new Database();

export default class TelaEntrada extends Component {
  constructor() {
    super();
    this.state = {
      prioridade: 2,
      valorEntrada: '',
    };
  }

  adicionaLista(valorEntrada, inputEntrada,prioridade) {
    console.log('>> ',this.state.prioridade);
    if (valorEntrada === '') {
      return;
    }
    db.getNovaChave().then((maximo) => {
    let nova = [
      {
        cod_lista: String(maximo),
        texto: valorEntrada,
        prioridade,
      },
    ];
    console.log(nova);
    db.addLista(nova);
  });
  console.log(valorEntrada);
  inputEntrada.clear();
  this.setState({
    valorEntrada: '',
    prioridade: 2,
  });
  Navigation.popToRoot(this.props.componentId);
  }

  setPrioridade(valor) {
    this.setState({
      prioridade: valor,
    });
    console.log(valor);
  }

  render() {
      return (
          <View style={styles.tela}>
              <TextInput style={styles.entrada}
                placeholder="Adicione a tarefa..."
                underlineColorAndroid="transparent"
                ref={input => {this.inputEntrada = input;}}
                onChangeText={texto => {this.setState({valorEntrada: texto});}}
              />
              <View style={styles.areaPrioridade}>
                <Text>Prioridade:</Text>
                <View style={styles.prioridade}>
                  <CheckBox
                    center
                    style={styles.itemPrioridade}
                    title="Baixa"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={this.state.prioridade === 1}
                    onPress={this.setPrioridade.bind(this,1)}
                  />
                  <CheckBox
                    center
                    style={styles.itemPrioridade}
                    title="Média"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={this.state.prioridade === 2}
                    onPress={this.setPrioridade.bind(this,2)}
                  />
                  <CheckBox
                    center
                    style={styles.itemPrioridade}
                    title="Alta"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={this.state.prioridade === 3}
                    onPress={this.setPrioridade.bind(this,3)}
                  />
                </View>
              </View>
              <Button
                title="Salvar"
                onPress={this.adicionaLista.bind(this,this.state.valorEntrada,this.inputEntrada,this.state.prioridade)} />
          </View>
      );
  }
}

const styles = StyleSheet.create({
  tela: {
    marginTop: 20,
    margin: 10,
  },
  entrada: {
    borderBottomWidth: 1,
    borderColor: '#bbb',
    fontSize: 20,
  },
  areaPrioridade: {
    marginVertical: 20,
  },
  prioridade: {
    flexDirection: 'row',
  },
  itemPrioridade: {
    //
  },
});
