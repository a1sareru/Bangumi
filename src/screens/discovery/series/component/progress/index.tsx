/*
 * @Author: czy0729
 * @Date: 2024-04-03 08:43:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-03 10:10:49
 */
import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { ColorValue, ViewStyle } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Progress({
  style,
  current,
  total,
  children
}: PropsWithChildren<{
  style?: ViewStyle
  current: number
  total: number
}>) {
  const styles = memoStyles()

  let barColor: ColorValue = _.colorSuccess
  let percent = 1
  if (current && total) {
    percent = Math.max(Math.min(current / total, 1), 0.06)
    if (percent < 1) {
      barColor = _.colorPrimary
    }
  } else {
    percent = 0
  }

  return (
    <View style={stl(styles.progress, style)}>
      {children}
      <View style={styles.bar} />
      <View
        style={[
          styles.bar,
          {
            width: `${percent * 100}%`,
            backgroundColor: barColor
          }
        ]}
      />
    </View>
  )
}

export default ob(Progress, COMPONENT)
