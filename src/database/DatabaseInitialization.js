/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import SQLite from "react-native-sqlite-storage";
import { DATABASE } from "./Constants";
//var SQLite = require('react-native-sqlite-storage')
const database_name = DATABASE.FILE_NAME;
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

export default class DatabaseInitialization {

  initDB() {
    let db;
    return new Promise((resolve) => {
      console.log("Checando plugin de integridade ...");
      SQLite.echoTest()
      .then(() => {
        console.log("Verificação de integridade concluída ...");
        console.log("Abrindo banco de dados ...");
        SQLite.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size
        )
        .then(DB => {
          db = DB;
          console.log("Banco de dados ABERTO");
          db.executeSql('SELECT 1 FROM Lista LIMIT 1').then(() => {
              console.log("Banco de dados pronto ... executando requisição ...");
          }).catch((error) =>{
              console.log("Erro recebido: ", error);
              console.log("Banco de dados ainda não está pronto ... preenchendo dados");
              db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS Lista (cod_lista, texto, prioridade)');
              }).then(() => {
                  console.log("Tabela criada com sucesso");
              }).catch(error => {
                  console.log(error);
              });
          });
          resolve(db);
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        console.log("Falha no echoTest - plugin não funcional");
      });
    });
  }
}
