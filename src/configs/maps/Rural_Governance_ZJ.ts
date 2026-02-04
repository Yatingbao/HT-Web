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
    id: '浙江省农村综合改革集成建设项目',
    title: '浙江省农村综合改革集成建设项目',
    geojsonUrl: 'Rural Governance ZJ/浙江省农村综合改革集成建设项目.geojson',
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
  {
    id: '浙江美丽宜居村庄示范',
    title: '浙江美丽宜居村庄示范',
    geojsonUrl: '/Rural Governance ZJ/住建口_浙江美丽宜居村庄示范.geojson',
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
