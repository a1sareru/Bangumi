/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:41:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-08 17:10:44
 */
import { observable } from 'mobx'
import store from '@utils/store'
import { NAMESPACE, STATE, TABS } from './ds'

export default class ScreenXXX extends store<typeof STATE> {
  state = observable(STATE)

  init = () => {
    this.setState({
      _loaded: true
    })
  }

  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })
    this.setStorage(NAMESPACE)
  }

  /** 菜单切换 */
  onSelect = (title: string) => {
    const item = TABS.find(item => item.title === title)
    if (item && item.key !== this.state.uri) {
      this.setState({
        uri: item.key
      })
    }
  }
}
