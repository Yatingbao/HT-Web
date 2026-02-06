<template>
  <transition name="pop">
    <div v-if="shouldShow" class="compact-popup">
      <div class="popup-header" :style="{ borderBottomColor: themeColor }">
        <div class="header-left">
          <span class="title-icon">{{ isAnalysis ? '📊' : '📍' }}</span>
          <span class="title-text">
            {{ mapStore.isPolygonAnalysis ? '区域空间分析' : '全国分布统计' }}
          </span>
        </div>
        <button @click="closePanel" class="close-btn">×</button>
      </div>

      <div class="popup-content">
        <div v-if="mapStore.selectedFeature && !isAnalysis" class="content-section">
          <div v-for="(val, key) in displayAttributes" :key="key" class="data-row">
            <span class="data-label">{{ getFieldLabel(String(key)) }}</span>
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

          <div v-if="mapStore.isPolygonAnalysis" class="analysis-block">
            <h4 class="sub-title">当前专题分布</h4>
            <div class="layer-stat-container">
              <div v-for="(count, id) in activeLayerStats" :key="id" class="layer-stat-item">
                <!-- <span class="layer-dot" :style="{ background: getLayerColor(id) }"></span>
                <span class="layer-name">{{ id }}</span> -->
                <div class="layer-info">
                  <span
                    class="layer-tag-bar"
                    :style="{ backgroundColor: getLayerColor(id) }"
                  ></span>
                  <span class="layer-name">{{ id }}</span>
                </div>
                <span class="layer-count">{{ count }}</span>
              </div>
            </div>
          </div>

          <div
            v-if="mapStore.provinceStats.length > 0 && !mapStore.isPolygonAnalysis"
            class="analysis-block"
          >
            <h4 class="sub-title">
              分省分布排行
              <span class="hint">(点击省份跳转)</span>
            </h4>
            <div class="ranking-list-rolling">
              <div
                v-for="(item, index) in sortedProvinceStats"
                :key="item.name"
                class="ranking-item clickable"
                @click="handleProvinceClick(item.name)"
              >
                <span class="rank-num" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
                <span class="rank-name">{{ item.name }}</span>
                <div class="rank-bar-bg">
                  <div
                    class="rank-bar-fill"
                    :style="{ width: getPercent(item.count) + '%', backgroundColor: themeColor }"
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
import { useAdminBoundary } from '@/composables/useAdminBoundary'

const mapStore = useMapStore()
const { drawBoundary } = useAdminBoundary()

// 点击排行列表项，自动跳转至该省
const handleProvinceClick = (provinceName: string) => {
  drawBoundary(provinceName, true)
}

const isAnalysis = computed(
  () => mapStore.isAnalysisActive && mapStore.provinceStats.length > 0 && !mapStore.selectedFeature,
)
const shouldShow = computed(
  () =>
    !!mapStore.selectedFeature || (mapStore.isAnalysisActive && mapStore.provinceStats.length > 0),
)

const closePanel = () => {
  mapStore.selectedFeature = null
  mapStore.isAnalysisActive = false
  mapStore.isPolygonAnalysis = false
  mapStore.adminLayer?.removeAll() // 关闭弹窗时建议也清理掉地图上的边界线
}

/** 辅助计算逻辑 **/
const totalCount = computed(() => mapStore.provinceStats.reduce((sum, item) => sum + item.count, 0))
const sortedProvinceStats = computed(() =>
  [...mapStore.provinceStats].sort((a, b) => b.count - a.count),
)
const getPercent = (count: number) => {
  const max = Math.max(...mapStore.provinceStats.map((i) => i.count), 1)
  return (count / max) * 100
}
const activeLayerStats = computed(() => {
  const result: Record<string, number> = {}
  mapStore.layerConfigs.forEach((cfg) => {
    if (cfg.visible && mapStore.filterResults[cfg.id] !== undefined)
      result[cfg.id] = mapStore.filterResults[cfg.id]!
  })
  return result
})
const getLayerColor = (id: string) => {
  const cfg = mapStore.layerConfigs.find((l) => l.id === id)
  return Array.isArray(cfg?.color) ? `rgba(${cfg.color.join(',')})` : cfg?.color || '#409eff'
}
const themeColor = computed(() =>
  mapStore.selectedFeature ? getLayerColor(mapStore.selectedFeature.layerId) : '#409eff',
)
const getFieldLabel = (key: string) => {
  const layerCfg = mapStore.layerConfigs.find((l) => l.id === mapStore.selectedFeature?.layerId)
  return layerCfg?.fieldLabels?.[key] || key
}
const displayAttributes = computed(() => {
  const { layerId, geometry, ...attrs } = mapStore.selectedFeature || {}
  return attrs
})
</script>

