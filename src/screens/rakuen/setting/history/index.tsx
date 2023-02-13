/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-14 03:59:10
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text, Iconfont } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { API_AVATAR } from '@constants'
import { memoStyles } from './styles'

function History({
  navigation,
  style,
  data = [],
  showAvatar = false,
  onNavigate,
  onDelete = () => {}
}: any) {
  const styles = memoStyles()
  if (!data.length) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.item}>
          <Flex style={styles.content}>
            <Text type='title' size={15} bold>
              空
            </Text>
          </Flex>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {data.map(item => {
        let userId = ''
        try {
          const [, _userId] = item.replace('@undefined', '').split('@')
          if (_userId) userId = _userId
        } catch (error) {}

        const onPress = () => {
          if (!navigation) return

          if (typeof onNavigate === 'function') {
            onNavigate('Zone', {
              userId
            })
            return
          }

          navigation.push('Zone', {
            userId
          })
        }

        return (
          <View key={item} style={styles.item}>
            <Flex style={styles.content}>
              {showAvatar && !!userId && (
                <Avatar
                  style={_.mr.sm}
                  src={API_AVATAR(userId)}
                  size={24}
                  onPress={onPress}
                />
              )}
              <Flex.Item>
                <Text size={14} bold onPress={onPress}>
                  {item.replace('@undefined', '')}
                </Text>
              </Flex.Item>
              <Touchable style={[styles.touch, _.ml.md]} onPress={() => onDelete(item)}>
                <Flex style={styles.icon} justify='center'>
                  <Iconfont name='md-close' size={20} />
                </Flex>
              </Touchable>
            </Flex>
          </View>
        )
      })}
    </View>
  )
}

export default ob(History)
