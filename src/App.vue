<template>
  <div id="app">
    <header class="app-header">
      <div class="logo-area">
        <!-- <span class="logo-icon"></span> -->
        <h1>全国乡村荣誉称号分布可视化平台</h1>
      </div>
      <nav class="app-nav">
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/about">关于项目</router-link></li>
          <li><router-link to="/contact">联系我们</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* 1. 基础重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden; /* 禁止全局滚动，地图页面的滚动应在局部处理 */
  font-family:
    'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial,
    sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

/* 2. 顶栏样式 */
.app-header {
  background: rgba(26, 26, 26); /* 稍微降低透明度 */

  /* 建议：透明后可以把阴影调淡一点，更显轻盈 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  color: white;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px; /* 稍微收窄一点，给地图留出更多空间 */
  z-index: 1000; /* 确保在地图图层之上 */
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 24px;
}

.app-header h1 {
  font-size: 1.25rem;
  letter-spacing: 1px;
}

/* 3. 导航样式 */
.app-nav ul {
  list-style: none;
  display: flex;
  gap: 30px;
}

.app-nav a {
  color: #999;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 8px 4px;
  border-bottom: 2px solid transparent;
}

/* 路由激活状态 */
.app-nav a.router-link-active {
  color: #409eff;
  border-bottom-color: #409eff;
}

.app-nav a:hover {
  color: #fff;
}

/* 4. 主内容区域 */
.app-main {
  flex: 1;
  width: 100%;
  background-color: #f5f7fa;
  position: relative;
  overflow: hidden; /* 重要：防止地图容器撑开溢出 */
}

/* 5. 简单的切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
