import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

function WriteEditor({
  title,
  content,
  startTime,
  onChangeTitle,
  onChangeContent,
  onChangeDate,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const dateInit = selectedDate => {
    if (selectedDate === '') {
      return '';
    }
    let newDate = new Date(selectedDate);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let hour = newDate.getHours();
    let min = newDate.getMinutes();
    let newText = `${year}년 ${month}월 ${day}일 ${hour}시 ${min}분`;
    return newText;
  };

  const handleConfirm = selectedDate => {
    onChangeDate(selectedDate);
    let newText = dateInit(selectedDate);
    setChangeDate(newText);
    hideDatePicker();
  };

  const placeholder = '날짜와 시간을 입력해주세요';
  const [date, setChangeDate] = useState(dateInit(startTime));

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
      />

      <View style={styles.lineStyle} />

      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.titleInput}
          placeholder={placeholder}
          editable={false}
          value={date}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </TouchableOpacity>

      <View style={styles.lineStyle} />

      <TextInput
        placeholder="내용을 입력해주세요"
        style={styles.contentInput}
        multiline
        textAlignVertical="top"
        onChangeText={onChangeContent}
        value={content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, padding: 16},
  titleInput: {
    marginTop: 15,
    paddingVertical: 0,
    fontSize: 18,

    color: '#263238',
  },
  contentInput: {
    marginTop: 15,
    flex: 1,
    fontSize: 18,
    paddingVertical: 0,
    color: '#263238',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
  },
});

export default WriteEditor;
