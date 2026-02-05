import { defineStore } from 'pinia'
import { ref, markRaw } from 'vue'

export const useMapStore = defineStore('mapStore', () => {
  // GIS 实例 (使用 markRaw 避免 Vue 深度响应式破坏 ArcGIS 对象性能)
  const view = ref<any>(null)
  const map = ref<any>(null)
  const adminLayer = ref<any>(null)
  const pointLayers = ref<Record<string, any>>({})
  const registerLayers = (id: string, layer: any) => {
    pointLayers.value[id] = markRaw(layer)
  }

  // 业务状态
  const filterResults = ref<Record<string, number>>({})
  const selectedFeature = ref<any>(null)
  const isNationalStats = ref(false)
  const provinceStats = ref<any[]>([])
  const isPolygonAnalysis = ref(false)
  const layerProvinceMap = ref<Record<string, Record<string, number>>>({})
  // --- [新增] 修复 CitySelector 报错的缺失状态 ---
  const currentCityName = ref('全国')
  const showCityPanel = ref(false)
  const analysisMode = ref<'none' | 'spatial' | 'province'>('none')
  // 设置方法
  const setView = (v: any) => {
    view.value = markRaw(v)
  }
  const setMap = (m: any) => {
    map.value = markRaw(m)
  }
  const setAdminLayer = (l: any) => {
    adminLayer.value = markRaw(l)
  }

  const clearScreen = () => {
    selectedFeature.value = null
    isNationalStats.value = false
    isPolygonAnalysis.value = false
    filterResults.value = {}
    layerProvinceMap.value = {}
    analysisMode.value = 'none'
    provinceStats.value = [] // 重置统计数据
    currentCityName.value = '全国'
    if (adminLayer.value) adminLayer.value.removeAll()
  }

  return {
    view,
    map,
    adminLayer,
    pointLayers,
    registerLayers,
    filterResults,
    selectedFeature,
    isNationalStats,
    provinceStats,
    isPolygonAnalysis,
    currentCityName, // 导出
    showCityPanel, // 导出
    setView,
    setMap,
    setAdminLayer,
    clearScreen,
  }
})
