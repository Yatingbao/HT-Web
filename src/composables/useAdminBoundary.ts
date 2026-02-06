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
   * @param cityName 城市名称
   * @param isProvince 是否为省级（决定渲染颜色）
   */
  // useAdminBoundary.ts

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

      const poly = new Polygon({
        rings,
        spatialReference: { wkid: 4326 },
      })

      adminLayer.removeAll()
      const graphic = new Graphic({
        geometry: poly,
        symbol: {
          type: 'simple-fill',
          color: isProvince ? [255, 223, 0, 0.05] : [64, 158, 255, 0.05],
          outline: {
            color: isProvince ? [255, 223, 0] : [64, 158, 255],
            width: 1.5,
          },
        } as any,
      })
      adminLayer.add(graphic)

      if (poly.extent) {
        await view.goTo(poly.extent.expand(1.5))
      }
      // 2. 核心：跳转后立即执行空间分析并打开 Popup
      // 我们传入刚刚生成的 poly，避免从图层中读取的延迟
      runSpatialQuery(poly)

      return graphic
    } catch (err) {
      console.error('跳转失败:', err)
    }
  }

  /**
   * 2. 空间分析：计算选定区域内的点位分布
   * @param targetGeometry 可选：直接传入几何体以避免异步读取延迟
   */
  const runSpatialQuery = (targetGeometry?: any) => {
    mapStore.isAnalysisActive = true
    mapStore.isPolygonAnalysis = true
    mapStore.selectedFeature = null
    const { adminLayer, pointLayers } = mapStore
    // 获取边界对象
    const rawBoundary = targetGeometry || adminLayer?.graphics.getItemAt(0)?.geometry
    if (!rawBoundary) {
      console.warn('空间分析失败：未找到有效边界')
      return
    }

    // 关键修正：修复多边形拓扑（修复环方向、自相交等问题，确保 contains 计算准确）
    const boundary = geometryEngine.simplify(rawBoundary)

    const stats: Record<string, number> = {}
    const provMap: Record<string, number> = {}

    // 遍历所有已注册的业务图层
    Object.entries(pointLayers).forEach(([id, layer]: [string, any]) => {
      console.log(`正在分析图层: ${id}, 总点数: ${layer.graphics.length}`)

      let layerCount = 0

      layer.graphics.forEach((g: any) => {
        // 只统计可见的点，且必须具有几何信息
        if (g.geometry && g.visible) {
          if (geometryEngine.contains(boundary, g.geometry)) {
            try {
              // 执行包含判断
              const isInside = geometryEngine.contains(boundary, g.geometry)

              if (isInside) {
                layerCount++

                // 分省统计逻辑
                const attr = g.attributes || {}
                const pName = attr.province || attr.PROVINCE || attr.省份 || '其他'
                provMap[pName] = (provMap[pName] || 0) + 1
              }
            } catch (e) {
              console.error('空间判断执行异常:', e)
            }
          }
        }
      })

      if (layerCount > 0) {
        stats[id] = layerCount
      }
    })

    // 更新 Store 状态，驱动 UI (SpatialPopup) 更新
    mapStore.isPolygonAnalysis = true
    mapStore.filterResults = stats
    mapStore.provinceStats = Object.entries(provMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a: any, b: any) => b.count - a.count)

    console.log('分析存入 Store 的结果:', stats)
  }

  /**
   * 3. 统计
   * @param targetGeometry 可选：直接传入几何体以避免异步读取延迟
   */
  const runAttributeStats = () => {
    mapStore.currentCityName = '全国'
    mapStore.isAnalysisActive = true
    mapStore.isPolygonAnalysis = false
    mapStore.selectedFeature = null

    // 3. 清理之前的局部状态
    mapStore.filterResults = {}
    if (mapStore.adminLayer) {
      mapStore.adminLayer.removeAll() // 建议在看全国统计时，清除地图上的黄色边界线
    }

    mapStore.isAnalysisActive = true
    mapStore.isPolygonAnalysis = false // 关闭局部空间分析标记
    mapStore.selectedFeature = null

    // 清空之前的局部统计结果，确保显示的是全局数据
    mapStore.filterResults = {}

    const { pointLayers } = mapStore
    const statsMap: Record<string, number> = {}
    const layersArray = Object.values(pointLayers)

    layersArray.forEach((layer: any) => {
      if (!layer.visible) return
      layer.graphics.forEach((g: any) => {
        if (!g.visible) return
        const attr = g.attributes || {}
        const pName = attr.province || attr.PROVINCE || attr.省份 || '其他'
        statsMap[pName] = (statsMap[pName] || 0) + 1
      })
    })

    mapStore.provinceStats = Object.entries(statsMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }
  return { drawBoundary, runSpatialQuery, runAttributeStats }
}
