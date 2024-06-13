/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-14 01:10:18
 */
import React from 'react'
import { Component, Page } from '@components'
import { BlurViewBottomTab, BlurViewRoot, Login } from '@_'
import { _, userStore } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { IOS, STORYBOOK } from '@constants'
import Extra from './component/extra'
import { useUserPage } from './hooks'
import NestedScroll from './nested-scroll'
import Scroll from './scroll'
import Store from './store'
import { Ctx } from './types'

/** 时光机 */
const User = (props, context: Ctx) => {
  useUserPage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-user'>
      <Page>
        {!$.usersInfo.id && !userStore.isLogin ? (
          // 自己并且没登录
          <Login style={_.container.plain} />
        ) : $.params.userId ? (
          // 来自于别人的空间
          !!$.state._loaded && (!IOS && !STORYBOOK ? <NestedScroll /> : <Scroll />)
        ) : (
          // 来自时光机
          <BlurViewRoot>
            {!!$.state._loaded && (!IOS && !STORYBOOK ? <NestedScroll /> : <Scroll />)}
            <BlurViewBottomTab />
          </BlurViewRoot>
        )}
      </Page>
      <Extra />
    </Component>
  ))
}

export default ic(Store, User)
