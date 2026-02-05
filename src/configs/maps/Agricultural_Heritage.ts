import type { MapConfig } from '@/types/gis'

export const agriHeritConfig: MapConfig = {
  mapTitle: '农业文化遗产',
  layers: [
    {
      id: '中国重要农业文化遗产',
      title: '中国重要农业文化遗产',
      geojsonUrl: '/Agricultural Heritage/农口-中国重要农业文化遗产.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'city', 'district'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'province'], // 其他属性字段
      fieldLabels: {
        村庄: '农业遗产',
        年份: '认定年份',
        province: '所属省份',
      },
      color: [76, 153, 0, 0.85], // 绿色
    },
    {
      id: 'giahsChina',
      title: '全球重要农业文化遗产',
      geojsonUrl: '/Agricultural Heritage/GIAHS_China.geojson',
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
  ],
}
