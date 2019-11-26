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
      if (valorEntrada === '') {
        return;
      }
      db.getNovaChave().then((maximo) => {
      let nova = [
        {
          cod_lista: String(maximo),
          texto: valorEntrada,
        },
      ];
      db.addLista(nova);
    });
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
