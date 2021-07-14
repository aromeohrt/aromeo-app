import React, {useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {Auth} from 'aws-amplify';
import {HeaderWithTitle, CustomTextInput, ExitAlert} from '../../components';
import styles from './style';

type Props = {
  navigation: Object,
};

// create a component
const NameScreen = ({route, navigation}: Props) => {
  let paramName = route.params.name;
  let [name, setName] = useState(paramName);
  let [alert, setAlert] = useState(false);

  const BackButton = () => {
    if (name === paramName) navigation.goBack();
    else setAlert(true);
  };

  const saveData = async () => {
    let user = await Auth.currentAuthenticatedUser();
    Auth.updateUserAttributes(user, {
      name: name,
    })
      .then((result) => {
        setAlert(false);
        navigation.navigate('ProfileScreen');
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'Name'}
        iconColor={'black'}
        showSave={true}
        name={name}
        saveInfo={() => saveData()}
      />
      <CustomTextInput
        changeText={(text) => setName(text)}
        value={name}
        placeholder="Name"
        placeholderTextColor="#c9c3cc"
      />
      <Text style={[styles.nameText, styles.textDarkBlue]}>
        Only numbers and letters are supported.
      </Text>
      <ExitAlert
        modalVisible={alert}
        title={'Are you going to exit without saving changes?'}
        messageText={''}
        Button1Text={'Exit'}
        Button2Text={'Back & Save'}
        closeModal={() => setAlert(false)}
        exitConfirm={saveData}
      />
    </View>
  );
};

//make this component available to the app
export default NameScreen;
