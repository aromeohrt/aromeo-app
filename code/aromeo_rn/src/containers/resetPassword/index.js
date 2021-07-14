//import liraries
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Auth} from 'aws-amplify';
import {
  HeaderWithTitle,
  CustomTextInput,
  RectangleButton,
  Message,
  SingleButtonAlert,
} from '../../components';
import styles from './style';
import NetInfo from '@react-native-community/netinfo';

const validPass = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/;
const ERR_MSG_PASS =
  'Password should be 8+ characters/at least 8 characters long. - At least 1 uppercase, at least 1 lowercase and at least 1 digit.';
const ERR_MSG_EQL = 'New password and confirm password does not match.';

type Props = {
  navigation: Object,
};

// create a component
const ResetPassword = ({route, navigation}: Props) => {
  let username = route.params.username;
  let [oldPass, setOldPass] = useState('');
  let [newPass, setNewPass] = useState('');
  let [confirmPass, setConfirmPass] = useState('');
  let [passEqualityErr, setPassEqualityErr] = useState(false);
  let [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oldPassError, setOldPassError] = useState('');
  const [newPassError, setNewPassError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [networkError, setNetworkError] = useState(false);
  const BackButton = () => {
    navigation.goBack();
  };

  const resetPassword = () => {
    if (
      validPass.test(oldPass) == false &&
      validPass.test(newPass) == false &&
      validPass.test(confirmPass) === false
    ) {
      setOldPassError(ERR_MSG_PASS);
      setNewPassError(ERR_MSG_PASS);
      setConfirmPassError(ERR_MSG_PASS);
    } else if (validPass.test(oldPass) === false) {
      setOldPassError(ERR_MSG_PASS);
      setNewPassError('');
      setConfirmPassError('');
    } else if (validPass.test(newPass) == false) {
      setNewPassError(ERR_MSG_PASS);
      setOldPassError('');
      setConfirmPassError('');
    } else if (validPass.test(confirmPass) == false) {
      setOldPassError('');
      setNewPassError('');
      setConfirmPassError(ERR_MSG_PASS);
    } else if (newPass !== confirmPass) {
      setPassEqualityErr(true);
    } else {
      setLoading(true);
      Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.changePassword(user, oldPass, newPass);
        })
        .then((data) => {
          navigation.navigate('SignInScreen', {username});
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
          setErrorCode(err.code);
        });
    }
  };

  const setValues = (text, type) => {
    if (type === 'old') setOldPass(text);
    else if (type === 'new') setNewPass(text);
    else if (type === 'confirm') setConfirmPass(text);
    emptyError();
  };

  const emptyError = () => {
    setError('');
    setConfirmPassError('');
    setNewPassError('');
    setOldPassError('');
  };

  const emptyInternetError = () => {
    // props.saveConnectionStatus(true);
    setNetworkError(false);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected == false) {
        setNetworkError(true);
      } else {
        setNetworkError(false);
      }
      // props.saveConnectionStatus(state.isConnected);
    });

    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        onPressBackButton={BackButton}
        title={'Reset Password'}
        iconColor={'black'}
      />

      <View style={{marginTop: '4%'}}>
        {networkError == true ? (
          <Text
            style={[
              styles.nameTextWithBlur,
              styles.textDarkBlue,
              styles.nameWidthWithBlur,
            ]}>
            New password should be at least 8 characters, contain numbers,
            lowercase and uppercase letters
          </Text>
        ) : (
          <Text
            style={[styles.nameText, styles.textDarkBlue, styles.nameWidth]}>
            New password should be at least 8 characters, contain numbers,
            lowercase and uppercase letters
          </Text>
        )}
      </View>

      <KeyboardAwareScrollView>
        <CustomTextInput
          label="Old Password"
          changeText={(text) => setValues(text, 'old')}
          value={oldPass}
          placeholder="Enter your old password"
          placeholderTextColor="#c9c3cc"
          visible={true}
          errorMsg={oldPassError}
        />
        <CustomTextInput
          label="New Password"
          changeText={(text) => setValues(text, 'new')}
          value={newPass}
          placeholder="8+ characters"
          placeholderTextColor="#c9c3cc"
          visible={true}
          errorMsg={newPassError}
        />
        <CustomTextInput
          label="Confirm New Password"
          changeText={(text) => setValues(text, 'confirm')}
          value={confirmPass}
          placeholder="8+ characters "
          placeholderTextColor="#c9c3cc"
          visible={true}
          errorMsg={confirmPassError}
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <RectangleButton
          disable={
            oldPass !== '' && newPass !== '' && confirmPass !== ''
              ? false
              : true
          }
          title={'Done'}
          loading={loading}
          onPressButton={() => resetPassword()}
          blueButton={true}
        />
      </KeyboardAwareScrollView>
      {error ? (
        <Message
          message={error}
          customColor="#ada5b1"
          code={errorCode}
          emptyError={emptyError}
        />
      ) : null}

      {
        (networkError == true) &&
      <Message
        message={`No network connection.
      Please try later.`}
        customColor="#e17b7bf2"
        emptyError={emptyInternetError}
        forConnection={true}
        extradepth={true}
      />
     }

      {passEqualityErr && (
        <SingleButtonAlert
          message={ERR_MSG_EQL}
          modalVisible={passEqualityErr}
          closeModal={() => setPassEqualityErr(false)}
        />
      )}
    </View>
  );
};

//make this component available to the app
export default ResetPassword;
