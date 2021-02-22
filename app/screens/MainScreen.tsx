import * as React from 'react';
import { StyleSheet } from 'react-native';
import BeaconInfo from '../components/BeaconInfo';
import LargeButton from '../components/LargeButton';
import { HorizontalSeparator } from '../components/Separators';
import * as SQLite from 'expo-sqlite'
import Storage from '../storage';
import location from '../storage';

import { View } from '../components/Themed';







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

  const testData = {code: "2-1-1", description: "abc"};

  const storage = new Storage();
  const db = storage.createDb();
  storage.createTable(db);
  storage.loadData(db, testData);





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
