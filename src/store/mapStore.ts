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
  // --- [新增] 搜索状态 ---
  const searchKey = ref('') // 存储当前搜索框的关键词

  // --- [新增] 图层配置（用于获取 fieldLabels 和图层颜色） ---
  const layerConfigs = ref<any[]>([])
  const filterResults = ref<Record<string, number>>({})
  const selectedFeature = ref<any>(null)
  const isNationalStats = ref(false)
  const provinceStats = ref<any[]>([])
  const isPolygonAnalysis = ref(false)
  const isAnalysisActive = ref(false)
  const layerProvinceMap = ref<Record<string, Record<string, number>>>({})
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
    isAnalysisActive.value = false
    filterResults.value = {}
    layerProvinceMap.value = {}
    analysisMode.value = 'none'
    provinceStats.value = [] // 重置统计数据
    currentCityName.value = '全国'
    searchKey.value = '' // 清空搜索
    if (adminLayer.value) adminLayer.value.removeAll()
  }

  return {
    view,
    map,
    adminLayer,
    pointLayers,
    registerLayers,
    searchKey, // 导出搜索词
    layerConfigs,
    filterResults,
    isAnalysisActive,
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
