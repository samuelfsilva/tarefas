/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View,
  } from 'react-native';
import Entrada from './Entrada';
import Database from '../src/database/Database';

const db = new Database();

export default class TelaEntrada extends Component {

    adicionaLista(valorEntrada, inputEntrada) {
        if (valorEntrada === '')
          return;
    
          console.log(valorEntrada);
        let nova = [
          //...this.state.lista,
          {
            cod_lista: String(this.state.lista.length),
            texto: valorEntrada,
          },
        ];
    
        //this.setState({
          //dados: nova,
        //});
        db.addLista(nova);
    
        inputEntrada.clear();
        //this.getLista();
      }

    render() {
        return (
            <View>
                <Entrada adicionaListaCallback={this.adicionaLista.bind(this)} />
            </View>
        );
    }
}
