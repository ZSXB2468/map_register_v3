interface TempOverlayOptions {
  code: string
  children: Array<[
    /** 图层请求id，或者id和显示名称 */
    overlayId: string | [id: string, name: string],
    /** 图层边界 */
    bounds: [number, number, number, number],
    /** 分组 id */
    groupBy?: string,
  ]>
}

/** 临时配置变量 */
const LAYER_OVERLAY_TEMP_CONFIG_GROUP: Record<string, TempOverlayOptions> = {
  'A:XM:FOREST': {
    code: '雨林',
    children: [
      ['觉王东-上', [-4144, -34, -3558, 499], '觉王东'],
      ['觉王东-中', [-4123, 147, -3575, 485], '觉王东'],
      ['觉王东-下', [-4006, 218, -3591, 471], '觉王东'],
      ['降诸魔山东', [-2538, 509, -2134, 1078]],
      ['降诸魔山北', [-3969, 649, -3593, 877]],
      ['蟠根洞', [-3480, 691, -2995, 1112]],
      ['幽境暗河', [-4760, 501, -4177, 973]],
      ['法莎洞', [-4799, -460, -4557, -187]],
      ['翠翎恐蕈', [-4891, -854, -4473, -332]],
      ['降诸魔山南', [-2663, 1140, -2155, 1632]],
      ['香醉坡', [-2752, -604, -2288, 216]],
      ['无郁夷摩之地', [-2995, -1708, -2467, -1298]],
      ['无郁稠林南', [-2879, -1276, -2593, -892]],
      ['失梦的国土', [-5021, -117, -4425, 429], '往昔的桓那兰那'],
      ['沙中故里', [-4798, -164, -4349, 207], '往昔的桓那兰那'],
      ['茸蕈窟南', [-3459, -861, -3176, -579]],
      ['茸蕈窟北', [-3577, -1237, -3166, -838]],
      ['梦景林莽_雨的尽头', [-4431, 1435, -3682, 1798]],
      ['桓那兰那南', [-4118, -532, -3702, -209]],
      ['迪弗旧窟', [-3239, 1093, -2694, 1542]],
      ['掣电树', [-2526, -1208, -2160, -763]],
    ],
  },
  'A:XM:DESERT': {
    code: '沙漠',
    children: [
      ['固定底图1', [-7538, 1709, -6402, 3082]],
      ['固定底图2', [-6920, 3087, -6533, 3204]],
      ['固定底图3', [-5611, 833, -5448, 982]],
      ['固定底图4', [-5604, 1326, -5428, 1522]],
      ['固定底图5', [-5728, 2015, -5425, 2484]],
      ['固定底图6', [-5423, 1897, -5072, 2182]],
      ['固定底图7', [-4966, 2185, -4559, 2565]],
      ['固定底图8', [-6066, 2842, -5074, 3549]],
      [['固定底图-秘仪1', '秘仪1'], [-6552, 2220, -6108, 2466], '秘仪'],
      [['固定底图-秘仪2', '秘仪2'], [-6553, 2122, -6256, 2454], '秘仪'],
      [['固定底图-秘仪3', '秘仪3'], [-6516, 2170, -6222, 2414], '秘仪'],
      [['固定底图-王陵1', '王陵1'], [-6932, 2269, -6826, 2348], '王陵'],
      [['固定底图-王陵2', '王陵2'], [-6972, 2181, -6612, 2427], '王陵'],
      [['固定底图-王陵3', '王陵3'], [-6945, 2241, -6772, 2401], '王陵'],
      [['固定底图-舍身1', '舍身1'], [-5414, 2029, -5060, 2460], '舍身'],
      [['固定底图-舍身2', '舍身2'], [-5514, 2136, -5203, 2533], '舍身'],
      [['固定底图-舍身3', '舍身3'], [-5390, 2189, -5067, 2520], '舍身'],
      ['圣显-1', [-5831, 1049, -5265, 1260], '圣显'],
      ['圣显-2', [-5856, 1044, -5265, 1268], '圣显'],
      ['圣显-3', [-5841, 1049, -5263, 1266], '圣显'],
      ['遗漏补充', [-6740, 3106, -6647, 3186]],
    ],
  },
  'A:XM:DESERT2': {
    code: '沙地',
    children: [
      ['赤王的水晶杯', [-7043, -284, -6274, 618]],
      ['永恒绿洲', [-6793, -125, -6095, 564]],
      ['酣乐之殿-4', [-6904, -494, -6619, -215], '酣乐之殿'],
      ['酣乐之殿-3', [-6997, -496, -6650, -318], '酣乐之殿'],
      ['酣乐之殿-2', [-6882, -548, -6377, -34], '酣乐之殿'],
      ['酣乐之殿-1', [-6972, -455, -6702, -101], '酣乐之殿'],
      ['居尔城墟·赤王神殿-3', [-7317, 1237, -6736, 1719], '赤王神殿'],
      ['居尔城墟·赤王神殿-2', [-6886, 1577, -6756, 1746], '赤王神殿'],
      ['居尔城墟·赤王神殿-1', [-7341, 1174, -6758, 1862], '赤王神殿'],
      ['君王之殿-3', [-6368, 145, -5933, 613], '君王之殿'],
      ['君王之殿-2', [-6089, 139, -5867, 278], '君王之殿'],
      ['君王之殿-1', [-6310, 138, -5868, 547], '君王之殿'],
      ['沙虫隧道-3', [-5490, -25, -5310, 265], '沙虫隧道'],
      ['沙虫隧道-2', [-5517, -19, -5242, 487], '沙虫隧道'],
      ['沙虫隧道-1', [-5914, -61, -5232, 753], '沙虫隧道'],
      ['生命之殿', [-7612, 2, -6969, 590]],
      ['五绿洲', [-6171, -730, -5528, -340]],
      ['行宫花园', [-7219, -785, -6712, -263]],
      ['镇灵监牢及巨人峡谷', [-7186, 502, -6398, 1012]],
    ],
  },
  'A:XM:DESERT3': {
    code: '沙囿',
    children: [
      ['母树内部', [-7200, -1747, -6943, -1451]],
      ['甘露池洞窟', [-7397, -1504, -7160, -1234]],
      ['林泽诸窟', [-7979, -2243, -6853, -1847]],
      ['铁穆窟', [-7810, -1691, -7413, -1113]],
      ['逾渊地墟-B1', [-8735, -1912, -7843, -1211], '逾渊地墟'],
      ['逾渊地墟-B2', [-8553, -1857, -7928, -1352], '逾渊地墟'],
      ['逾渊地墟-B3', [-8049, -1701, -7386, -1180], '逾渊地墟'],
      ['精石铜城', [-8293, -2524, -7694, -1793]],
    ],
  },
}

export interface OverlayOptions {
  name: string
  url: string
  bounds: [xmin: number, ymin: number, xmax: number, ymax: number]
  /** overlay 所处地区代码 */
  areaCode: string
  /** 分组 id */
  groupBy?: string
}

/**
 * 贴图层配置
 * @todo 添加分层功能
 */
export const LAYER_OVERLAY_CONFIG: Record<string, OverlayOptions[]> = {
  twt40: Object
    .entries(LAYER_OVERLAY_TEMP_CONFIG_GROUP)
    .map(([areaCode, config]) => config.children.map(([overlayId, bounds, groupBy]) => {
      const isRenameId = Array.isArray(overlayId)
      const id = isRenameId ? overlayId[0] : overlayId
      const name = isRenameId ? overlayId[1] : overlayId
      return {
        name,
        areaCode,
        bounds,
        groupBy,
        url: `https://tiles.yuanshen.site/d/underground/${config.code}/${id}.png`,
      }
    }))
    .flat(),
}
