/*
 * @Author: czy0729
 * @Date: 2024-01-06 20:39:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 21:08:27
 */
import { useEffect } from 'react'
import { StatusBar } from '@components'
import { uiStore } from '@stores'
import { useFocusEffect, useIsFocused, useMount, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 空间页面逻辑 */
export function useZonePage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })

  const isFocused = useIsFocused()
  useEffect(() => {
    if (!isFocused) {
      uiStore.closePopableSubject()
      uiStore.closeLikesGrid()
    }
  }, [isFocused])

  useFocusEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content')
    }, 40)
  })

  /** 页面销毁 */
  useMount(() => {
    return () => {
      $.setState({
        mounted: false
      })
    }
  })
}
