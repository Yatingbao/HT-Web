import type { MapConfig } from '@/types/gis'

export const ruralGoverCofig: MapConfig = {
  mapTitle: '村庄治理',
  layers: [
    {
      id: '全国乡村治理示范村',
      title: '全国乡村治理示范村',
      geojsonUrl: '/Rural Governance/全国乡村治理示范村.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        村庄: '示范村',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [255, 153, 51, 0.85], // 绿色
    },
    {
      id: '国家美丽宜居小镇示范',
      title: '国家美丽宜居小镇示范',
      geojsonUrl: '/Rural Governance/国家美丽宜居小镇示范.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        村庄: '名称',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [255, 192, 203, 0.85], // 绿色
    },
    {
      id: '国家美丽宜居村庄示范',
      title: '国家美丽宜居村庄示范',
      geojsonUrl: '/Rural Governance/国家美丽宜居村庄示范.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        村庄: '名称',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [107, 142, 35, 0.85], // 绿色
    },
    {
      id: '国家农村综合性改革试点',
      title: '国家农村综合性改革试点',
      geojsonUrl: '/Rural Governance/国家农村综合性改革试点.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        name: '试点',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [50, 120, 200, 0.85], // 蓝色
    },
    // 可以继续添加更多图层，每个指定不同颜色
    {
      id: '全国示范性治理村镇',
      title: '全国示范性治理村镇',
      geojsonUrl: '/Rural Governance/全国示范性治理村镇.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        name: '镇',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [76, 153, 0, 0.85], // 绿色
    },
    {
      id: '“五好两宜”和美乡村',
      title: '“五好两宜”和美乡村',
      geojsonUrl: '/Rural Governance/“五好两宜”和美乡村.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        name: '镇',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [106, 90, 205, 0.85], // 绿色
    },
  ],
}
