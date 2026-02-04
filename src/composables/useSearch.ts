import { useMapStore } from '@/store/mapStore'
import Graphic from '@arcgis/core/Graphic'
import _ from 'lodash'

export function useSearch() {
  const mapStore = useMapStore()

  /**
   * 执行全文搜索过滤
   * @param query 搜索关键词
   */
  const applySearch = (query: string) => {
    const q = query.trim().toLowerCase()
    const stats: Record<string, number> = {}

    // 遍历 Store 中存储的所有业务图层
    _.forEach(mapStore.pointLayers, (layer, id) => {
      let count = 0

      layer.graphics.forEach((g: Graphic) => {
        // 如果没有关键词，全部显示
        if (!q) {
          g.visible = true
          count++
          return
        }

        // 将该点位的所有属性值拼接成字符串进行模糊匹配
        const attributes = g.attributes || {}
        const searchString = Object.values(attributes).join(' ').toLowerCase()

        const isMatch = searchString.includes(q)
        g.visible = isMatch

        if (isMatch) count++
      })

      stats[id] = count
    })

    // 更新 Store 里的统计结果，UI 会自动响应
    mapStore.filterResults = stats
  }

  return {
    applySearch,
  }
}
