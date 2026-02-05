<template>
  <div class="contact-container">
    <div class="contact-card">
      <div class="header-section">
        <div class="zju-logo">ZJU</div>
        <h1>联系我们</h1>
        <p class="subtitle">Zhejiang University Rural Planning Research</p>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <div class="icon">🏢</div>
          <div class="text">
            <h4>执行单位</h4>
            <p>浙江大学农业战略与乡村规划研究中心</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">📧</div>
          <div class="text">
            <h4>电子邮箱</h4>
            <p><a href="mailto:luhuang@zju.edu.com">luhuang@zju.edu.com</a></p>
            <p><a href="mailto:yatingbao@zju.edu.com">yatingbao@zju.edu.com</a></p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">📞</div>
          <div class="text">
            <h4>联系电话</h4>
            <p><a href="mailto:luhuang@zju.edu.com">0571-88981121</a></p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon">📍</div>
          <div class="text">
            <h4>联系地址</h4>
            <p>浙江省杭州市西湖区余杭塘路866号 (浙江大学紫金港校区)</p>
          </div>
        </div>
      </div>

      <div class="footer-note">
        <p>© 2026 浙江大学农业战略与乡村规划研究中心. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  padding: 60px 20px;
  background-color: #f0f2f5;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.contact-card {
  max-width: 600px;
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 40px;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
}

.zju-logo {
  font-weight: bold;
  font-size: 2rem;
  color: #003e8c; /* ZJU Blue */
  margin-bottom: 10px;
}

h1 {
  color: #1f2d3d;
  font-size: 1.8rem;
  margin-bottom: 5px;
}
.subtitle {
  color: #909399;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.icon {
  font-size: 1.5rem;
  background: #f4f7ff;
  padding: 12px;
  border-radius: 12px;
}

h4 {
  color: #303133;
  margin-bottom: 5px;
  font-size: 1.1rem;
}
p {
  color: #606266;
  line-height: 1.6;
}

a {
  color: #409eff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

.footer-note {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
  text-align: center;
  font-size: 0.8rem;
  color: #c0c4cc;
}
</style>
