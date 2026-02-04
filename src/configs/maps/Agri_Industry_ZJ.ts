import type { MapInstanceConfig } from '@/types/gis'

export const zhejiangAgriConfig: MapInstanceConfig = {
  mapTitle: '浙江省农业产业专题地图',
  id: 'zhejiang-agri',
  center: [120.15, 30.28], // 浙江省大致中心
  zoom: 8,
  layers: [
    {
      id: '精品村',
      title: '浙江省美丽乡村特色精品村',
      geojsonUrl: 'Agri Industry ZJ/农口_浙江省美丽乡村特色精品村.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'district'],
      popupTitleField: '村庄',
      popupContentFields: ['年份', 'district'],
      fieldLabels: {
        name: '村庄名称',
        年份: '认定年份',
        district: '所属县市',
      },
      color: [50, 120, 200, 0.85],
    },
    {
      id: '示范园',
      title: '浙江省农村产业融合发展示范园',
      geojsonUrl: '/Agri Industry ZJ/浙江省农村产业融合发展示范园.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'district'],
      popupTitleField: '村庄',
      popupContentFields: ['年份', 'district'],
      fieldLabels: {
        name: '园区名称',
        年份: '认定年份',
        district: '所属县市',
      },
      color: [76, 153, 0, 0.85],
    },
    {
      id: '浙江省农业特色强镇',
      title: '浙江省农业特色强镇',
      geojsonUrl: '/Agri Industry ZJ/浙江省农业特色强镇.geojson',
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
    {
      id: '浙江省现代农业园区',
      title: '浙江省现代农业园区',
      geojsonUrl: '/Agri Industry ZJ/浙江省现代农业园区.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'district'], // 其他属性字段
      fieldLabels: {
        name: '村庄名称',
        年份: '认定年份',
        district: '所属县市',
      },
      color: [119, 136, 153, 0.85], // 绿色
    },
  ],
}
