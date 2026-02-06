import { useMapStore } from '@/store/mapStore'
import { TdtLayer, setupTdtInterceptors } from '@/configs/mapBasemap'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'

export const TDT_KEY = '186ce89bc6c3c1705fb6c53eb36fc4ce'

export function useMapInit() {
  const mapStore = useMapStore()

  /**
   * 初始化地图核心函数
   * @param container HTML 容器元素
   */
  const initMap = async (container: HTMLDivElement) => {
    // 1. 启动天地图拦截器，注入 Key 并处理 418 报错
    setupTdtInterceptors()

    // 2. 初始化天地图底图图层
    const vecLayer = new (TdtLayer as any)({ type: 'vec', tk: TDT_KEY }) // 矢量底图
    const cvaLayer = new (TdtLayer as any)({ type: 'cva', tk: TDT_KEY }) // 矢量注记

    // 3. 创建地图实例
    const map = new Map({
      layers: [vecLayer, cvaLayer],
    })

    // 4. 创建行政区划背景图层 (用于显示蓝色边界线)
    const adminLayer = new GraphicsLayer({
      id: 'admin-layer',
      listMode: 'hide',
    })
    map.add(adminLayer)

    // 5. 创建视图对象
    const view = new MapView({
      container: container,
      map: map,
      center: [108, 34], // 中国地理中心
      zoom: 4,
      ui: { components: [] }, // 隐藏 ArcGIS 默认 UI
      // 关键防御：禁用原生弹出窗口，交由自定义 SpatialPopup 处理
      popup: {
        //autoOpenEnabled: false,
        dockEnabled: false,
      },
      // 核心布局：给左侧和底部留出安全内边距，避开左下角弹窗
      padding: { left: 320, bottom: 60 },
    })

    // 6. 将实例存入 Store (Store 内部已使用 markRaw)
    mapStore.setMap(map)
    mapStore.setView(view)
    mapStore.setAdminLayer(adminLayer)

    // 7. 绑定点击事件
    view.on('click', async (event) => {
      // 命中测试
      const response = await view.hitTest(event)

      // 过滤结果：只保留业务数据点，排除行政边界层
      const results = response.results.filter((r: any) => {
        return r.graphic && r.graphic.layer && r.graphic.layer.id !== 'admin-layer'
      })

      if (results.length > 0) {
        const hit = results[0] as any
        const graphic = hit.graphic

        // 更新 Store 中的选中要素，触发 SpatialPopup 显示
        mapStore.selectedFeature = graphic.attributes

        // 自动平移：让视野对焦到该点位
        // 由于设置了 padding，点位会自动定位在地图剩余可见区域的中心
        view.goTo(
          {
            target: graphic.geometry,
            zoom: view.zoom < 8 ? 8 : view.zoom, // 如果缩放级太小，自动放大到 8 级
          },
          { duration: 600, easing: 'ease-in-out' },
        )
      } else {
        // 点击空白处，关闭弹窗
        mapStore.selectedFeature = null
        mapStore.isPolygonAnalysis = false
      }
    })

    // 8. 等待 view 加载完成并返回
    await view.when()
    return { view }
  }

  return { initMap }
}
