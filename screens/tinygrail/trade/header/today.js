/*
 * @Author: czy0729
 * @Date: 2019-09-02 15:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-15 13:26:43
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { date, getTimestamp, toFixed } from '@utils'
import { observer } from '@utils/decorators'

function Today({ style }, { $ }) {
  const styles = memoStyles()
  let high = '-'
  let low = '-'
  let amount = 0

  // 筛选出今天的交易数据, 并计算高, 低, 量
  const d = date('Y-m-d', getTimestamp())
  $.kline.data
    .filter((item, index) => index !== 0 && item.time.includes(d)) // 要排除第一个数据, 因为有ico的量
    .forEach(item => {
      if (high === '-' || item.high > high) {
        high = toFixed(item.high, 2)
      }
      if (low === '-' || item.low < low) {
        low = toFixed(item.low, 2)
      }
      amount += item.amount
    })

  return (
    <View style={style}>
      <Flex justify='between'>
        <Text style={styles.text} size={13}>
          高
        </Text>
        <Text
          style={[
            styles.value,
            {
              color: _.colorTinygrailPlain
            }
          ]}
          align='right'
          size={13}
        >
          {high}
        </Text>
      </Flex>
      <Flex style={_.mt.sm} justify='between'>
        <Text style={styles.text} size={13}>
          低
        </Text>
        <Text
          style={[
            styles.value,
            {
              color: _.colorTinygrailPlain
            }
          ]}
          align='right'
          size={13}
        >
          {low}
        </Text>
      </Flex>
      <Flex style={_.mt.sm} justify='between'>
        <Text style={styles.text} size={13}>
          量
        </Text>
        <Text
          style={[
            styles.value,
            {
              color: _.colorTinygrailPlain
            }
          ]}
          align='right'
          size={13}
        >
          {amount}
        </Text>
      </Flex>
    </View>
  )
}

Today.contextTypes = {
  $: PropTypes.object
}

export default observer(Today)

const memoStyles = _.memoStyles(_ => ({
  value: {
    minWidth: 24,
    marginLeft: _.md
  },
  text: {
    color: _.colorTinygrailText
  }
}))
