import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FeedList from '../components/FeedList';
import FloatingWriteButton from '../components/FloatingWriteButton';
import {doLoadPlans} from '../reducer/Plan';
import {useDispatch, useSelector} from 'react-redux';

function FeedsScreen() {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const load = () => {
        dispatch(doLoadPlans());
      };
      load();
    }, [dispatch]),
  );

  const plans = useSelector(state => state.Plan.list);

  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };

  return (
    <View style={styles.block}>
      <FeedList plans={plans} onScrolledToBottom={onScrolledToBottom} />
      <FloatingWriteButton hidden={hidden} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default FeedsScreen;
