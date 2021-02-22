import * as SQLite from 'expo-sqlite'



// Interface for data
interface location {
    code: string;
    description: string;
}

// Storage Class
class Storage {
    //
    // local varibles
    db:SQLite.WebSQLDatabase;
  
    constructor() {
        this.db = this.createDb();
        console.log('this has ran! :)');

    }
    
    // create database
    createDb() {
        const db = SQLite.openDatabase('database.db');
        return db
    }

    // create high level table
    createTable(){
        this.db.transaction(tx => {
            // 'create table if not exists items (id integer primary key not null, done int, value text);'

            tx.executeSql(
              'create table if not exists locationcodes (id string primary key not null, description text);'
            );
            
          });
    }

    // create uuid table



    // Test input data
    loadData(data: location){
        
        this.db.transaction(
            tx => {
              // tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
              tx.executeSql('insert into locationcodes (id, description) values (? ,?)', [data.code ,data.description]);
              tx.executeSql('select * from locationcodes', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
                );
                },
            null,
            console.log('FINISHED')
        )
    }

    // Load all data into high level table


    // Load all data into uuid data


    // get data from high level table

    // get data from uuid table

    // clear storage

    // delete element

    
}



export default Storage;
export default location;
