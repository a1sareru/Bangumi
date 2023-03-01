/*
 * 触摸反馈整合 (因封装前并未有官方的 Pressable，没必要前不会考虑重新整合)
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 19:00:47
 */
import React from 'react'
import { observer } from 'mobx-react'
import { getSystemStoreAsync } from '@utils/async'
import { DEV, IOS } from '@constants'
import TouchableWithoutFeedback from './touchable-without-feedback'
import TouchableNativeFeedback from './touchable-native-feedback'
import TouchableHighlight from './touchable-highlight'
import TouchableOpacity from './touchable-opacity'
import TouchableAnimated from './touchable-animated'
import { defaultHitSlop, callOnceInInterval } from './utils'
import { Props as TouchableProps } from './types'

export { TouchableProps }

export const Touchable = observer(
  ({
    style,
    withoutFeedback = false,
    highlight = false,
    delay = true,
    hitSlop = defaultHitSlop,
    delayPressIn = 0,
    delayPressOut = 0,
    useRN = false,
    ripple,
    animate,
    scale,
    onPress = () => {},
    children,
    ...other
  }: TouchableProps) => {
    const _useRN = !IOS && DEV ? true : useRN
    const passProps = {
      /** @todo 安卓开发环境热使用 RNGH 的组件会导致 GestureHandler already initialized 问题, 暂时规避 */
      useRN: _useRN,
      style,
      hitSlop,
      delayPressIn,
      delayPressOut,
      onPress: delay ? () => callOnceInInterval(onPress) : onPress,
      children,
      ...other
    }
    if (withoutFeedback) return <TouchableWithoutFeedback {...passProps} />

    const _ripple = ripple === undefined ? getSystemStoreAsync().setting.ripple : ripple
    if (!IOS && _ripple) return <TouchableNativeFeedback {...passProps} />

    if (highlight) return <TouchableHighlight {...passProps} />

    if (!_useRN && animate) return <TouchableAnimated {...passProps} scale={scale} />

    if (_useRN) return <TouchableOpacity {...passProps} />

    // 绝大部分情况会 return 这个
    return <TouchableOpacity {...passProps} />
  }
)
