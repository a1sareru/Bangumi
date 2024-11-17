/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:38:44
 */
import React from 'react'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { getJSON } from '@assets/json'
import { Ctx } from '../../types'
import Filter from '../filter'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

const ListAll = () => {
  const { $ } = useStore<Ctx>()
  const data = getJSON('group', [])
  const { filter } = $.state
  return (
    <>
      <Filter $={$} />
      <PaginationList
        style={_.mt._md}
        contentContainerStyle={_.container.outer}
        data={
          filter ? data.filter(item => item.t.toLowerCase().includes(filter.toLowerCase())) : data
        }
        numColumns={2}
        renderItem={renderItem}
      />
    </>
  )
}

export default ob(ListAll, COMPONENT)
