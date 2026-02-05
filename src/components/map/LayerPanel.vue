<template>
  <div class="layer-panel">
    <div class="analysis-section">
      <div class="section-header" @click="isStatsCollapsed = !isStatsCollapsed">
        <span class="title-icon">📊</span>
        <span class="year-label">当前检索统计</span>
        <span class="fold-icon" :class="{ rotated: isStatsCollapsed }">▼</span>
      </div>

      <transition name="collapse">
        <div v-show="!isStatsCollapsed" class="filter-res">
          <div v-for="stat in currentFilterStats" :key="stat.id" class="res-item">
            <span class="res-dot" :style="{ background: stat.color }"></span>
            <span class="res-text">{{ stat.title }}</span>
            <span class="res-count">{{ stat.count }}</span>
          </div>

          <div class="res-total">
            <span class="total-label">全表总计</span>
            <span class="total-val">{{ totalFilteredCount }}</span>
          </div>
        </div>
      </transition>
    </div>

    <div class="control-area">
      <div class="section-header" @click="isLayerCollapsed = !isLayerCollapsed">
        <span class="title-icon">🗺️</span>
        <span class="year-label">所有图层</span>
        <span class="fold-icon" :class="{ rotated: isLayerCollapsed }">▼</span>
      </div>

      <transition name="collapse">
        <div v-show="!isLayerCollapsed" class="control-body">
          <div class="group-header-row">
            <h4 class="group-header">地图控制</h4>
          </div>
          <div class="layer-item admin-layer">
            <label class="layer-label">
              <input type="checkbox" v-model="adminVisible" @change="toggleAdmin" />
              <span class="color-indicator boundary-indicator"></span>
              <span class="label-text">行政区划边界</span>
            </label>
          </div>

          <div class="group-header-row split-line">
            <h4 class="group-header">专题图层</h4>
            <div class="bulk-ops">
              <span @click.stop="setAllLayers(true)">全选</span>
              <span class="divider">/</span>
              <span @click.stop="setAllLayers(false)">清空</span>
            </div>
          </div>

          <div class="layer-list-scroll">
            <div v-for="cfg in layerConfigs" :key="cfg.id" class="layer-item">
              <label class="layer-label">
                <input type="checkbox" v-model="cfg.visible" @change="onLayerToggle" />
                <span
                  class="color-indicator"
                  :style="{
                    backgroundColor: Array.isArray(cfg.color)
                      ? `rgba(${cfg.color.join(',')})`
                      : cfg.color,
                  }"
                ></span>
                <span class="label-text">{{ cfg.title }}</span>
              </label>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMapStore } from '@/store/mapStore'
import { useLayers } from '@/composables/useLayers'

const mapStore = useMapStore()
const { applySearch } = useLayers()

const adminVisible = ref(true)

// --- 新增折叠状态变量 ---
const isStatsCollapsed = ref(false) // 控制统计板块
const isLayerCollapsed = ref(false) // 控制图层列表板块

// 直接映射 Store 中的数据，确保实时联动
const layerConfigs = computed(() => {
  const configs = mapStore.layerConfigs
  // 如果存储的是整个对象，就取其中的 layers 数组；如果是数组，就直接用
  return Array.isArray(configs) ? configs : configs?.layers || []
})

// 统计逻辑：只计算当前开启了 visible 的图层
const currentFilterStats = computed(() => {
  return layerConfigs.value
    .filter((c) => c.visible)
    .map((c) => {
      // 这里的颜色处理逻辑要和模板保持一致
      const colorStr = Array.isArray(c.color) ? `rgba(${c.color.join(',')})` : c.color || '#409eff'

      return {
        id: c.id,
        title: c.title,
        count: mapStore.filterResults[c.id] || 0,
        color: colorStr,
      }
    })
})

