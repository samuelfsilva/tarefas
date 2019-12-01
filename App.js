/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { Navigation } from 'react-native-navigation';
import TelaLista from './components/TelaLista';
import TelaEntrada from './components/TelaEntrada';

  Navigation.registerComponent('TelaLista', () => TelaLista);
  Navigation.registerComponent('TelaEntrada', () => TelaEntrada);

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
                      color: 'white',
                      fontSize: 20,
                    },
                    background: {
                      color: 'red',
                    },
                  },
                },
              },
            },
          ],
        },
      },
    });
  });
