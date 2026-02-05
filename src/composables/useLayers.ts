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
      const layer = new GraphicsLayer({
        id: cfg.id,
        title: cfg.title,
        visible: cfg.visible !== false,
      })

      try {
        const response = await fetch(cfg.geojsonUrl)
        const geojson = await response.json()

        const graphics = geojson.features
          .map((f: any) => {
            if (!f.geometry || !f.geometry.coordinates) return null
            const [lon, lat] = f.geometry.coordinates

            return new Graphic({
              geometry: new Point({
                longitude: Number(lon),
                latitude: Number(lat),
                spatialReference: { wkid: 4326 },
              }),
              attributes: {
                ...f.properties,
                layerId: cfg.id, // 注入 layerId 方便后续查找配置
              },
              symbol: {
                type: 'simple-marker',
                color: cfg.color || [64, 158, 255],
                outline: { color: [255, 255, 255], width: 1 },
                size: 6,
              } as any,
            })
          })
          .filter(Boolean)

        layer.addMany(graphics)
        view.map.add(layer)

        if (mapStore.registerLayers) {
          mapStore.registerLayers(cfg.id, layer)
        }

        // 初次加载完成后，触发一次统计更新
        updateGlobalStats('')
      } catch (err) {
        console.error(`❌ 图层 [${cfg.title}] 加载失败:`, err)
      }
    }
  }

  /**
   * 核心修改：统一的搜索与分省统计更新逻辑
   */
  const applySearch = (query: string) => {
    updateGlobalStats(query)
  }

  const updateGlobalStats = (query: string) => {
    const q = query.toLowerCase().trim()
    const filterStats: Record<string, number> = {} // 存每个图层的点数
    const provinceMap: Record<string, number> = {} // 存分省聚合结果

    // 1. 遍历所有注册的点图层
    _.forEach(mapStore.pointLayers, (layer, id) => {
      let layerMatchCount = 0

      // 获取该图层在配置中的可见性 (来自 LayerPanel 的勾选状态)
      const layerConfig = mapStore.layerConfigs.find((c) => c.id === id)
      const isLayerVisible = layerConfig ? layerConfig.visible : true

      layer.graphics.forEach((g: __esri.Graphic) => {
        // 判断搜索匹配
        const text = Object.values(g.attributes || {})
          .join(' ')
          .toLowerCase()
        const isMatch = !q || text.includes(q)

        // 图形是否在地图上显示：搜索匹配 且 图层被勾选
        g.visible = isMatch && isLayerVisible

        if (isMatch && isLayerVisible) {
          layerMatchCount++
          // 2. 统计省份数据 (只统计当前可见且匹配的点)
          const prov = g.attributes.province || g.attributes.省份 || '未知'
          provinceMap[prov] = (provinceMap[prov] || 0) + 1
        }
      })

      filterStats[id] = layerMatchCount
    })

    // 3. 更新 Store
    mapStore.filterResults = filterStats

    // 将 provinceMap 转为数组并排序存入 provinceStats
    mapStore.provinceStats = Object.entries(provinceMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }

  return { loadBusinessLayers, applySearch }
}
