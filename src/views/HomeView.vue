<template>
  <div class="home-container">
    <div class="hero-section">
      <img src="@/assets/pics/heading.png" alt="Header" class="hero-image" />
      <div class="hero-gradient-overlay"></div>
    </div>

    <div class="main-content">
      <div class="section-title-wrapper">
        <h2 class="section-main-title">专题地图门户</h2>
        <div class="section-sub-title">National Rural Honorary Title Visualization</div>
        <div class="title-underline"></div>
      </div>

      <div class="card-grid">
        <div
          v-for="(config, key) in mapRegistry"
          :key="key"
          class="map-card"
          @click="$router.push(`/map/${key}`)"
        >
          <div class="card-accent" :style="{ background: getRandomColor() }"></div>
          <div class="card-content">
            <div class="card-tag">{{ config.layers.length }} 数据图层</div>
            <h3>{{ config.mapTitle }}</h3>
            <p>点击进入专题，查看详细的空间分布统计与可视化分析数据。</p>
            <div class="card-action">
              <span>探索专题</span>
              <span class="icon">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mapRegistry } from '@/configs/mapRegistry'

const getRandomColor = () => {
  const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#00bcd4']
  return colors[Math.floor(Math.random() * colors.length)]
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #ffffff; /* 使用纯白背景，更显生机 */
  overflow-y: auto;
}

/* 1. Hero Section：大图展示 */
.hero-section {
  position: relative;
  height: 300px; /* 使用视口高度，更具视觉冲击力 */
  width: 100%;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 核心修改：仅保留底部的平滑渐变 */
.hero-gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px; /* 渐变高度 */
  /* 从透明过渡到网页底色 */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
}

/* 2. 标题区：渐变下方的布局 */
.main-content {
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 30px;
  /* 标题稍微往上提一点点，压在渐变的末尾 */
  margin-top: 10px;
}

.section-title-wrapper {
  text-align: center;
  margin-bottom: 50px;
}

.section-main-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.section-sub-title {
  font-size: 0.85rem;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.title-underline {
  width: 40px;
  height: 3px;
  background: #409eff;
  margin: 15px auto 0;
  border-radius: 2px;
}

/* 3. 卡片布局 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.map-card {
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #f2f2f2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.card-accent {
  height: 5px;
}

.card-content {
  padding: 28px;
}

.card-tag {
  font-size: 11px;
  font-weight: 700;
  color: #409eff;
  background: rgba(64, 158, 255, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 16px;
}

.map-card h3 {
  font-size: 1.25rem;
  color: #1d1d1f;
  margin-bottom: 12px;
}

.map-card p {
  font-size: 0.95rem;
  color: #6e6e73;
  line-height: 1.5;
  margin-bottom: 24px;
}

.card-action {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #409eff;
  font-weight: 600;
  font-size: 0.9rem;
}

.map-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border-color: transparent;
}

.map-card:hover .icon {
  transform: translateX(4px);
}

.icon {
  transition: transform 0.3s ease;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .hero-section {
    height: 35vh;
  }
  .section-main-title {
    font-size: 1.6rem;
  }
  .main-content {
    padding: 0 20px;
  }
}
</style>
