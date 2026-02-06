import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer'
import esriConfig from '@arcgis/core/config'

export const TDT_KEY = '186ce89bc6c3c1705fb6c53eb36fc4ce'
export const AMAP_KEY = 'e1a98bb1a3f621026f5a245c2cee2504'

/**
 * 核心拦截器：增加对 URL 的防御
 */
export function setupTdtInterceptors() {
  if (esriConfig?.request?.interceptors) {
    esriConfig.request.interceptors.push({
      urls: [/.*tianditu\.gov\.cn.*/],
      before: function (params) {
        // 1. 强制清理所有 Header
        params.requestOptions = {
          ...params.requestOptions,
          headers: {},
          mode: 'cors', // 尝试从 no-cors 改回 cors，配合 Image 标签使用
        }
      },
    })
  }
}

// src/configs/mapBasemap.ts

export const TdtLayer = BaseTileLayer.createSubclass({
  properties: { type: null, tk: null },

  getTileUrl(level: number, row: number, col: number) {
    const sub = Math.floor(Math.random() * 8)

    // 强制防御：检查 type 是否合法，如果不合法默认给 'vec'
    const validTypes = ['vec', 'cva', 'img', 'cia']
    const layerType = validTypes.includes(this.type) ? this.type : 'vec'

    const token = this.tk || TDT_KEY

    // 打印一下，看看最终生成的 URL 是否还有 base-tile
    const url = `https://t${sub}.tianditu.gov.cn/DataServer?T=${layerType}_w&x=${col}&y=${row}&l=${level}&tk=${token}`
    return url
  },
})
