/*
 * @Author: czy0729
 * @Date: 2019-10-14 22:46:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 22:44:36
 */
import React from 'react'
import { Component } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants'
import { RakuenScrollDirection } from '@types'
import { Ctx } from '../../types'
import { TouchScroll } from './touch-scroll'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TouchScrollWrap({ onPress }, { $ }: Ctx) {
  const { scrollDirection } = $.setting
  if (
    scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue<RakuenScrollDirection>('隐藏') ||
    !$.comments.list.length
  ) {
    return null
  }

  return (
    <Component id='screen-topic-touch-scroll'>
      <TouchScroll
        styles={memoStyles()}
        list={$.comments.list}
        readedTime={$.readed._time}
        scrollDirection={scrollDirection}
        directFloor={$.state.directFloor}
        isWebLogin={$.isWebLogin}
        onPress={onPress}
      />
    </Component>
  )
}

export default obc(TouchScrollWrap, COMPONENT)
