/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Icon } from 'react-native-elements';
import Lista from './Lista';
import Database from '../src/database/Database';

const db = new Database();
export default class TelaLista extends Component {

  constructor(){
    super();
    this.state = {
      valorEntrada: '',
      lista: [],
    };
    //this.getLista();
  }

  /* componentDidMount() {
    this.TelaLista = this.props.navigation.addListener('didFocus', () => {
      //this.getLista();
    });
  } */
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  componentDidAppear() {
    this.getLista();
  }

  telaAdiciona() {
    console.log('Press');
    Navigation.push(this.props.componentId, {
      component: {
        name: 'TelaEntrada',
        options: {
          topBar: {
            title: {
              text: 'Adicionar tarefas',
              alignment: 'center',
            },
            background: {
              color: 'red',
            },
          },
        },
      },
    });
  }

  getLista() {
    let lista = [];
    db.getLista().then((data) => {
      lista = data;
      this.setState({
        lista,
        //isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      //this.setState = {
        //isLoading: false
      //};
    });
  }

  deletaItem(id) {
    db.deleteList(id);
    this.getLista();
  }

  exibeLista() {
    let contador = this.state.lista.length;
    if (contador > 0) {
      return (
        <Lista dados={this.state.lista} deletaItemCallback={this.deletaItem.bind(this)}/>
      );
    } else {
       return (
         <View style={styles.telaAviso}>
          <Text style={styles.aviso}>Nenhuma tarefa inserida.</Text>
         </View>
      );
    }
  }

  render() {
    return (
        <View style={styles.tela}>
          {this.exibeLista()}
          <View style={styles.itemBotao}>
          <Icon
            reverse
            name="add"
            color="red"
            size={30}
            onPress={this.telaAdiciona.bind(this)} />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  cabecalho: {
    backgroundColor: '#a7a7a7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cabecalhoTexto: {
    fontSize: 30,
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
  },
  telaAviso: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  aviso: {
    color: '#7f8c8d',
  },
  itemBotao: {
    position: 'absolute',
    bottom: 20,
    right:20,
  },
  textoBotao: {
    fontSize: 40,
    color: 'white',
    marginBottom: 2,
    marginRight: 1,
  },
});
