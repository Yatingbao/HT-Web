import type { MapConfig } from '@/types/gis'

export const leiAgriCofig: MapConfig = {
  mapTitle: '休闲农业与乡村旅游',
  layers: [
    {
      id: '全国休闲农业与休闲旅游示范点',
      title: '全国休闲农业与休闲旅游示范点',
      geojsonUrl: '/Leisure Agri/全国休闲农业与休闲旅游示范点.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        村庄: '村庄名称',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [50, 120, 200, 0.85], // 蓝色
    },
    // 可以继续添加更多图层，每个指定不同颜色
    {
      id: '全国休闲农业重点县',
      title: '全国休闲农业重点县',
      geojsonUrl: '/Leisure Agri/全国休闲农业重点县.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        村庄: '村镇',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [76, 153, 0, 0.85], // 绿色
    },
    {
      id: '中国美丽休闲乡村',
      title: '中国美丽休闲乡村',
      geojsonUrl: '/Leisure Agri/中国美丽休闲乡村.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        村庄: '名称',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [90, 20, 180, 0.85],
    },
    {
      id: '国家级现代农业产业园',
      title: '国家级现代农业产业园',
      geojsonUrl: '/Leisure Agri/国家级现代农业产业园.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        村庄: '名称',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [153, 102, 204, 0.85],
    },
    {
      id: '全国乡村旅游重点村',
      title: '全国乡村旅游重点村',
      geojsonUrl: '/Leisure Agri/全国乡村旅游重点村.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        村庄: '名称',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [255, 153, 51, 0.85],
    },
    {
      id: '联合国 “最佳旅游乡村”',
      title: '联合国 “最佳旅游乡村”',
      geojsonUrl: '/Leisure Agri/Best_Tourism_Villages.geojson',
      visible: true,
      searchFields: ['name', 'year', 'province'],
      popupTitleField: 'name', // 点位名称字段
      popupContentFields: ['year', 'province'], // 其他属性字段
      fieldLabels: {
        name: '名称',
        year: '认定年份',
        province: '所属城市',
      },
      color: [255, 192, 203, 0.85], // 蓝色
    },
  ],
}
