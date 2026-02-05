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
  const drawBoundary = async (cityName: string, isProvince: boolean) => {
    const { view, adminLayer } = mapStore
    if (!view || !adminLayer) return

    try {
      const res = await getDistrictData(cityName)
      const d = res.data.districts?.[0]

      if (!d?.polyline) {
        console.warn('未获取到行政边界数据')
        return
      }

      // 解析高德 polyline 数据格式
      const rings = d.polyline
        .split('|')
        .map((part: string) => part.split(';').map((p: string) => p.split(',').map(Number)))

      // 创建多边形并指定 WGS84 坐标系
      const poly = new Polygon({
        rings,
        spatialReference: { wkid: 4326 },
      })

      // 清理旧边界
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
        attributes: { name: d.name },
      })

      adminLayer.add(graphic)

      // 视角跳转
      view.goTo(poly.extent.expand(1.5))

      return graphic
    } catch (err) {
      console.error('获取边界失败:', err)
    }
  }

  /**
   * 2. 空间分析：计算选定区域内的点位分布
   * @param targetGeometry 可选：直接传入几何体以避免异步读取延迟
   */
  const runSpatialQuery = (targetGeometry?: any) => {
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
   * 3. 全局/属性统计：基于属性字段汇总全国分布
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
      .sort((a: any, b: any) => b.count - a.count)
  }

  return { drawBoundary, runSpatialQuery, runAttributeStats }
}
