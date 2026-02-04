import { useMapStore } from '@/store/mapStore'
import { getDistrictData } from '@/api/amapService'
import Polygon from '@arcgis/core/geometry/Polygon'
import Graphic from '@arcgis/core/Graphic'
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine'
import _ from 'lodash'

export function useAdminBoundary() {
  const mapStore = useMapStore()

  /**
   * 1. 绘制行政区划边界
   */
  const drawBoundary = async (cityName: string, isProvince: boolean) => {
    const { view, adminLayer } = mapStore
    if (!view || !adminLayer) return

    try {
      const res = await getDistrictData(cityName)
      const d = res.data.districts?.[0]
      if (!d?.polyline) return

      const rings = d.polyline
        .split('|')
        .map((part: string) => part.split(';').map((p: string) => p.split(',').map(Number)))

      const poly = new Polygon({ rings, spatialReference: { wkid: 4326 } })

      adminLayer.removeAll()
      const graphic = new Graphic({
        geometry: poly,
        symbol: {
          type: 'simple-fill',
          color: isProvince ? [255, 223, 0, 0.05] : [64, 158, 255, 0.05],
          outline: { color: isProvince ? [255, 223, 0] : [64, 158, 255], width: 1.5 },
        } as any,
        attributes: { name: d.name },
      })

      adminLayer.add(graphic)

      // 视角跳转（2D 模式下 expand 决定留白区域）
      view.goTo(poly.extent.expand(1.5))

      return graphic
    } catch (err) {
      console.error('获取边界失败:', err)
    }
  }

  /**
   * 2. 空间分析：计算当前边界内的点位
   * @param targetGeometry 可选参数，直接传入刚生成的几何体，避免从图层中提取失败
   */

  const runSpatialQuery = (targetGeometry?: __esri.Geometry) => {
    const { adminLayer, pointLayers } = mapStore
    const boundary = targetGeometry || adminLayer?.graphics.getItemAt(0)?.geometry

    if (!boundary) return

    const stats: Record<string, number> = {}
    const provMap: Record<string, number> = {}

    // 打印调试信息：检查边界范围和坐标系
    console.log('开始空间分析，边界坐标系:', boundary.spatialReference.wkid)

    _.forEach(pointLayers, (layer, id) => {
      if (!layer.visible) return

      let layerCount = 0
      layer.graphics.forEach((g) => {
        // 核心检查：如果 g.geometry 是 null 或者坐标系不匹配，会导致 contains 永远为 false
        if (g.visible && g.geometry) {
          // 强制确保点和面在同一个坐标系计算 (WGS84)
          const isInside = geometryEngine.contains(boundary as any, g.geometry as any)

          if (isInside) {
            layerCount++
            const pName = g.attributes.province || g.attributes.省份 || '其他'
            provMap[pName] = (provMap[pName] || 0) + 1
          }
        }
      })

      if (layerCount > 0) stats[id] = layerCount
    })

    console.log('分析完成，结果:', stats)

    mapStore.isPolygonAnalysis = true
    mapStore.filterResults = stats
    mapStore.provinceStats = Object.entries(provMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }

  /**
   * 3. 全局统计：不基于空间位置，基于当前图层开启状态进行全表汇总
   */
  const runAttributeStats = () => {
    const { pointLayers } = mapStore
    const statsMap: Record<string, number> = {}

    _.forEach(pointLayers, (layer) => {
      if (!layer.visible) return
      layer.graphics.forEach((g) => {
        if (!g.visible) return
        const attr = g.attributes || {}
        const pName = attr.province || attr.PROVINCE || attr.省份 || '其他'
        statsMap[pName] = (statsMap[pName] || 0) + 1
      })
    })

    mapStore.isNationalStats = true
    mapStore.provinceStats = Object.entries(statsMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }

  return { drawBoundary, runSpatialQuery, runAttributeStats }
}
