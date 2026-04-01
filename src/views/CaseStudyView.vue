<template>
  <div class="case-study-container">
    <div ref="mapContainer" class="full-map-container"></div>

    <div class="status-tip" :class="{ 'in-focus': caseStore.viewMode === 'focus' }">
      <div v-if="caseStore.viewMode === 'globe'" class="guide-text">
        <span class="pulse-icon">🌐</span> 全球乡村案例概览 (双击点位进入 3D 详情)
      </div>
      <button v-else @click="resetToGlobe" class="back-btn">
        <span class="icon">↩</span> 返回地球视角
      </button>
    </div>

    <transition name="slide-card">
      <div v-if="caseStore.activeCase && caseStore.viewMode === 'focus'" class="case-detail-card">
        <div class="card-header">
          <div class="title-row">
            <h3>{{ caseStore.activeCase.name }}</h3>
            <span class="type-badge">{{ caseStore.activeCase.type }}</span>
          </div>
          <div class="honor-banner">{{ caseStore.activeCase.title }}</div>
        </div>

        <div class="card-body">
          <div class="data-grid">
            <div class="data-item">
              <label>发展阶段</label>
              <span>{{ caseStore.activeCase.period }}</span>
            </div>
          </div>

          <div class="tags">
            <span v-for="tag in caseStore.activeCase.tags" :key="tag" class="tag-item"
              >#{{ tag }}</span
            >
          </div>

          <p class="description">{{ caseStore.activeCase.description }}</p>

          <div class="footer-actions">
            <button class="primary-btn">查看完整调研报告</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import { useCaseStore } from '@/store/useCaseStore'
import { useMapStore } from '@/store/mapStore'

// ArcGIS 核心
import Map from '@arcgis/core/Map'
import SceneView from '@arcgis/core/views/SceneView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point'
import { TdtLayer } from '@/configs/mapBasemap' // 引用你已有的天地图配置

const mapContainer = ref<HTMLDivElement | null>(null)
const caseStore = useCaseStore()
const mapStore = useMapStore()

let view: SceneView
let caseLayer: GraphicsLayer

// 1. 初始化独立 3D 视图
const initCaseMap = async () => {
  if (!mapContainer.value) return

  // 创建地图并配置地形
  const map = new Map({
    ground: 'world-elevation',
  })

  // 强制加载高清影像底图 (实现你喜欢的卫星图效果)
  const imgLayer = new TdtLayer({ type: 'img', tk: '186ce89bc6c3c1705fb6c53eb36fc4ce' })
  const ciaLayer = new TdtLayer({ type: 'cia', tk: '186ce89bc6c3c1705fb6c53eb36fc4ce' })
  map.addMany([imgLayer, ciaLayer])

  // 实例化 SceneView (3D 引擎)
  view = new SceneView({
    container: mapContainer.value,
    map: map,
    camera: {
      position: { x: 105, y: 30, z: 12000000 }, // 初始高空视角
      tilt: 0,
      heading: 0,
    },
    environment: {
      atmosphere: { quality: 'high' }, // 开启大气层效果
      starsEnabled: true, // 开启星空背景
    },
    ui: { components: [] }, // 隐藏默认的缩放等 UI
  })

  // 存入 Store 以便其他地方调用
  mapStore.setView(view)
  mapStore.setMap(map)

  // 添加案例点图层
  caseLayer = new GraphicsLayer()
  map.add(caseLayer)

  renderCasePoints()
  setupInteraction()
}

// 2. 渲染点位 (带发光效果的 3D 符号)
const renderCasePoints = () => {
  caseStore.cases.forEach((item) => {
    const graphic = new Graphic({
      geometry: new Point({ longitude: item.coords[0], latitude: item.coords[1] }),
      attributes: { id: item.id },
      symbol: {
        type: 'point-3d',
        symbolLayers: [
          {
            type: 'icon',
            size: 22,
            resource: { primitive: 'circle' },
            material: { color: [255, 165, 0, 0.9] }, // 橙色发光感
            outline: { color: [255, 255, 255], size: 2 },
          },
        ],
      },
    })
    caseLayer.add(graphic)
  })
}

// 3. 交互逻辑：双击进入 3D 倾斜视角
const setupInteraction = () => {
  view.on('double-click', (event) => {
    event.stopPropagation()
    view.hitTest(event).then((response) => {
      const results = response.results.filter(
        (r) => r.type === 'graphic' && r.graphic.layer === caseLayer,
      )
      if (results.length > 0) {
        const id = results[0].graphic.attributes.id
        flyToTarget(id)
      }
    })
  })
}

const flyToTarget = async (id: string) => {
  const target = caseStore.cases.find((c) => c.id === id)
  if (!target) return

  caseStore.activeCase = target
  caseStore.viewMode = 'focus'

  // 执行 3D 俯冲动作
  await view.goTo(
    {
      target: [target.coords[0], target.coords[1]],
      zoom: 16,
      tilt: 70, // 70度倾斜，展示地形和村落层次
      heading: 35, // 略微旋转，增加空间感
    },
    {
      duration: 3000,
      easing: 'ease-in-out',
    },
  )
}

const resetToGlobe = () => {
  caseStore.viewMode = 'globe'
  caseStore.activeCase = null
  view.goTo(
    {
      center: [105, 30],
      zoom: 3,
      tilt: 0,
      heading: 0,
    },
    { duration: 2500 },
  )
}

onMounted(() => {
  initCaseMap()
})

onUnmounted(() => {
  if (view) view.destroy()
})
</script>

<style scoped>
.case-study-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000; /* 3D 加载前的黑底符合星空感 */
}

.full-map-container {
  width: 100%;
  height: 100%;
}

/* 状态提示 */
.status-tip {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 10;
}

.guide-text {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
}

.back-btn {
  background: #409eff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
  font-weight: bold;
}

/* 3D 详情卡片 - 采用规划研究风格的精细设计 */
.case-detail-card {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 380px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  padding: 24px;
  border: 1px solid #fff;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.title-row h3 {
  margin: 0;
  font-size: 20px;
  color: #2c3e50;
  font-family: 'Songti SC', serif; /* 规划报告常用的宋体感 */
}

.type-badge {
  font-size: 11px;
  background: #f0f7ff;
  color: #409eff;
  padding: 2px 8px;
  border-radius: 4px;
}

.honor-banner {
  font-size: 13px;
  color: #e6a23c;
  background: #fdf6ec;
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-weight: 500;
}

.data-item label {
  display: block;
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}

.data-item span {
  font-size: 15px;
  color: #303133;
  font-weight: bold;
}

.tags {
  margin: 15px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-item {
  font-size: 12px;
  color: #67c23a;
  background: #f0f9eb;
  padding: 2px 8px;
  border-radius: 4px;
}

.description {
  font-size: 14px;
  line-height: 1.7;
  color: #606266;
  margin: 20px 0;
  text-align: justify;
}

.primary-btn {
  width: 100%;
  padding: 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

/* 动画效果 */
.slide-card-enter-active,
.slide-card-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-card-enter-from,
.slide-card-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
