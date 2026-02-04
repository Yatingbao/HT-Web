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
    id: 'countyRanch',
    title: '全国休闲农业旅游牧场',
    geojsonUrl: '/Counties/National_Sightseeing_Tourism_Ranch.geojson',
    visible: true,
    searchFields: ['全国休', '年份', '备注'],
    popupTitleField: '全国休', // 点位名称字段
    popupContentFields: ['年份', '备注'], // 其他属性字段
    fieldLabels: {
      全国休: '牧场名称',
      年份: '认定年份',
      备注: '描述信息',
    },
    color: [226, 119, 40, 0.85], // 橙色
  },
  {
    id: 'giahsChina',
    title: '国家级农业现代化示范区',
    geojsonUrl: '/Counties/国家级农业现代化示范区.geojson',
    visible: true,
    searchFields: ['村庄', '年份', 'province'],
    popupTitleField: '村庄', // 点位名称字段
    popupContentFields: ['年份', 'province'], // 其他属性字段
    fieldLabels: {
      name: '示范区',
      year: '认定年份',
      province: '所属省份',
    },
    color: [50, 120, 200, 0.85], // 蓝色
  },
  {
    id: '全国休闲农业与乡村旅游示范县',
    title: '全国休闲农业与乡村旅游示范县',
    geojsonUrl: '/Counties/全国休闲农业与乡村旅游示范县.geojson',
    visible: true,
    searchFields: ['村庄', '年份', 'province'],
    popupTitleField: '村庄', // 点位名称字段
    popupContentFields: ['年份', 'province'], // 其他属性字段
    fieldLabels: {
      name: '示范县',
      year: '认定年份',
      province: '所属省份',
    },
    color: [90, 100, 200, 0.85], // 蓝色
  },
  // 可以继续添加更多图层，每个指定不同颜色
]
