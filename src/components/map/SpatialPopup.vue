<template>
  <transition name="pop">
    <div v-if="shouldShow" class="compact-popup">
      <div class="popup-header">
        <div class="header-left">
          <span class="title-icon">{{ isAnalysis ? '📊' : '📍' }}</span>
          <span class="title-text">{{ panelTitle }}</span>
        </div>
        <button @click="closePanel" class="close-btn">×</button>
      </div>

      <div class="popup-content">
        <div v-if="mapStore.selectedFeature && !isAnalysis" class="content-section">
          <div v-for="(val, key) in mapStore.selectedFeature" :key="key" class="data-row">
            <span class="data-label">{{ key }}</span>
            <span class="data-value">{{ val || '-' }}</span>
          </div>
        </div>

        <div v-if="isAnalysis" class="content-section">
          <div class="stats-card">
            <p class="stats-summary">
              <strong>{{ mapStore.currentCityName }}</strong> 范围内共筛选出
              <span class="total-highlight">{{ totalCount }}</span> 个点位
            </p>
          </div>

          <div class="analysis-block">
            <h4 class="sub-title">专题分布</h4>
            <div v-for="(count, id) in mapStore.filterResults" :key="id" class="layer-stat-item">
              <span class="layer-name">{{ id }}</span>
              <span class="layer-count">{{ count }}</span>
            </div>
          </div>

          <div v-if="mapStore.provinceStats.length > 0" class="analysis-block">
            <h4 class="sub-title">分省分布排名</h4>
            <div class="ranking-list">
              <div
                v-for="(item, index) in mapStore.provinceStats"
                :key="item.name"
                class="ranking-item"
              >
                <span class="rank-num" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
                <span class="rank-name">{{ item.name }}</span>
                <div class="rank-bar-bg">
                  <div class="rank-bar-fill" :style="{ width: getPercent(item.count) + '%' }"></div>
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

const shouldShow = computed(() => mapStore.selectedFeature || mapStore.isPolygonAnalysis)
const isAnalysis = computed(() => mapStore.isPolygonAnalysis)
const panelTitle = computed(() => (isAnalysis.value ? '区域统计分析' : '要素详细信息'))

const totalCount = computed(() => {
  return Object.values(mapStore.filterResults).reduce((a, b) => a + b, 0)
})

const maxProvinceCount = computed(() => {
  return mapStore.provinceStats.length > 0 ? mapStore.provinceStats[0].count : 1
})

const getPercent = (count: number) => (count / maxProvinceCount.value) * 100

const closePanel = () => {
  mapStore.selectedFeature = null
  mapStore.isPolygonAnalysis = false
  // 如果需要，也可以清空行政区边界
  if (mapStore.adminLayer) mapStore.adminLayer.removeAll()
}
</script>
<style scoped>
/* 关键修正：类名改为 .compact-popup */
.compact-popup {
  position: absolute;
  bottom: 40px;
  left: 20px;
  width: 320px;
  /* 这里的 45vh 很关键，配合 flex 布局实现内部滚动 */
  max-height: 45vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.popup-header {
  flex-shrink: 0;
  background: #f8f9fa;
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-text {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.popup-content {
  flex: 1;
  padding: 15px;
  /* 核心：确保 y 轴溢出滚动 */
  overflow-y: auto;
  font-size: 13px;
  line-height: 1.6;
}

.data-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #f0f0f0;
}

.data-label {
  color: #888;
  flex-shrink: 0;
}

.data-value {
  color: #333;
  font-weight: 500;
  text-align: right;
  word-break: break-all; /* 防止长文本撑开宽度 */
  margin-left: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.close-btn:hover {
  color: #f56c6c;
}

/* 滚动条美化 */
.popup-content::-webkit-scrollbar {
  width: 5px;
}
.popup-content::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 10px;
}

/* 动画效果 */
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
