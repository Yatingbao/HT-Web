import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CaseDetail {
  id: string
  name: string
  coords: [number, number] // [经度, 纬度]
  pinyin: string // 用于匹配本地图片文件名
  title: string // 核心荣誉
  type: string // 产业类型
  period: string // 发展时期
  description: string // 核心经验
  tags: string[]
}

export const useCaseStore = defineStore('caseStore', () => {
  const viewMode = ref<'globe' | 'focus'>('globe')
  const activeCase = ref<CaseDetail | null>(null)

  // 案例数据 (已加入 Mokumoku)
  const cases = ref<CaseDetail[]>([
    {
      id: 'digang',
      name: '湖州荻港渔庄',
      coords: [120.15, 30.88],
      pinyin: 'digang', // 对应 assets/pics/digang.jpg
      title: '全球重要农业文化遗产 / 联合国最佳旅游乡村',
      type: '桑基鱼塘系统 (农旅综合体)',
      period: '2006年至今',
      tags: ['循环生态', '千年鱼文化', '农旅融合'],
      description:
        '依托千年桑基鱼塘生态系统，实现了从单一餐饮“农家乐”向复合型农旅综合体的战略转型。',
    },
    {
      id: 'yuanjia',
      name: '礼泉袁家村',
      coords: [108.56, 34.55],
      pinyin: 'yuanjia', // 对应 assets/pics/yuanjia.jpg
      title: '关中民俗第一村 / 全国乡村振兴标杆',
      type: '民俗体验型乡村旅游',
      period: '2007年开始转型',
      tags: ['股份合作制', '乡村资产化', '共同富裕'],
      description: '通过股份合作制解决贫富差距，深挖关中饮食文化，售卖“真实的乡村生活”。',
    },
    {
      id: 'pandapig',
      name: '熊猫猪猪两头乌国际牧场',
      coords: [119.53, 29.08],
      pinyin: 'pandapig', // 对应 assets/pics/pandapig.jpg
      title: '中华熊猫猪 IP 牧场',
      type: '智慧养殖 + 网红乐园',
      period: '2021年开园',
      tags: ['5G智慧农场', '品牌IP化', '认养模式'],
      description:
        '聚焦珍稀猪种金华两头乌，打造全球首个全程可视化智慧养殖系统，将“土特产”转化为“潮流 IP”。',
    },
    {
      id: 'mokumoku',
      name: '日本 Mokumoku 农场',
      coords: [136.17, 34.83], // 日本三重县伊贺市
      pinyin: 'mokumoku', // 对应 assets/pics/mokumoku.jpg
      title: '世界级乡村振兴与“第六产业”典范',
      type: '加工销售 + 教育体验 + 观光',
      period: '1987年创立',
      tags: ['第六产业', '亲子教育', '职人文化'],
      description: '构建从养殖到加工、销售、教育的完整生态，强调“生产者与消费者之间的信赖”。',
    },
    // 在 cases 数组中添加以下对象
    {
      id: 'keukenhof',
      name: '荷兰库肯霍夫花园',
      coords: [4.54, 52.27], // 荷兰利瑟 (Lisse) 坐标
      pinyin: 'keukenhof', // 需在 assets/pics/ 下准备 keukenhof.jpg
      title: '欧洲之眼 / 世界最大球茎花卉公园',
      type: '花卉产业 + 艺术展览 + 数字化营销',
      period: '1949年筹建 / 60天盛放模式',
      tags: ['层植技术', '60+300模式', '数字虚拟展览'],
      description:
        '独创“60天盛放+300天蓄能”模式，利用层植技术确保花期覆盖，通过AR/VR与大数据实现精准营销。',
    },
  ])

  return { viewMode, activeCase, cases }
})
