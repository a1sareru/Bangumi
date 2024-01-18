/*
 * @Author: czy0729
 * @Date: 2024-01-18 07:26:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 07:34:49
 */
import { useKeyboardAdjustResize, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 电波提醒页面逻辑 */
export function useNotifyPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })
  useKeyboardAdjustResize()
}
