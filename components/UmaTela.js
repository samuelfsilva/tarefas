/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class UmaTela extends Component {

  render() {
    return (
        <View style={styles.telaAviso}>
          <Text style={styles.aviso}>Nenhuma tarefa inserida.</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  telaAviso: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  aviso: {
    color: '#7f8c8d',
  },
});