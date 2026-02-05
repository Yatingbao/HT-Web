import type { MapConfig } from '@/types/gis'

export const argiIndusConfig: MapConfig = {
  mapTitle: '农业产业',
  layers: [
    {
      id: '国家级农业产业强镇',
      title: '国家级农业产业强镇',
      geojsonUrl: '/Agri Industry/国家级农业产业强镇.geojson',
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
      id: '全国“一村一品”示范村镇',
      title: '全国“一村一品”示范村镇',
      geojsonUrl: '/Agri Industry/全国“一村一品”示范村镇.geojson',
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
    // {
    //   id: '国家级生态农场',
    //   title: '国家级生态农场',
    //   geojsonUrl: '/Agri Industry/国家级生态农场.geojson',
    //   visible: true,
    //   searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    //   popupTitleField: '村庄', // 点位名称字段
    //   popupContentFields: ['年份', 'city'], // 其他属性字段
    //   fieldLabels: {
    //     村庄: '名称',
    //     年份: '认定年份',
    //     city: '所属城市',
    //   },
    //   color: [90, 20, 180, 0.85],
    // },
    // {
    //   id: '国家级农业现代化示范区',
    //   title: '国家级农业现代化示范区',
    //   geojsonUrl: '/Agri Industry/国家级农业现代化示范区.geojson',
    //   visible: true,
    //   searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    //   popupTitleField: '村庄', // 点位名称字段
    //   popupContentFields: ['年份', 'city'], // 其他属性字段
    //   fieldLabels: {
    //     村庄: '名称',
    //     年份: '认定年份',
    //     city: '所属城市',
    //   },
    //   color: [255, 69, 0, 0.85],
    // },
    // {
    //   id: '国家级现代农业产业园',
    //   title: '国家级现代农业产业园',
    //   geojsonUrl: '/Agri Industry/国家级现代农业产业园.geojson',
    //   visible: true,
    //   searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    //   popupTitleField: '村庄', // 点位名称字段
    //   popupContentFields: ['年份', 'city'], // 其他属性字段
    //   fieldLabels: {
    //     村庄: '名称',
    //     年份: '认定年份',
    //     city: '所属城市',
    //   },
    //   color: [153, 102, 204, 0.85],
    // },
    // {
    //   id: '国家农村产业融合发展示范园',
    //   title: '国家农村产业融合发展示范园',
    //   geojsonUrl: '/Agri Industry/国家农村产业融合发展示范园.geojson',
    //   visible: true,
    //   searchFields: ['村庄', '年份', 'province', 'district', 'city'],
    //   popupTitleField: '村庄', // 点位名称字段
    //   popupContentFields: ['年份', 'city'], // 其他属性字段
    //   fieldLabels: {
    //     村庄: '名称',
    //     年份: '认定年份',
    //     city: '所属城市',
    //   },
    //   color: [255, 153, 51, 0.85],
    // },
    {
      id: '亿元村',
      title: '亿元村',
      geojsonUrl: '/Agri Industry/亿元村.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        name: '村庄名称',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [255, 192, 203, 0.85], // 蓝色
    },
    // 可以继续添加更多图层，每个指定不同颜色
    {
      id: '十亿元镇',
      title: '十亿元镇',
      geojsonUrl: '/Agri Industry/十亿元镇.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'district', 'city'],
      popupTitleField: '村庄', // 点位名称字段
      popupContentFields: ['年份', 'city'], // 其他属性字段
      fieldLabels: {
        name: '镇',
        年份: '认定年份',
        city: '所属城市',
      },
      color: [119, 136, 153, 0.85], // 绿色
    },
  ],
}
