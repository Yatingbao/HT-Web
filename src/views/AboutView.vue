<template>
  <div class="about-container">
    <div class="content-card">
      <section class="intro">
        <h1>关于本系统</h1>
        <p class="subtitle">智慧地理信息业务分析平台</p>
        <hr />
        <p>
          本系统是一个集成的
          <strong>WebGIS</strong> 决策支持平台，旨在通过空间可视化的方式展示全国休闲农业案例、
          水利设施及产业园区的空间分布。系统基于 <strong>Vue 3</strong> 与
          <strong>ArcGIS Maps SDK for JavaScript</strong> 构建。
        </p>
      </section>

      <section class="features">
        <h3>核心功能</h3>
        <ul>
          <li><strong>动态图层管理：</strong> 针对不同业务模块加载特定的 GeoJSON 数据。</li>
          <li><strong>空间统计分析：</strong> 基于行政区划边界进行点位在位分析与数量统计。</li>
          <li><strong>多维度配置：</strong> 通过配置文件轻松扩展，支持无限数量的专题地图。</li>
        </ul>
      </section>

      <section class="tech-stack">
        <h3>技术架构</h3>
        <div class="tech-tags">
          <span>Vue 3 (Composition API)</span>
          <span>Pinia</span>
          <span>ArcGIS JS SDK</span>
          <span>AMap API</span>
          <span>TypeScript</span>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  padding: 40px 20px;
  background-color: #f5f7fa;
  min-height: 100%;
  display: flex;
  justify-content: center;
}

.content-card {
  max-width: 800px;
  width: 100%;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

h1 {
  color: #2c3e50;
  margin-bottom: 5px;
}
.subtitle {
  color: #409eff;
  font-size: 1.1rem;
  margin-bottom: 20px;
}
hr {
  border: 0;
  border-top: 1px solid #eee;
  margin: 20px 0;
}

section {
  margin-bottom: 30px;
}
h3 {
  color: #34495e;
  margin-bottom: 15px;
  border-left: 4px solid #409eff;
  padding-left: 10px;
}

p {
  line-height: 1.8;
  color: #606266;
}
ul {
  padding-left: 20px;
  color: #606266;
}
li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.tech-tags span {
  background: #ecf5ff;
  color: #409eff;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid #d9ecff;
}
</style>
