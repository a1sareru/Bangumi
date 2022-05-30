/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:17:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 12:23:04
 */
import React from 'react'
import { Page } from '@components'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import ToolBar from './tool-bar'
import Item from './item'
import Tips from './tips'
import Store from './store'

const Series = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { fixed } = $.state
    return (
      <>
        <Header />
        <Page loaded={$.state._loaded}>
          {fixed && <ToolBar />}
          <PaginationList
            key={$.state.sort}
            contentContainerStyle={_.container.bottom}
            data={$.data}
            ListHeaderComponent={!fixed && <ToolBar />}
            renderItem={({ item }) => <Item item={item} />}
            onPage={$.onPage}
          />
          <Tips />
        </Page>
      </>
    )
  })
}

export default ic(Store, Series)
