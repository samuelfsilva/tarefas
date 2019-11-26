/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import SQLite from "react-native-sqlite-storage";
import { DATABASE } from "./Constants";

const database_name = DATABASE.FILE_NAME;
/* const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000; */

export default class Database {

  constructor() {
    //super();
    this.db = this.initDB();
    //this.deleteLista();
  }

  dbError(error) {
    //
    throw error;
  }

  deleteLista() {
    this.db.transaction((tx) => {
      tx.executeSql('delete from Lista', []
      ,(_tx, _results) => {
        console.log("Exclusão feita com sucesso!");
      },
      (_e) => {
        //
      });
    });
  }

  successOpenDatabaseCallback(db) {
    console.log("Conectado ao Banco");
    db.transaction((tx) => {
      console.log("Verificando tabelas");
      tx.executeSql("SELECT name FROM sqlite_master WHERE type=? AND name=?",
      ["table","Lista"], (_tx, results) => {
        if (results.rows.length === 0) {
          db.transaction((__tx) => {
            __tx.executeSql('CREATE TABLE IF NOT EXISTS Lista (cod_lista, texto, prioridade)',
            [], (___tx, _results) => {
              console.log("Criando tabela");
            },(_e) => {
              console.log('Erro ao criar tabela!');
            });
          });
        }
      },(_e) => {
        console.log("Erro ao verificar tabelas");
      });
    });
    return db;
  }

  initDB() {
    return SQLite.openDatabase({
        name: database_name,
        location: 'default',
        //createFromLocation: './' + database_name,
        createFromLocation : 1,
      },
      this.successOpenDatabaseCallback
      ,
      this.dbError);
  }

  close() {
    if (this.db) {
      console.log("Closing DB");
      this.db.close()
        .then(_status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  }

  errorCallback(_e) {
    console.log("Erro!");
  }

  getLista() {
    return new Promise((resolve) => {
      const lista = [];
      this.db.transaction((tx) => {
          tx.executeSql('SELECT cod_lista, texto, prioridade FROM Lista', [],
          (_tx, results) => {
            console.log("Requisição completa" + results.rows.length);
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log(row.texto + " - " + row.cod_lista);
              const { cod_lista, texto, prioridade } = row;
              lista.push({
                cod_lista,
                texto,
                prioridade,
              });
            }
            resolve(lista);
          },
          this.errorCallback
          );
      });
    });
  }

  getNovaChave() {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
          tx.executeSql('SELECT COALESCE(MAX(cod_lista),0) as maximo FROM Lista', [],
          (_tx, results) => {
            let row = results.rows.item(0);
            const { maximo } = row;
            resolve(Number(maximo) + 1);
          },
          this.errorCallback
          );
      });
    });
  }

  addLista(item) {
    //return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql('INSERT INTO Lista VALUES (?, ?, ?)', [item[0].cod_lista, item[0].texto, null]
        ,(_tx, _results) => {
          //resolve(results);
        },
        (_e) => {
          console.log("Erro ao persistir dados");
        });
      });
    //});
  }

  updateLista(lista) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql('UPDATE Lista SET texto = ?, prioridade = ? WHERE cod_lista = ?', [lista.texto, null, lista.id])
        .then((_tx, results) => {
          resolve(results);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }

  deleteList(id) {
    this.db.transaction((tx) => {
      tx.executeSql('DELETE FROM Lista WHERE cod_lista = ?', [id]
      ,(_tx, _results) => {
        console.log('Exclusão bem sucedida. - ' + String(id));
      },
      (_e) => {
        //
      });
    });
  }

}
