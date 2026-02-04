import axios from 'axios'

/**
 * 高德地图 API 配置
 * 注意：在生产环境中建议通过环境变量管理 Key
 */
export const AMAP_KEY = 'e1a98bb1a3f621026f5a245c2cee2504'

const amapInstance = axios.create({
  baseURL: 'https://restapi.amap.com/v3/config/district',
  timeout: 10000,
})

/**
 * 1. 获取行政区划边界数据 (用于地图绘制蓝色遮罩/边框)
 * @param keywords 城市或省份名称 (例如：'浙江省' 或 '杭州市')
 */
export const getDistrictData = (keywords: string) => {
  return amapInstance.get('', {
    params: {
      key: AMAP_KEY,
      keywords: keywords,
      subdistrict: 0, // 0表示不返回下级行政区
      extensions: 'all', // base:不返回边界坐标点；all:返回边界坐标点
      output: 'json',
    },
  })
}

/**
 * 2. 获取行政区划级联列表 (用于 CitySelector 组件展示全国省市)
 * @param subdistrict 级联深度：1-仅省份，2-省市两级
 */
export const getDistrictList = (subdistrict: number = 2) => {
  return amapInstance.get('', {
    params: {
      key: AMAP_KEY,
      keywords: '中国',
      subdistrict: subdistrict,
      extensions: 'base', // 列表展示不需要坐标点，用 base 速度更快
      output: 'json',
    },
  })
}

/**
 * 3. 逆地理编码 (可选：如果以后需要点击地图获取地址名)
 */
export const getAddressByCoords = (longitude: number, latitude: number) => {
  return axios.get('https://restapi.amap.com/v3/geocode/regeo', {
    params: {
      key: AMAP_KEY,
      location: `${longitude},${latitude}`,
      output: 'json',
    },
  })
}
