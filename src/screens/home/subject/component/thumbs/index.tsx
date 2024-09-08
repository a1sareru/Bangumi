/*
 * @Author: czy0729
 * @Date: 2020-10-12 12:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:44:10
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Component, Flex, Heatmap, Iconfont, ScrollViewHorizontal, Text } from '@components'
import { InView, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _, systemStore } from '@stores'
import { open, stl } from '@utils'
import { c } from '@utils/decorators'
import { r } from '@utils/dev'
import { ReactNode } from '@types'
import { TITLE_THUMBS } from '../../ds'
import { Ctx } from '../../types'
import IconHidden from '../icon/hidden'
import IconPreview from '../icon/preview'
import Preview from './preview'
import Video from './video'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Thumbs({ onBlockRef }, { $ }: Ctx) {
  r(COMPONENT)

  const [scrolled, setScrolled] = useState(false)
  const handleScroll = useCallback(() => {
    if (!scrolled) setScrolled(true)
  }, [scrolled, setScrolled])

  return useObserver(() => {
    if (!$.showThumbs[1]) return null

    const { showThumbs } = systemStore.setting
    const { epsThumbs, epsThumbsHeader, videos } = $.state

    const thumbs = epsThumbs.map(item => ({
      url:
        // 参数: bilibili 为 @, youku 没有, iqiyi 看不懂不作处理
        String(item.split('@')?.[0]),
      headers: epsThumbsHeader
    }))

    let reference = ''
    if (epsThumbsHeader?.Referer?.includes?.('douban.com')) {
      reference = 'douban.com'
    } else if (epsThumbsHeader?.Referer?.includes?.('bilibili.com')) {
      reference = 'bilibili.com'
    }

    let title = '预览'
    if ($.type === '音乐') {
      title = 'MV'
    } else if ($.type === '三次元') {
      title = '剧照'
    }

    let elRight: ReactNode
    if (!showThumbs) {
      elRight = <IconHidden name={title} value='showThumbs' />
    } else if (reference !== 'douban.com') {
      elRight = null
    } else {
      elRight = <IconPreview data={epsThumbs} headers={epsThumbsHeader} />
    }

    return (
      <Component id='screen-subject-thumbs'>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_THUMBS)} />
        <InView style={stl(styles.container, !showThumbs && _.short)}>
          <SectionTitle
            style={_.container.wind}
            right={elRight}
            icon={!showThumbs && 'md-navigate-next'}
            onPress={() => $.onSwitchBlock('showThumbs')}
          >
            {title}
          </SectionTitle>
          {showThumbs && (
            <ScrollViewHorizontal
              style={_.mt.md}
              contentContainerStyle={_.container.wind}
              onScroll={scrolled ? undefined : handleScroll}
            >
              {videos.map(item => (
                <Video
                  key={item.cover || item.src || item.href}
                  item={item}
                  epsThumbsHeader={epsThumbsHeader}
                  showTitle={$.type && $.type !== '动画'}
                />
              ))}
              {epsThumbs
                .filter((_item, index) => index <= (scrolled ? 12 : 4))
                .map((item, index) => (
                  <Preview
                    key={item}
                    item={item}
                    index={index}
                    thumbs={thumbs}
                    epsThumbsHeader={epsThumbsHeader}
                  />
                ))}
            </ScrollViewHorizontal>
          )}
          {showThumbs && !!reference && (
            <Flex style={[_.container.wind, _.mt.md]} justify='end'>
              <Text
                size={10}
                type='icon'
                align='right'
                onPress={() => open(epsThumbsHeader.Referer)}
              >
                数据来源自 {reference}
              </Text>
              <Iconfont style={_.ml.xs} name='md-open-in-new' size={10} color={_.colorIcon} />
            </Flex>
          )}
          <PreventTouchPlaceholder />
          <Heatmap id='条目.预览' />
        </InView>
      </Component>
    )
  })
}

export default c(Thumbs)
