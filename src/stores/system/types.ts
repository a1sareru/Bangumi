/*
 * @Author: czy0729
 * @Date: 2024-01-30 23:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-30 23:06:31
 */
import { UserId } from '@types'

/**
 * - true 显示
 * - false 折叠
 * - -1 永久隐藏
 */
export type LayoutValue = true | false | -1

export type HomeRenderTabs = ('Discovery' | 'Timeline' | 'Home' | 'Rakuen' | 'User' | 'Tinygrail')[]

export type UserRemark = Record<
  /** 需要使用数字 ID */
  UserId,
  string
>

export type TrackIds = UserId[]

export type LikeRec = (1 | 0)[]
