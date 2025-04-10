/*
 * @Author: czy0729
 * @Date: 2020-03-14 15:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-06 18:12:12
 */
import React, { Suspense } from 'react'
import { toJS } from 'mobx'
import { Component, Heatmap, ImageViewer } from '@components'
import { systemStore, uiStore } from '@stores'
import { r } from '@utils/dev'
import { useGlobalMount, useKeepAwake, useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { LikesGrid } from '../likes-grid'
import { LikesUsers } from '../likes-users'
import { ListenClipboard } from '../listen-clipboard'
import { ManageModal } from '../manage-modal'
import { Popable } from '../popable'
import { COMPONENT } from './ds'

/** 全局公用逻辑 */
export const AppCommon = () => {
  r(COMPONENT)

  // App 启动稳定后统一做的操作
  useGlobalMount()

  // 开发环境保持常亮状态
  useKeepAwake()

  return useObserver(() => (
    <Suspense>
      <Component id='base-app-common'>
        <ImageViewer
          {...systemStore.imageViewer}
          imageUrls={toJS(systemStore.imageViewer.imageUrls)}
          onCancel={systemStore.closeImageViewer}
        />
        <Popable {...uiStore.popableSubject} />
        <LikesGrid {...uiStore.likesGrid} />
        <LikesUsers {...uiStore.likesUsers} onClose={uiStore.closeLikesUsers} />
        <ManageModal
          {...uiStore.manageModal}
          onSubmit={uiStore.submitManageModal}
          onClose={uiStore.closeManageModal}
        />
        {!WEB && <ListenClipboard />}
        {/* @ts-expect-error */}
        <Heatmap.Control />
      </Component>
    </Suspense>
  ))
}

export default AppCommon
