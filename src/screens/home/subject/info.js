/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-15 14:47:13
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, RenderHtml, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'

function Info({ style }, { $, navigation }) {
  const styles = memoStyles()
  let html = $.info
  try {
    html = decodeURIComponent(html)
  } catch (error) {
    warn('home/subject/info.js', 'Info', error)
  }
  return (
    <View style={[styles.container, style]}>
      <SectionTitle style={_.container.wind}>详情</SectionTitle>
      {!!$.info && (
        <Expand>
          <RenderHtml
            style={styles.info}
            baseFontStyle={styles.baseFontStyle}
            html={html}
            katakana
            onLinkPress={href =>
              appNavigate(
                href,
                navigation,
                {},
                {
                  id: '条目.跳转',
                  data: {
                    from: '详情',
                    subjectId: $.subjectId
                  }
                }
              )
            }
          />
        </Expand>
      )}
      <Heatmap
        id='条目.跳转'
        data={{
          from: '详情'
        }}
      />
    </View>
  )
}

Info.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Info)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 120
  },
  info: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  },
  baseFontStyle: {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22,
    color: _.colorTitle
  }
}))
