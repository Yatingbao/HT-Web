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
    id: '中国历史文化名村',
    title: '中国历史文化名村',
    geojsonUrl: '/Villages/中国历史文化名村.geojson',
    visible: true,
    searchFields: ['文化示范村', '年份', 'city', 'district'],
    popupTitleField: '文化示范村', // 点位名称字段
    popupContentFields: ['年份', 'city'], // 其他属性字段
    fieldLabels: {
      文化示范村: '文化示范村',
      年份: '认定年份',
      city: '所属城市',
    },
    color: [50, 120, 200, 0.85], // 蓝色
  },
  // 可以继续添加更多图层，每个指定不同颜色
  {
    id: '中国美丽休闲乡村',
    title: '中国美丽休闲乡村',
    geojsonUrl: '/Villages/中国美丽休闲乡村.geojson',
    visible: true,
    searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    popupTitleField: '村庄', // 点位名称字段
    popupContentFields: ['年份', 'city'], // 其他属性字段
    fieldLabels: {
      name: '村庄名称',
      年份: '认定年份',
      city: '所属城市',
    },
    color: [76, 153, 0, 0.85], // 绿色
  },
  {
    id: '“五好两宜”和美乡村',
    title: '“五好两宜”和美乡村',
    geojsonUrl: '/Villages/“五好两宜”和美乡村.geojson',
    visible: true,
    searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    popupTitleField: '村庄', // 点位名称字段
    popupContentFields: ['年份', 'city'], // 其他属性字段
    fieldLabels: {
      name: '村庄名称',
      年份: '认定年份',
      city: '所属城市',
    },
    color: [96, 23, 150, 0.85], // 紫色
  },
  {
    id: '国家美丽宜居村庄示范',
    title: '国家美丽宜居村庄示范',
    geojsonUrl: '/Villages/国家美丽宜居村庄示范.geojson',
    visible: true,
    searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    popupTitleField: '村庄', // 点位名称字段
    popupContentFields: ['年份', 'city'], // 其他属性字段
    fieldLabels: {
      name: '村庄名称',
      年份: '认定年份',
      city: '所属城市',
    },
    color: [250, 137, 26, 0.85], // 橙色
  },
]
