/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-irregular-whitespace */
/*
 * @Author: czy0729
 * @Date: 2019-10-05 16:48:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-14 15:16:29
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'

const title = '恰饭'

export default
@withHeader({
  screen: title
})
@observer
class Qiafan extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    hm('qiafan', 'Qiafan')
  }

  render() {
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.outer}
      >
        <Text lineHeight={2}>
          　　自19年2月开始，项目已持续开发快一年了。最初仅是为了练手而建立，也是第一次做app
          (现实中就是个做网页的)
          ，后来发现比想象的有趣太多，便一直开发至今。回头一算，实际撸码时间已经不少于5000个小时。
        </Text>
        <Text style={_.mt.sm} lineHeight={2}>
          　　现阶段功能越堆越多，需求有点混乱了，感觉有点大杂烩了，需要认真思考一下，把项目拉回正轨。另外也知道性能有点比不上友商，大前提下还是框架的问题
          (当然也是水平问题)。
        </Text>
        <Text style={_.mt.sm} lineHeight={2}>
          　　接下来作者会花更多心思，打磨[细节]和优化[性能]，绝对不咕。觉得好用的，可以在github上给星星，也可以在分发平台
          (比入酷安) 上打分,
          这会极大地鼓励作者继续开发，这些无形的资产都会对作者以后的职业生涯产生重要的帮助。
        </Text>
        <Text style={_.mt.sm} lineHeight={2}>
          　　最后无任欢迎提需求和意见
          (当然会优先并尽可能满足付费用户)。接下来有计划爬取轻小说、漫画和真人剧的直接观看地址。
        </Text>
        <Text style={_.mt.sm} lineHeight={2} align='right'>
          　　19/12/14
        </Text>
        <Text
          style={{
            marginTop: 80
          }}
          align='center'
          type='sub'
        >
          (当然支持下面的方式bgm38)
        </Text>
        <Flex
          style={{
            marginTop: 400
          }}
          justify='center'
        >
          <Image
            size={240}
            height={274}
            mode='aspectFit'
            src={require('@assets/images/qr/alipay.png')}
          />
        </Flex>
        <Text
          style={{
            marginTop: 160,
            marginBottom: 40
          }}
          align='center'
          type='sub'
        >
          (上面是支付宝)
        </Text>
        <Text
          style={{
            marginVertical: 20
          }}
          align='center'
          type='sub'
        >
          (老板们打🍚前可以的话最好备注一下bgm的id, 好让记录下来)
        </Text>
        <Text
          style={{
            marginTop: 40
          }}
          align='center'
          type='sub'
        >
          (下面是微信)
        </Text>
        <Flex
          style={{
            marginTop: 160
          }}
          justify='center'
        >
          <Image
            size={240}
            height={296}
            src={require('@assets/images/qr/wx.png')}
          />
        </Flex>
      </ScrollView>
    )
  }
}
