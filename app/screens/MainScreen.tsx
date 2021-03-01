import * as React from 'react';
import { StyleSheet } from 'react-native';
import BeaconInfo from '../components/BeaconInfo';
import LargeButton from '../components/LargeButton';
import { HorizontalSeparator } from '../components/Separators';
import * as SQLite from 'expo-sqlite'
import Storage from '../storage';
import location from '../storage';

import { View } from '../components/Themed';
import { withSafeAreaInsets } from 'react-native-safe-area-context';



class CurrentState{
  currentDescription:String;

  constructor(){
    this.currentDescription = "dummy"
  }

  updateState(description:String){
    this.currentDescription = description
    console.log(description)

  }


}



export default function MainScreen() {
  /*
  const db = SQLite.openDatabase('testdb.db');

  db.transaction(tx => {
    tx.executeSql(
      'create table if not exists items (id integer primary key not null, done int, value text);'
    );
  });

  const text = "test data!";

  db.transaction(
    tx => {
      tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
      tx.executeSql('select * from items', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    null,
    console.log('FINISHED')
  );
  */


  const storage = new Storage();
  const currentstate = new CurrentState();

  // storage.printData();
  // storage.printVersionData();

  storage.createTable();
  // storage.printData();
  // storage.printVersionData();
  

  // while (previousState == currentstate.currentDescription);

  function printLookupResult(codeDescription:String){
    console.log(codeDescription)
  }

  storage.lookUpCodeDescription("1-1-1", printLookupResult);




  






  return (
    <View style={styles.container}>
      <LargeButton accessibilityLabel="Tap here to repeat the previous audio output">
        Tap to repeat
      </LargeButton>
      <HorizontalSeparator />
      <BeaconInfo type="Point of Interest " place="Cafe " />
      <HorizontalSeparator />
      <LargeButton accessibilityLabel="Tap here for more information">
        Tap for more info
      </LargeButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
