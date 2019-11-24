/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { Navigation } from 'react-native-navigation';
import TelaLista from './components/TelaLista';
import TelaEntrada from './components/TelaEntrada';
import 'react-native-gesture-handler';

export default () => {
  Navigation.registerComponent('TelaLista', () => TelaLista);
  Navigation.registerComponent('TelaEntrada', () => TelaEntrada);

  Navigation.startSingleScreenApp({
    screen: 'TelaLista',
    title: 'Lista de Tarefas',
  });
};