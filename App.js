/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { Navigation } from 'react-native-navigation';
/* const Navigation = require('react-native-navigation'); */
import TelaLista from './components/TelaLista';
import TelaEntrada from './components/TelaEntrada';
//import UmaTela from './components/UmaTela';
//import 'react-native-gesture-handler';

//export default () => {
  Navigation.registerComponent('TelaLista', () => TelaLista);
  Navigation.registerComponent('TelaEntrada', () => TelaEntrada);
  //Navigation.registerComponent('UmaTela', () => UmaTela);

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          id: 'Inicio',
          children: [
            {
              component: {
                name: 'TelaLista',
                options: {
                  topBar: {
                    title: {
                      text: 'Lista de Tarefas',
                      alignment: 'center',
                    },
                    background: {
                      color: 'red',
                    },
                    /* rightButtons: [
                      {
                        id: 'botao',
                        text: 'Teste',
                      },
                    ], */
                  },
                },
              },
            },
          ],
        },
      },
    });
  });

 /*  Navigation.startSingleScreenApp({
    screen: 'UmaTela',
    title: 'Lista de Tarefas',
  });
 */
  /* Navigation.push(this.props.componentId, {
      component: {
        name: 'TelaLista'
      }
  }); */
  /* Navigation.push(this.props.componentId, {
    component: {
      name: 'UmaTela'
    }
}); */

  /* Navigation.push(this.props.componentId, {
    component: {
      name: 'UmaTela',
      passProps: {
        text: 'Lista de Tarefas',
      },
      options: {
        topBar: {
          title: {
            text: 'Pushed screen title',
          },
        },
      },
    },
  }); */
//};