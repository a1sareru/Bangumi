/*
 * @Author: czy0729
 * @Date: 2024-03-07 21:24:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 21:33:14
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Slider as SliderComp, Text } from '@components'
import { _ } from '@stores'
import { debounce, formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Slider(props, { $ }: Ctx) {
  const { auctionAmount, auctionPrice } = $.state
  const { price = 0, amount } = $.valhallChara
  const { balance } = $.assets
  const { state, type } = $.auctionStatus
  const max = Math.min(
    amount || 0,
    Math.floor(balance / Math.max(Number(auctionPrice), price || 1))
  )
  return (
    <>
      <Flex style={_.mt.md}>
        <Flex.Item>
          <Text type='tinygrailPlain' size={12}>
            合计{' '}
            <Text type='ask' size={12}>
              -{formatNumber(auctionAmount * Number(auctionPrice), 2, true)}
            </Text>
          </Text>
        </Flex.Item>
        <Text style={_.ml.sm} type='tinygrailText' size={12}>
          当前竞拍 {state} 人 / {formatNumber(type, 0)} 股
        </Text>
      </Flex>
      <View style={styles.slider}>
        <SliderComp
          value={auctionAmount}
          min={0}
          max={max}
          disabled={!max}
          minimumTrackTintColor={_.colorAsk}
          maximumTrackTintColor={_.colorTinygrailBorder}
          onChange={debounce($.changeAuctionAmount)}
        />
      </View>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailText' size={12}>
            可用余额 {formatNumber(balance, 2, $.short)}
          </Text>
        </Flex.Item>
        <Text type='tinygrailText' size={12}>
          满拍 {formatNumber(Number(auctionPrice || 0) * (max || 0), 2, $.short)}
        </Text>
      </Flex>
    </>
  )
}

export default obc(Slider)
