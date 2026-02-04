import type { MapConfig } from '@/types/gis'

export const agriMapConfig: MapConfig = {
  mapTitle: '全国乡村荣誉称号分布',
  layers: [
    {
      id: 'rural_demo_county',
      title: '国家乡村振兴示范县',
      // 这里的路径确保在 public 文件夹下能访问到
      geojsonUrl: './Rural Revitalization/国家乡村振兴示范县.geojson',
      visible: true,
      searchFields: ['村庄', '年份', 'province', 'city'],
      popupTitleField: '村庄',
      popupContentFields: ['年份', 'city'],
      fieldLabels: {
        年份: '认定年份',
        city: '所属城市',
      },
      color: [50, 120, 200, 0.85],
    },
  ],
}
