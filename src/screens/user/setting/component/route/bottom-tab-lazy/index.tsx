/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:45:04
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 震动反馈 */
function BottomTabLazy({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('bottomTabLazy')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '底栏页面懒加载',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.bottomTabLazy}
    >
      <Heatmap id='设置.切换' title='底栏页面懒加载' />
    </ItemSetting>
  ))
}

export default BottomTabLazy
