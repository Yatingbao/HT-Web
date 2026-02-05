<template>
  <div class="home-container">
    <h2>请选择专题地图</h2>
    <div class="card-grid">
      <div
        v-for="(config, key) in mapRegistry"
        :key="key"
        class="map-card"
        @click="$router.push(`/map/${key}`)"
      >
        <h3>{{ config.mapTitle }}</h3>
        <p>包含 {{ config.layers.length }} 个业务图层数据</p>
        <div class="card-footer">点击进入专题 →</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入你的注册表
import { mapRegistry } from '@/configs/mapRegistry'
</script>

<style scoped>
.home-container {
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
  min-height: 100vh;
}
.card-grid {
  display: flex;
  flex-wrap: wrap; /* 允许换行，如果卡片多了会自动排到下一行 */
  justify-content: center;
  gap: 20px; /* 卡片之间的间距 */
  margin-top: 30px;
}
.map-card {
  width: 280px;
  padding: 24px;
  background: white;
  border: 1px solid #ebeef5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.map-card:hover {
  transform: translateY(-8px);
  border-color: #409eff;
  box-shadow: 0 12px 24px rgba(64, 158, 255, 0.15);
}
.map-card h3 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 1.25rem;
}
.map-card p {
  color: #909399;
  font-size: 0.9rem;
  margin-bottom: 20px;
}
.card-footer {
  margin-top: auto;
  font-size: 0.85rem;
  color: #409eff;
  font-weight: bold;
}
</style>
