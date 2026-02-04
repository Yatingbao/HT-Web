import { useMapStore } from '@/store/mapStore'
import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import _ from 'lodash'

export function useLayers() {
  const mapStore = useMapStore()

  /**
   * 加载业务图层数据
   */
  const loadBusinessLayers = async (configs: any[]) => {
    const { view } = mapStore
    if (!view || !view.map) return

    for (const cfg of configs) {
      // 1. 创建图层实例
      const layer = new GraphicsLayer({
        id: cfg.id,
        title: cfg.title,
        visible: cfg.visible !== false,
      })

      try {
        // 2. 获取数据
        const response = await fetch(cfg.geojsonUrl)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const geojson = await response.json()

        // 3. 转换 Graphics
        const graphics = geojson.features
          .map((f: any) => {
            // 确保坐标存在
            if (!f.geometry || !f.geometry.coordinates) return null
            const [lon, lat] = f.geometry.coordinates

            // 重要：在这里创建 Point 实例
            const pt = new Point({
              longitude: Number(lon),
              latitude: Number(lat),
              spatialReference: { wkid: 4326 },
            })

            return new Graphic({
              geometry: pt,
              attributes: { ...f.properties }, // 浅拷贝一份属性
              symbol: {
                type: 'simple-marker',
                color: cfg.color || [64, 158, 255],
                outline: { color: [255, 255, 255], width: 1 },
                size: 6,
              } as any,
            })
          })
          .filter(Boolean)

        // 4. 批量添加并注册
        layer.addMany(graphics)
        view.map.add(layer)

        // 必须确保 mapStore 有 registerLayer 方法
        mapStore.registerLayer(cfg.id, layer)

        console.log(`图层 ${cfg.title} 加载成功，点位数: ${graphics.length}`)
      } catch (err) {
        console.error(`图层 ${cfg.title} 加载失败:`, err)
      }
    }
  }

  /**
   * 搜索过滤逻辑
   */
  const applySearch = (query: string) => {
    const q = query.toLowerCase().trim()
    const stats: Record<string, number> = {}

    // 遍历 Store 中注册的所有图层
    _.forEach(mapStore.pointLayers, (layer, id) => {
      let count = 0
      layer.graphics.forEach((g: __esri.Graphic) => {
        if (!q) {
          g.visible = true
          count++
        } else {
          // 全文检索属性值
          const text = Object.values(g.attributes || {})
            .join(' ')
            .toLowerCase()
          const isMatch = text.includes(q)
          g.visible = isMatch
          if (isMatch) count++
        }
      })
      stats[id] = count
    })

    mapStore.filterResults = stats
  }

  return { loadBusinessLayers, applySearch }
}
