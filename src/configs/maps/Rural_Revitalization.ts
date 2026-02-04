export interface LayerConfig {
  id: string
  title: string
  geojsonUrl: string
  visible: boolean
  searchFields: string[]
  popupTitleField: string // 点位名称字段
  popupContentFields?: string[] // 其他属性字段
  fieldLabels?: Record<string, string>
  color?: [number, number, number, number] // 新增：每个图层的颜色
}

export const layerConfigs: LayerConfig[] = [
  {
    id: '国家乡村振兴示范县',
    title: '国家乡村振兴示范县',
    geojsonUrl: '/Rural Revitalization/国家乡村振兴示范县.geojson',
    visible: true,
    searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    popupTitleField: '村庄', // 点位名称字段
    popupContentFields: ['年份', 'city'], // 其他属性字段
    fieldLabels: {
      name: '村庄名称',
      年份: '认定年份',
      city: '所属城市',
    },
    color: [50, 120, 200, 0.85], // 蓝色
  },
  // 可以继续添加更多图层，每个指定不同颜色
]
