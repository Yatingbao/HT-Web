<template>
  <div class="layer-panel">
    <div class="panel-header">
      <h4>图层列表</h4>
      <span class="total-badge">共 {{ totalCount }} 项</span>
    </div>
    <div class="layer-list">
      <div v-for="cfg in layers" :key="cfg.id" class="layer-item">
        <div class="layer-info">
          <input type="checkbox" v-model="cfg.visible" @change="toggleLayer(cfg)" />
          <span :style="{ color: `rgb(${cfg.color?.join(',')})` }">●</span>
          <label>{{ cfg.title }}</label>
        </div>
        <span class="count-tag">{{ mapStore.filterResults?.[cfg.id] || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMapStore } from '@/store/mapStore'
import _ from 'lodash'

const props = defineProps<{ layers: any[] }>()
const mapStore = useMapStore()

// 核心防御点
const totalCount = computed(() => {
  if (!mapStore.filterResults) return 0
  return _.sum(Object.values(mapStore.filterResults))
})

const toggleLayer = (cfg: any) => {
  const layer = mapStore.pointLayers[cfg.id]
  if (layer) layer.visible = cfg.visible
}
</script>

<style scoped>
/* 这里复用原代码中 .layer-panel 相关的 150 行 CSS */
.layer-panel {
  position: absolute;
  top: 15px;
  left: 20px;
  z-index: 15;
  width: 280px;
  max-height: calc(100% - 40px);
  background: rgba(255, 255, 255, 0.96);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}
.analysis-section {
  background: #f0f7ff;
  padding: 12px 15px;
  border-radius: 8px 8px 0 0;
}
.year-label {
  font-size: 12px;
  color: #409eff;
  font-weight: bold;
  margin-bottom: 8px;
}
.res-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 12px;
}
.res-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
}
.res-total {
  border-top: 1px solid #d0e5ff;
  margin-top: 8px;
  padding-top: 8px;
  text-align: right;
  font-weight: bold;
  color: #409eff;
}
.layer-list-scroll {
  overflow-y: auto;
  padding: 0 15px 15px;
  flex: 1;
}
.layer-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 10px;
}
.color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.bulk-ops {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}
.group-header {
  font-size: 12px;
  color: #909399;
  margin: 15px 15px 8px;
  border-bottom: 1px solid #ebeef5;
}
</style>
