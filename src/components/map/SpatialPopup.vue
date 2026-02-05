<template>
  <transition name="pop">
    <div v-if="shouldShow" class="compact-popup">
      <div class="popup-header" :style="{ borderBottomColor: themeColor }">
        <div class="header-left">
          <span class="title-icon">{{ isAnalysis ? '📊' : '📍' }}</span>
          <span class="title-text">{{ panelTitle }}</span>
        </div>
        <button @click="closePanel" class="close-btn">×</button>
      </div>

      <div class="popup-content">
        <div v-if="mapStore.selectedFeature && !isAnalysis" class="content-section">
          <div v-for="(val, key) in displayAttributes" :key="key" class="data-row">
            <span class="data-label">{{ getFieldLabel(key) }}</span>
            <span class="data-value">{{ val || '-' }}</span>
          </div>
        </div>

        <div v-if="isAnalysis" class="content-section">
          <div class="stats-card">
            <p class="stats-summary">
              <strong>{{ mapStore.currentCityName || '全表' }}</strong> 范围内
              <span class="total-highlight" :style="{ color: themeColor }">{{ totalCount }}</span>
              个点位
            </p>
          </div>

          <div class="analysis-block">
            <h4 class="sub-title">当前开启专题统计</h4>
            <div class="layer-stat-container">
              <div v-for="(count, id) in activeLayerStats" :key="id" class="layer-stat-item">
                <span class="layer-dot" :style="{ background: getLayerColor(id) }"></span>
                <span class="layer-name">{{ id }}</span>
                <span class="layer-count">{{ count }}</span>
              </div>
            </div>
          </div>

          <div v-if="mapStore.provinceStats.length > 0" class="analysis-block">
            <h4 class="sub-title">分省分布排行 (滚动查看全部)</h4>
            <div class="ranking-list-rolling">
              <div
                v-for="(item, index) in sortedProvinceStats"
                :key="item.name"
                class="ranking-item"
              >
                <span class="rank-num" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
                <span class="rank-name">{{ item.name }}</span>
                <div class="rank-bar-bg">
                  <div
                    class="rank-bar-fill"
                    :style="{
                      width: getPercent(item.count) + '%',
                      backgroundColor: themeColor,
                    }"
                  ></div>
                </div>
                <span class="rank-val">{{ item.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMapStore } from '@/store/mapStore'

const mapStore = useMapStore()

/** 状态判断 **/
const isAnalysis = computed(() => mapStore.provinceStats.length > 0 && !mapStore.selectedFeature)
const shouldShow = computed(() => isAnalysis.value || !!mapStore.selectedFeature)
const panelTitle = computed(() => (isAnalysis.value ? '区域空间分析' : '详情信息'))

/** 动态过滤：只显示当前地图上勾选（visible）的图层统计 **/
const activeLayerStats = computed(() => {
  const result: Record<string, number> = {}
  mapStore.layerConfigs.forEach((cfg) => {
    if (cfg.visible && mapStore.filterResults[cfg.id] !== undefined) {
      result[cfg.id] = mapStore.filterResults[cfg.id]
    }
  })
  return result
})

/** 获取图层颜色用于联动 **/
const getLayerColor = (layerId: string) => {
  const cfg = mapStore.layerConfigs.find((l) => l.id === layerId)
  return Array.isArray(cfg?.color) ? `rgba(${cfg.color.join(',')})` : cfg?.color || '#409eff'
}

/** 分省排行逻辑 **/
const totalCount = computed(() => mapStore.provinceStats.reduce((sum, item) => sum + item.count, 0))

const sortedProvinceStats = computed(() => {
  // 实时排序，确保数据更新时顺序正确
  return [...mapStore.provinceStats].sort((a, b) => b.count - a.count)
})

const getPercent = (count: number) => {
  if (totalCount.value === 0) return 0
  const max = Math.max(...mapStore.provinceStats.map((i) => i.count))
  return (count / max) * 100
}

/** 详情标签映射 **/
const getFieldLabel = (key: string) => {
  const feature = mapStore.selectedFeature
  const layerCfg = mapStore.layerConfigs.find((l) => l.id === feature?.layerId)
  return layerCfg?.fieldLabels?.[key] || key
}

const displayAttributes = computed(() => {
  const attrs = { ...mapStore.selectedFeature }
  delete attrs.layerId
  delete attrs.geometry
  return attrs
})

/** 主题色联动 **/
const themeColor = computed(() => {
  if (mapStore.selectedFeature) {
    return getLayerColor(mapStore.selectedFeature.layerId)
  }
  return '#409eff'
})

const closePanel = () => {
  mapStore.selectedFeature = null
  mapStore.provinceStats = []
}
</script>

<style scoped>
/* 1. 位置移至右下角 */
.compact-popup {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-height: 500px; /* 限制高度，触发滚动 */
  z-index: 1000;
}

.popup-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eee;
}

.popup-content {
  padding: 16px;
  overflow: hidden; /* 防止外层溢出 */
  display: flex;
  flex-direction: column;
}

/* 2. Rolling 滚动效果实现 */
.ranking-list-rolling {
  max-height: 220px; /* 固定统计列表高度 */
  overflow-y: auto;
  padding-right: 8px;
  margin-top: 10px;
}

/* 自定义滚动条样式，使其更精致 */
.ranking-list-rolling::-webkit-scrollbar {
  width: 4px;
}
.ranking-list-rolling::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 10px;
}

.layer-stat-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-stat-item {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.layer-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #f0f2f5;
}

.ranking-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
}

.rank-bar-bg {
  flex: 1;
  height: 6px;
  background: #f0f2f5;
  margin: 0 8px;
  border-radius: 3px;
}

.rank-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.rank-num {
  width: 20px;
  font-weight: bold;
  color: #999;
}
.top-three {
  color: #f56c6c;
}
.rank-name {
  width: 45px;
}
.rank-val {
  width: 25px;
  text-align: right;
  font-weight: 600;
}

/* 动画：从右下角弹出 */
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
