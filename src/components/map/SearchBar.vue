<template>
  <div class="nav-container">
    <div class="search-box">
      <div class="search-wrapper">
        <input
          v-model="mapStore.searchKey"
          placeholder="搜索 名称 / 年份 / 备注"
          @input="handleSearch"
        />
        <button class="analysis-btn" @click="handleSearch">分析</button>
      </div>
    </div>

    <div class="map-tools">
      <span
        class="map-tool-item active-city"
        @click="mapStore.showCityPanel = !mapStore.showCityPanel"
      >
        📍 {{ mapStore.currentCityName }}
      </span>
      <span class="map-tool-item" @click="runSpatialQuery">空间分析</span>
      <span class="map-tool-item" @click="runAttributeStats">分省统计</span>
      <span class="map-tool-item" @click="mapStore.clearScreen">清屏</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from '@/store/mapStore'
import { useSearch } from '@/composables/useSearch'
import { useAdminBoundary } from '@/composables/useAdminBoundary'

const mapStore = useMapStore()
const { applySearch } = useSearch()
const { runSpatialQuery, runAttributeStats } = useAdminBoundary()

// 输入时实时触发搜索过滤
const handleSearch = () => {
  applySearch(mapStore.searchKey)
}
</script>

<style scoped>
/* 这里的样式直接复用你原始代码中的 .nav-container 到 .map-tool-item 部分 */
.nav-container {
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 20;
  pointer-events: none; /* 穿透容器，使下方地图可点击 */
}
.nav-container > * {
  pointer-events: auto; /* 恢复子元素的点击 */
}
.search-wrapper {
  display: flex;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  padding: 2px;
  border: 1px solid #ddd;
}
.search-wrapper input {
  border: none;
  outline: none;
  padding: 8px 14px;
  width: 240px;
  font-size: 13px;
  border-radius: 18px;
}
.analysis-btn {
  background: #409eff;
  color: #fff;
  border: none;
  padding: 0 16px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  margin: 2px;
  transition: background 0.3s;
}
.map-tools {
  position: absolute;
  right: 20px;
  display: flex;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.map-tool-item {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 13px;
  border-right: 1px solid #eee;
  color: #555;
}
.active-city {
  font-weight: bold;
  color: #409eff;
  background: #f0f7ff;
}
</style>
