<template>
  <div class="home-container">
    <h2>请选择专题地图</h2>
    <div class="card-grid">
      <div class="map-card" @click="$router.push('/map/agri')">
        <h3>🌾 乡村振兴专题</h3>
        <p>全国乡村荣誉称号分布数据</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 40px;
  text-align: center;
}
.card-grid {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.map-card {
  width: 260px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.map-card:hover {
  transform: translateY(-5px);
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}
</style>
