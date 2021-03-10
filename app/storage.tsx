import * as SQLite from 'expo-sqlite';

import * as nmwTable from './nmwstandard.json';
import * as expansionData from './example_expansion_packs/expansion1.json';

// Interface for data
interface location {
  code: string;
  description: string;
  emblem: String;
}

// Storage Class
class Storage {
  //
  // local variables
  db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = this.createDb();
  }

  // Create database
  createDb() {
    const db = SQLite.openDatabase('database.db');
    return db;
  }

  // Create and populate database tables
  createTable() {
    this.db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS locationCodes (id string primary key not null, description text, emblem text);'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS versionRecord (id integer primary key not null, version text);'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS expansionPackTable (id int NOT NULL AUTO_INCREMENT, pack_name text, description text, w3w text, organisation text);'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS uuidTable (id integer primary key not null, nmw text, name text, description text, website text);'
      );
      tx.executeSql('SELECT * FROM versionRecord', [], (_, results) => {
        if (results.rows.length == 0) {
          tx.executeSql('INSERT INTO versionRecord (version) VALUES (?)', [
            nmwTable.version
          ]);
          nmwTable.nmw.forEach((value) => {
            tx.executeSql(
              'INSERT INTO locationCodes (id, description, emblem) VALUES (?,?,?)',
              [value.code, value.description, value.emblem]
            );
          });
        } else if (results.rows.item(0) != nmwTable.version) {
          tx.executeSql('INSERT INTO versionRecord (version) VALUES (?)', [
            nmwTable.version
          ]);

          nmwTable.nmw.forEach((value) => {
            tx.executeSql(
              'INSERT INTO locationCodes (id, description, emblem) VALUES (?,?,?)',
              [value.code, value.description, value.emblem]
            );
          });
        }
      });
    }, null);
  }

  // Parse Expansion pack json object
  parseExpansionPack(){
    console.log(expansionData.meta);
    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO expansionPackTable (pack_name, description, w3w, organisation) VALUES (?,?,?,?)',
        [expansionData.meta.pack_name, expansionData.meta.description, expansionData.meta.w3w, expansionData.meta.organisation]
      );
    expansionData.UUIDs.forEach((value) => {
      tx.executeSql(
        'INSERT INTO uuidTable (id, nmw, name, description, website) VALUES (?,?,?,?,?)',
        [value.code, value.nmw, value.name, value.description, value.website]
      );
      });
    });
  }

  // Input location code data
  loadData(data: location) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO locationCodes (id, description, emblem) VALUES (? ,?, ?)',
        [data.code, data.description, data.emblem]
      );
    }, null);
  }

  // Clear storage
  clearStorage() {
    this.db.transaction((tx) => {
      tx.executeSql('DROP TABLE locationCodes;');
      tx.executeSql('DROP TABLE versionRecord;');
    });
  }

  // Delete element from location table
  deleteElementLocation(id: string) {
    this.db.transaction((tx) => {
      tx.executeSql('DELETE FROM locationCodes WHERE id=?', [id]);
    });
  }

  // Print the version of currently stored data
  printVersionData() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM versionRecord', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }

  // Lookup code description
  lookupDataForNMWCode(code: String, callback: Function) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'SELECT description, emblem FROM locationCodes WHERE id=?',
        [code],
        (_, results) => {
          callback(
            results.rows.item(0).description,
            results.rows.item(0).emblem
          );
        }
      );
    });
  }
}

export default Storage;
