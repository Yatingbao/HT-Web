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
    id: '浙江省 3A 级景区村庄示范村',
    title: '浙江省 3A 级景区村庄示范村',
    geojsonUrl: '/Leisure Agri ZJ/文旅口_浙江省 3A 级景区村庄示范村.geojson',
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
    id: '浙江省文化示范村（社区）',
    title: '浙江省文化示范村（社区）',
    geojsonUrl: '/Leisure Agri ZJ/浙江省文化示范村（社区）.geojson',
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
]
