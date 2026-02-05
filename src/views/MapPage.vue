<template>
  <div class="map-view">
    <MapViewer @map-ready="onMapReady" />

    <template v-if="isInitialized && currentConfig">
      <SearchBar />
      <CitySelector />

      <LayerPanel :layers="currentConfig.layers" />

      <SpatialPopup />
    </template>

    <div v-if="!isInitialized" class="loading-overlay">
      <div class="loader"></div>
      <span>正在构建专题地图...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMapStore } from '@/store/mapStore'
import { useLayers } from '@/composables/useLayers'
import { mapRegistry } from '@/configs/mapRegistry'

// 组件导入...
import MapViewer from '@/components/map/MapViewer.vue'
import SearchBar from '@/components/map/SearchBar.vue'
import LayerPanel from '@/components/map/LayerPanel.vue'
import CitySelector from '@/components/map/CitySelector.vue'
import SpatialPopup from '@/components/map/SpatialPopup.vue'

const route = useRoute()
const mapStore = useMapStore()
const { loadBusinessLayers, applySearch } = useLayers()

const isInitialized = ref(false)
const currentConfig = ref<any>(null)

/**
 * 核心逻辑：根据路由参数加载专题配置
 */
const initThemeMap = async () => {
  const mapId = route.params.mapId as string
  const config = mapRegistry[mapId]

  if (config) {
    isInitialized.value = false
    currentConfig.value = config

    // 【关键一步】同步到 Store，这样 LayerPanel 里的 computed 才能拿到数据
    mapStore.layerConfigs = config.layers

    mapStore.clearScreen()
    await loadBusinessLayers(config.layers)
    applySearch('')
    isInitialized.value = true
  }
}

// 当路由参数变化时（如点击导航栏的不同专题），重新加载数据
watch(
  () => route.params.mapId,
  () => {
    if (route.name === 'Map') {
      // 确保在地图路由下才触发
      initThemeMap()
    }
  },
)

const onMapReady = () => {
  initThemeMap()
}

onUnmounted(() => {
  mapStore.clearScreen()
})
</script>

<style scoped>
.map-view {
  position: relative;
  width: 100%;
  height: 100%; /* 继承 App.vue 的 flex:1 */
  background-color: #f0f2f5;
  overflow: hidden;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
}

/* 简单的 loading 动画 */
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
