/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-15 12:14:40
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Heatmap } from '@components'
import { SectionTitle, ItemArticle } from '@screens/_'
import { _ } from '@stores'
import { URL_DEFAULT_AVATAR } from '@constants'

function Blog({ style }, { $, navigation }) {
  const { blog } = $.subject
  let _blog = blog || []
  if ($.filterDefault || $.isLimit) {
    _blog = _blog.filter(item => {
      if (item?.user?.avatar?.small.includes(URL_DEFAULT_AVATAR)) {
        return false
      }
      return true
    })
  }
  if (!_blog.length) {
    return null
  }

  const styles = memoStyles()
  return (
    <View style={style}>
      <Expand ratio={1.2}>
        <SectionTitle style={styles.left}>日志</SectionTitle>
        <View style={_.mt.sm}>
          {_blog.map((item, index) => (
            <ItemArticle
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={styles.left}
              navigation={navigation}
              index={index}
              avatar={item.user.avatar.small}
              title={item.title}
              summary={item.summary}
              nickname={item.user.nickname}
              userId={item.user.username}
              timestamp={item.timestamp}
              replies={item.replies}
              url={item.url}
              event={{
                id: '条目.跳转',
                data: {
                  from: '评论',
                  subjectId: $.subjectId
                }
              }}
            />
          ))}
        </View>
      </Expand>
      <Heatmap
        id='条目.跳转'
        data={{
          from: '评论'
        }}
      />
    </View>
  )
}

Blog.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Blog)

const memoStyles = _.memoStyles(_ => ({
  left: {
    paddingLeft: _.wind
  }
}))
