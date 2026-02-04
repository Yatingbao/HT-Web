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
    id: 'giahsChina',
    title: '全球重要农业文化遗产',
    geojsonUrl: '/GIAHS_China.geojson',
    visible: true,
    searchFields: ['name', 'year_recognized'],
    popupTitleField: 'name', // 点位名称字段
    popupContentFields: ['year_recognized'], // 其他属性字段
    fieldLabels: {
      name: '遗产名称',
      year_recognized: '认定年份',
    },
    color: [50, 120, 200, 0.85], // 蓝色
  },
  // 可以继续添加更多图层，每个指定不同颜色
  {
    id: 'Best_Tourism_Villages',
    title: '联合国“最佳旅游乡村”',
    geojsonUrl: '/Best_Tourism_Villages.geojson',
    visible: true,
    searchFields: ['name', 'year', 'province'],
    popupTitleField: 'name', // 点位名称字段
    popupContentFields: ['year', 'province'], // 其他属性字段
    fieldLabels: {
      name: '村庄名称',
      year: '认定年份',
      province: '所属省份',
    },
    color: [76, 153, 0, 0.85], // 绿色
  },
]
