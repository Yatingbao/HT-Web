<template>
  <transition name="fade">
    <div v-if="mapStore.showCityPanel" class="city-panel">
      <div class="city-panel-header">
        <span>当前选择：{{ mapStore.currentCityName }}</span>
        <span class="close-panel" @click="mapStore.showCityPanel = false">×</span>
      </div>

      <div class="city-panel-content">
        <div v-for="province in sortedAdminData" :key="province.adcode" class="province-item">
          <span class="province-name" @click="handleSelect(province.name, true)">
            {{ province.name }}
          </span>
          <div class="city-list">
            <div
              v-for="city in province.districts"
              :key="city.adcode"
              class="city-item"
              @click="handleSelect(city.name, false)"
            >
              {{ city.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useMapStore } from '@/store/mapStore'
import { useAdminBoundary } from '@/composables/useAdminBoundary'
import axios from 'axios'
import _ from 'lodash'

// ... 原有的 import

const mapStore = useMapStore()
const { drawBoundary, runSpatialQuery } = useAdminBoundary()

const AMAP_KEY = 'e1a98bb1a3f621026f5a245c2cee2504'
const fullAdminData = ref<any[]>([])

const sortedAdminData = computed(() =>
  _.sortBy(fullAdminData.value, (p) => parseInt(p.adcode)).map((p) => ({
    ...p,
    districts: _.sortBy(p.districts, (c) => parseInt(c.adcode)),
  })),
)

onMounted(async () => {
  const res = await axios.get('https://restapi.amap.com/v3/config/district', {
    params: { key: AMAP_KEY, keywords: '中国', subdistrict: 2 },
  })
  fullAdminData.value = res.data.districts[0].districts
})

const handleSelect = async (name: string, isProvince: boolean) => {
  mapStore.currentCityName = name
  mapStore.showCityPanel = false

  // 1. 获取生成的 Graphic
  const graphic = await drawBoundary(name, isProvince)

  if (graphic && graphic.geometry) {
    // 2. 将 geometry 直接传给分析函数，不要等图层更新
    runSpatialQuery(graphic.geometry)
  }
}
</script>

<style scoped>
/* 样式直接复用原代码中的 .city-panel 部分 */
.city-panel {
  position: absolute;
  top: 65px;
  right: 20px;
  width: 500px;
  height: 450px;
  z-index: 30;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}
.city-panel-header {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}
.city-panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}
.province-name {
  display: block;
  font-weight: bold;
  color: #409eff;
  cursor: pointer;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f7ff;
}
.city-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}
.city-item {
  font-size: 12px;
  color: #666;
  cursor: pointer;
  padding: 6px;
  transition: all 0.2s;
}
.city-item:hover {
  color: #409eff;
  background: #f5f7fa;
}
.close-panel {
  cursor: pointer;
  font-size: 20px;
}
.close-panel:hover {
  color: #f56c6c;
}

/* 动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