<style scoped>
/* 1. 整体容器：引入玻璃拟态与平滑阴影 */
.compact-popup {
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: 320px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* 数字与英文优先使用现代字体 */
  font-family: 'Inter', 'Roboto', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px; /* 限制整个弹窗的最大高度 */
}
.sub-title {
  font-size: 14px;
  color: #718096;
  margin-bottom: 12px;
  padding-left: 10px; /* 调整标题整体向右缩进的距离 */
  font-weight: 600;
  display: flex;
  align-items: center;
}

.hint {
  font-size: 11px;
  color: #a0aec0;
  margin-left: 8px; /* 提示文字“点击跳转”与标题的间距 */
  font-weight: normal;
}

/* 2. 头部：加深专业感 */
.popup-header {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid #f0f2f5;
}

.title-text {
  font-weight: 700;
  font-size: 15px;
  color: #1a1a1a;
  letter-spacing: 0.5px;
}

/* 3. 数据卡片：强化总数对比 */
.stats-card {
  background: linear-gradient(135deg, #f8faff 0%, #f1f4f9 100%);
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #eef2f7;
}

.total-highlight {
  font-family: 'DIN Alternate', 'Inter', sans-serif; /* 专业的数字字体 */
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0 4px;
}

/* 4. 排名列表：增加序号点、名称间距与缩进 */
.ranking-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  margin-bottom: 6px;
  border-radius: 8px;
}

/* 排名数字加点逻辑 */
.rank-num {
  width: 28px;
  font-weight: 700;
  color: #a0aec0;
  font-size: 13px;
}
.rank-num::after {
  content: '.'; /* 自动添加点号 */
}

.rank-name {
  width: 70px; /* 拓宽名称空间 */
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  margin-right: 8px;
}

/* 数量值：设置向右缩进与对比色 */
.rank-val {
  min-width: 45px;
  text-align: right;
  font-family: 'JetBrains Mono', monospace; /* 等宽字体让数字对齐更整齐 */
  font-weight: 600;
  color: #2d3748;
  padding-left: 10px; /* 数量缩进 */
}

/* 5. 进度条美化 */
.rank-bar-bg {
  flex: 1;
  height: 6px;
  background: #edf2f7;
  border-radius: 10px;
  overflow: hidden;
}

.rank-bar-fill {
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 6. 详情模式美化 (Data Row) */
.data-row {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px dashed #e2e8f0;
}
.data-label {
  color: #718096;
  width: 80px;
  font-size: 13px;
}
.data-value {
  flex: 1;
  color: #2d3748;
  font-weight: 500;
  text-align: right;
  word-break: break-all;
}
.layer-stat-container {
  display: flex;
  flex-direction: column;
  gap: 4px; /* 紧凑排列 */
  margin-top: 10px;
}
.layer-stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border: 1px solid #edf2f7;
  border-radius: 10px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.layer-stat-item:last-child {
  border-bottom: none;
}

.layer-stat-item:hover {
  background: rgba(0, 0, 0, 0.02);
}

/* 垂直色条：宽度微调，使其更显眼 */
.layer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.layer-tag-bar {
  width: 4px;
  height: 14px;
  border-radius: 2px;
  flex-shrink: 0; /* 防止被挤压 */
}

.layer-name {
  font-size: 13px;
  color: #334155;
  font-weight: 500;
}

/* 数字样式：回归最开始的深色专业样式 */
.layer-count {
  font-family: 'JetBrains Mono', 'Inter', monospace; /* 数字使用等宽字体 */
  font-weight: 700;
  font-size: 14px;
  color: #1e293b; /* 回归深色 */
  min-width: 45px; /* 关键：固定最小宽度确保缩进对齐 */
  text-align: right;
  padding-left: 8px; /* 缩进感 */
}
/* 滚动容器的核心配置 */
.ranking-list-rolling {
  max-height: 200px; /* 必须：设置一个固定高度，超过此高度才会出现滚动条 */
  overflow-y: auto; /* 必须：垂直方向溢出时自动显示滚动条 */
  overflow-x: hidden; /* 建议：隐藏水平滚动条，防止抖动 */
  padding-right: 5px; /* 建议：给右侧留点空间，避免滚动条遮挡文字 */
  margin-top: 10px;
}

/* 你代码中已有的滚动条样式美化（保持即可） */
.ranking-list-rolling::-webkit-scrollbar {
  width: 5px;
}
.ranking-list-rolling::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 10px;
}
.ranking-list-rolling::-webkit-scrollbar-track {
  background: transparent;
}
</style>
