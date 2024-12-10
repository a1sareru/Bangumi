/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:46:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 15:16:42
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  history: [],

  /** 云快照 */
  ota: {},

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