// 核心：聚合所有可见图层的省份数据
const updateProvinceStats = () => {
  const aggregate: Record<string, number> = {}

  layerConfigs.value.forEach((cfg) => {
    if (cfg.visible) {
      // 从 store 中获取该图层预存的省份数据
      const layerData = mapStore.layerProvinceMap[cfg.id] || {}
      Object.keys(layerData).forEach((prov) => {
        aggregate[prov] = (aggregate[prov] || 0) + layerData[prov]
      })
    }
  })

  // 将对象转回数组，赋给 store 供 SpatialPopup 使用
  mapStore.provinceStats = Object.entries(aggregate)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

const totalFilteredCount = computed(() => {
  return Object.values(mapStore.filterResults).reduce((sum, val) => sum + val, 0)
})

// 交互
// LayerPanel.vue
const onLayerToggle = () => {
  // 获取当前搜索框的值（如果有）
  const searchInput = document.querySelector('.search-input') as HTMLInputElement
  const currentQuery = searchInput ? searchInput.value : ''

  // 重新执行统计逻辑
  applySearch(currentQuery)
}

const toggleAdmin = () => {
  if (mapStore.adminLayer) mapStore.adminLayer.visible = adminVisible.value
}

const setAllLayers = (status: boolean) => {
  layerConfigs.value.forEach((cfg) => (cfg.visible = status))
  // 联动全局检索逻辑
  const searchInput = document.querySelector('input') // 获取搜索框内容（更优雅的做法是从 store 获取 searchQuery）
  applySearch(searchInput?.value || '')
}
</script>

<style scoped>
.layer-panel {
  position: absolute;
  top: 20px; /* 避开顶部导航 */
  left: 20px;
  width: 260px;
  max-height: calc(100vh - 120px);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 新增：头部点击区域样式 */
.section-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
  background: rgba(64, 158, 255, 0.03); /* 给标题栏一点浅色背景 */
}

.section-header:hover {
  background: rgba(64, 158, 255, 0.08);
}

/* 新增：旋转箭头图标 */
.fold-icon {
  margin-left: auto; /* 靠右对齐 */
  font-size: 10px;
  color: #909399;
  transition: transform 0.3s ease;
}

.fold-icon.rotated {
  transform: rotate(-90deg); /* 折叠时旋转90度 */
}

/* 新增：折叠过渡动画 */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 800px; /* 设置一个足够大的高度确保展开流畅 */
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

/* 结构微调：确保折叠时内容有内边距 */
.filter-res,
.control-body {
  padding: 0 16px 16px;
}

/* 移除原有的 analysis-section 内部 padding，因为现在由 header 和 body 分摊了 */
.analysis-section {
  padding: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.year-label {
  font-size: 13px;
  font-weight: 600;
  color: #409eff;
}

.res-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.res-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 8px;
}

.res-text {
  flex: 1;
  color: #606266;
}

.res-count {
  font-weight: 700;
  color: #303133;
  background: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  min-width: 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.res-total {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 12px;
  color: #909399;
}
.total-val {
  font-size: 18px;
  font-weight: 800;
  color: #409eff;
}
/* 控制列表区 */
.control-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.group-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 6px;
}

.group-header {
  font-size: 11px;
  color: #aeb9c4;
  text-transform: uppercase;
}

.bulk-ops {
  font-size: 11px;
  color: #409eff;
  cursor: pointer;
}

.layer-list-scroll {
  overflow-y: auto;
  padding: 0 10px 15px;
}

.layer-item {
  padding: 8px 10px;
  border-radius: 8px;
  transition: all 0.2s;
}

.layer-item:hover {
  background: rgba(0, 0, 0, 0.02);
}
.item-inactive {
  opacity: 0.6;
  filter: grayscale(0.5);
}

.layer-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
}

.color-indicator {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  margin: 0 10px;
}

.boundary-indicator {
  border: 1.5px solid #409eff;
  background: transparent !important;
}

.layer-list-scroll::-webkit-scrollbar {
  width: 3px;
}
.layer-list-scroll::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}
</style>
