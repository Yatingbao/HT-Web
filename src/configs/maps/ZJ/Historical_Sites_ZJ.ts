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
    id: '浙江省历史文化传统村落保护利用示范村',
    title: '浙江省历史文化传统村落保护利用示范村',
    geojsonUrl: '/Historical Sites ZJ/浙江省历史文化传统村落保护利用示范村.geojson',
    visible: true,
    searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    popupTitleField: '村庄', // 点位名称字段
    popupContentFields: ['年份', 'district'], // 其他属性字段
    fieldLabels: {
      name: '村庄名称',
      年份: '认定年份',
      district: '所属县市',
    },
    color: [50, 120, 200, 0.85], // 蓝色
  },
  // 可以继续添加更多图层，每个指定不同颜色
  {
    id: '浙江省历史文化传统村落保护利用重点村',
    title: '浙江省历史文化传统村落保护利用重点村',
    geojsonUrl: '/Historical Sites ZJ/浙江省历史文化传统村落保护利用重点村.geojson',
    visible: true,
    searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    popupTitleField: '村庄', // 点位名称字段
    popupContentFields: ['年份', 'district'], // 其他属性字段
    fieldLabels: {
      name: '村庄名称',
      年份: '认定年份',
      district: '所属县市',
    },
    color: [76, 153, 0, 0.85], // 绿色
  },
  {
    id: '浙江省历史文化名镇名村街区',
    title: '浙江省历史文化名镇名村街区',
    geojsonUrl: '/Historical Sites ZJ/浙江省历史文化名镇名村街区.geojson',
    visible: true,
    searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    popupTitleField: '村庄', // 点位名称字段
    popupContentFields: ['年份', 'district'], // 其他属性字段
    fieldLabels: {
      name: '村庄名称',
      年份: '认定年份',
      district: '所属县市',
    },
    color: [150, 60, 50, 0.85], // 绿色
  },
]
