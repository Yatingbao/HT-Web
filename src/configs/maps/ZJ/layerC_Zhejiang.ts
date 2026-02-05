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
    id: '文化强镇',
    title: '浙江省文化强镇',
    geojsonUrl: '/浙江省文化强镇.geojson',
    visible: true,
    searchFields: ['文化强镇', '年份', 'city', 'district'],
    popupTitleField: '文化强镇', // 点位名称字段
    popupContentFields: ['年份', 'city', 'district'], // 其他属性字段
    fieldLabels: {
      //name: '遗产名称',
      年份: '认定年份',
      city: '地级市',
      district: '区县',
    },
    color: [50, 120, 200, 0.85], // 蓝色
  },
  // 可以继续添加更多图层，每个指定不同颜色
]
