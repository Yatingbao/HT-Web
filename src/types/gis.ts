export interface LayerConfig {
  id: string
  title: string
  geojsonUrl: string
  visible: boolean
  searchFields: string[]
  popupTitleField: string
  popupContentFields?: string[]
  fieldLabels?: Record<string, string>
  // 建议将 color 标记为必填，防止渲染报错
  color: [number, number, number, number | undefined]
}

// 定义整个地图的配置，方便 App.vue 导航使用
export interface MapConfig {
  mapTitle: string
  layers: LayerConfig[]
}
