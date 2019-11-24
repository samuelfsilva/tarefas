/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import SQLite from "react-native-sqlite-storage";
import { DATABASE } from "./Constants";

const database_name = DATABASE.FILE_NAME;
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

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
      ,(tx, results) => {
        console.log("Exclusão feita com sucesso!")
      },
      (e) => {
        //
      });
    });
  }

  successOpenDatabaseCallback(db) {
    console.log("Conectado ao Banco");
    db.transaction((tx) => {
      console.log("Verificando tabelas");
      tx.executeSql('SELECT name FROM sqlite_master WHERE type=? AND name=?',
      ["table","Lista"], (tx, results) => {
        if (results.rows.length === 0) {
          db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Lista (cod_lista, texto, prioridade)', 
            [], (tx, results) => {
              console.log("Criando tabela");
            },(e) => {
              console.log('Erro ao criar tabela!');
            });
          });
        }
      },(e) => {
        console.log("Erro ao verificar tabelas");
      });
    });
    return db;
  }

  initDB() {
    return SQLite.openDatabase({
        name: database_name,
        location: 'default',
        createFromLocation: './TestDB.db',
      },
      this.successOpenDatabaseCallback
      ,
      this.dbError);
  }

  close() {
    if (this.db) {
      console.log("Closing DB");
      this.db.close()
        .then(status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  }

  errorCallback(e) {
    console.log("Erro!");
  }

  getLista() {
    return new Promise((resolve) => {
      const lista = [];
      this.db.transaction((tx) => {
          tx.executeSql('SELECT cod_lista, texto, prioridade FROM Lista', [], 
          (tx, results) => {
            console.log("Requisição completa" + results.rows.length);
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log(row.texto+" - "+row.cod_lista);
              const { cod_lista, texto, prioridade } = row;
              lista.push({
                cod_lista,
                texto,
                prioridade,
              });
            }
            // eslint-disable-next-line no-undef
            resolve(lista);
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
        ,(tx, results) => {
          //resolve(results);
        },
        (e) => {
          console.log("Erro ao persistir dados")
        });
      });
    //});
  }

  updateLista(lista) {
    return new Promise((resolve) => {
      this.db.transaction((tx) => {
        tx.executeSql('UPDATE Lista SET texto = ?, prioridade = ? WHERE cod_lista = ?', [lista.texto, null, lista.id])
        .then(([tx, results]) => {
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
      ,(tx, results) => {
        console.log('Exclusão bem sucedida. - '+String(id));
      },
      (e) => {
        //
      });
    });
  }

}