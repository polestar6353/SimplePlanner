import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteEditor from '../components/WriteEditor';
import WriteHeader from '../components/WriteHeader';

function WriteScreen({route}) {
  const plan = route?.params?.plan;
  const [title, setTitle] = useState(plan?.title ?? '');
  const [content, setContent] = useState(plan?.content ?? '');

  let planDate = route?.params?.plan?.date;
  if (planDate) {
    planDate = new Date(planDate.replace(' ', 'T'));
  } else {
    planDate = '';
  }
  const [startTime, setStarttime] = useState(planDate);

  const navigation = useNavigation();

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: async () => {
            let data = {
              planId: plan?.planId,
            };
            let response = await fetch('http://127.0.0.1:8080/deletePlan', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify(data),
            });
            if (response.ok) {
              navigation.pop();
            } else {
              Alert.alert('에러', '삭제에 실패했습니다 문의바랍니다');
            }
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  const onSave = async () => {
    if (plan) {
      //수정
      let data = {
        planId: plan?.planId,
        title,
        date: startTime.toISOString().slice(0, 19).replace('T', ' '),
        content,
        color: plan?.color,
      };

      let response = await fetch('http://127.0.0.1:8080/updatePlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigation.pop();
      } else {
        Alert.alert('에러', '수정에 실패했습니다 문의바랍니다');
      }
    } else {
      //생성
      let data = {
        title,
        date: startTime.toISOString().slice(0, 19).replace('T', ' '),
        content,
        color: 'blue',
      };

      let response = await fetch('http://127.0.0.1:8080/createPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigation.pop();
      } else {
        Alert.alert('에러', '등록에 실패했습니다 문의바랍니다');
      }
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView style={styles.avoidingView}>
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!plan}
        />
        <WriteEditor
          title={title}
          content={content}
          startTime={startTime}
          onChangeTitle={setTitle}
          onChangeContent={setContent}
          onChangeDate={setStarttime}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
