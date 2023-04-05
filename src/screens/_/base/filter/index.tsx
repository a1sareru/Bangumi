/*
 * 筛选组
 * @Author: czy0729
 * @Date: 2020-07-15 16:37:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 14:31:12
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { info, stl } from '@utils'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import i18n from '@constants/i18n'
import { EventKeys } from '@types'
import { FilterSwitch } from '../filter-switch'
import { scrollToX } from './utils'
import { HIT_SLOP } from './ds'
import { memoStyles } from './styles'
import { Props as FilterProps } from './types'

export const Filter = obc(
  (
    {
      filterDS = [],
      title = '频道',
      name = '番剧',
      type = 'Anime',
      lastUpdate,
      information = ''
    }: FilterProps,
    { $, navigation }
  ) => {
    const styles = memoStyles()
    const { query, layout, expand } = $?.state || {}
    const { length } = $?.list || []
    const total = $?.total || length
    const eventId = `${type}.选择` as EventKeys
    return (
      <View style={layout === 'grid' ? styles.grid : styles.list}>
        <FilterSwitch title={title} name={name} />
        {filterDS
          .filter(item => {
            // 配置永久展开 || 展开中 || 当前有选择
            return item.always || expand || query[item.type]
          })
          .map(item => {
            const state = query[item.type]
            const multiple = item.multiple
            const multiSelect = item.multiSelect
            return (
              <Flex
                key={item.title}
                style={styles.row}
                align={multiple ? 'start' : 'center'}
              >
                <View>
                  <View>
                    <Text style={multiple && styles.multipleTitle} size={12} bold>
                      {item.title}
                    </Text>
                    {multiSelect && (
                      <Touchable
                        style={styles.how}
                        useRN
                        onPress={() => info('长按标签多选类型')}
                      >
                        <Text size={12} lineHeight={12} type='icon' bold>
                          多选
                        </Text>
                      </Touchable>
                    )}
                  </View>
                  <Heatmap right={-16} bottom={8} id={eventId} type={item.type} mini />
                </View>
                <Flex.Item style={_.ml.md}>
                  <Flex align={multiple ? 'start' : 'center'}>
                    <Touchable
                      style={stl(
                        styles.item,
                        (typeof state === 'object'
                          ? state.length === 0
                          : state === '') && styles.itemActive,
                        multiple && {
                          marginTop: _.r(4)
                        }
                      )}
                      hitSlop={HIT_SLOP}
                      onPress={() => $?.onSelect(item.type, '')}
                    >
                      <Text size={11}>{item.type === 'sort' ? '默认' : '全部'}</Text>
                    </Touchable>
                    <ScrollView
                      ref={scrollView => {
                        scrollToX(
                          scrollView,
                          item.data,
                          state,
                          ['制作', '开发商', '发行商'].includes(item.title) ? 80 : 50,
                          item.multiple
                        )
                      }}
                      style={styles.contentContainerStyle}
                      horizontal
                      {...SCROLL_VIEW_RESET_PROPS}
                    >
                      {multiple ? (
                        <Flex style={styles.multiple} direction='column' align='start'>
                          {item.data.map((i: any[], idx: React.Key) => (
                            <Flex key={idx} style={styles.contentContainerStyle}>
                              {i.map(tag => {
                                const isActive =
                                  typeof state === 'object'
                                    ? state.includes(tag)
                                    : state === tag
                                return (
                                  <Touchable
                                    key={tag}
                                    style={stl(
                                      styles.item,
                                      multiSelect && styles.itemMultiSelect,
                                      isActive && styles.itemActive
                                    )}
                                    hitSlop={HIT_SLOP}
                                    onPress={() => $?.onSelect(item.type, tag)}
                                    onLongPress={
                                      multiSelect
                                        ? () => $?.onSelect(item.type, tag, true)
                                        : undefined
                                    }
                                  >
                                    <Text size={11}>
                                      {tag}
                                      {!!item.nums && item.nums[tag] && (
                                        <Text
                                          type='sub'
                                          size={9}
                                          lineHeight={11}
                                          bold
                                        >{` ${item.nums[tag]}`}</Text>
                                      )}
                                    </Text>
                                    <Heatmap right={-1} id={eventId} value={tag} mini />
                                  </Touchable>
                                )
                              })}
                            </Flex>
                          ))}
                        </Flex>
                      ) : (
                        <>
                          {item.login && !$?.isLogin ? (
                            <Text style={_.ml.sm} size={11} type='sub' lineHeight={16}>
                              {i18n.login()}后显示
                            </Text>
                          ) : (
                            item.data.map((i: string) => (
                              <Touchable
                                key={i}
                                style={stl(
                                  styles.item,
                                  (typeof state === 'object'
                                    ? state.includes(i)
                                    : state === i) && styles.itemActive
                                )}
                                hitSlop={HIT_SLOP}
                                onPress={() => $?.onSelect(item.type, i)}
                              >
                                <Text size={11}>
                                  {i}
                                  {!!item.nums && item.nums[i] && (
                                    <Text
                                      type='sub'
                                      size={9}
                                      lineHeight={11}
                                      bold
                                    >{` ${item.nums[i]}`}</Text>
                                  )}
                                </Text>
                                <Heatmap right={-1} id={eventId} value={i} mini />
                              </Touchable>
                            ))
                          )}
                        </>
                      )}
                    </ScrollView>
                  </Flex>
                </Flex.Item>
              </Flex>
            )
          })}
        <Flex style={_.mt.sm} justify='center'>
          <Touchable style={styles.more} onPress={$?.onExpand}>
            <Text size={11} lineHeight={12} type='icon' bold>
              {expand ? '收起' : '更多'}选项
            </Text>
          </Touchable>
        </Flex>
        <Flex style={styles.ft}>
          <Flex.Item>
            <Text size={11} type='sub' bold>
              {total !== length ? `${length} (${total}) 条记录` : `${length} 条记录`}
              {!!query?.tags?.length && ` · ${query?.tags?.join(' · ')}`}
            </Text>
          </Flex.Item>
          <Touchable
            onPress={() => {
              navigation.push('Information', {
                title: `找${name}`,
                message: information.split('\n'),
                advance: true
              })
            }}
          >
            <Flex>
              {!!lastUpdate && (
                <Text style={_.mr.sm} size={11} type='sub' bold>
                  最后更新 {lastUpdate}
                </Text>
              )}
              <Iconfont name='md-info-outline' size={16} />
            </Flex>
          </Touchable>
        </Flex>
      </View>
    )
  }
)
