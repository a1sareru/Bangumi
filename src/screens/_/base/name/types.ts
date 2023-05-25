/*
 * @Author: czy0729
 * @Date: 2022-06-13 10:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 18:15:29
 */
import { TextProps } from '@components'
import { Override, ReactNode, UserId } from '@types'

export type Props = Override<
  TextProps,
  {
    /** 用户Id, 用来判断是否你的好友 */
    userId?: UserId

    /** 是否显示是否好友 label */
    showFriend?: boolean

    /** 右侧额外 */
    right?: ReactNode

    /** 是否禁用点击展开名字 */
    disabled?: boolean
  }
>
