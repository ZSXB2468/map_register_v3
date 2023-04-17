/** 地图标签配置 */
export interface TagOptions {
  /** 渲染内容 */
  text: string
  /** 坐标表达式 */
  pos: [number, number]
  /**
   * 字体级别
   * - `0` - 区级(即游戏内最小的名称)
   * - `1` - 块级(即游戏中显示统计探索度的名称)
   * - `2` - 国级(暂时没用上)
   * @default 0
   */
  level?: 0 | 1 | 2
}

export const LAYER_TAG_CONFIGS: Record<string, TagOptions[]> = {
  twt36: [
    // 蒙德
    { text: '明冠山地', pos: [917, -4337], level: 1 },
    { text: '苍风高地', pos: [1260, -3553], level: 1 },
    { text: '坠星山谷', pos: [2295, -4122], level: 1 },
    { text: '坠星山谷', pos: [2295, -4122], level: 1 },
    { text: '风啸山坡', pos: [2323, -2880], level: 1 },
    { text: '风龙废墟', pos: [344, -4530] },
    { text: '明冠峡', pos: [1096, -4498] },
    { text: '果酒湖', pos: [1624, -4378] },
    { text: '望风山地', pos: [2252, -4542] },
    { text: '望风角', pos: [2872, -4726] },
    { text: '星落湖', pos: [2304, -4294] },
    { text: '摘星崖', pos: [2840, -4234] },
    { text: '千风神殿', pos: [2808, -3894] },
    { text: '蒙德城', pos: [1600, -4050] },
    { text: '低语森林', pos: [2040, -4074] },
    { text: '奔狼领', pos: [1080, -3678] },
    { text: '清泉镇', pos: [1644, -3354] },
    { text: '风起地', pos: [2172, -3470] },
    { text: '晨曦酒庄', pos: [1100, -3200] },
    { text: '鹰翔海滩', pos: [2860, -3182] },
    { text: '达达乌帕谷', pos: [2616, -2650] },
    { text: '誓言岬', pos: [3268, -2818] },
    { text: '马斯克礁', pos: [4012, -2882] },
    // 雪山
    { text: '龙脊雪山', pos: [1506, -2470], level: 1 },
    { text: '覆雪之路', pos: [1896, -2674] },
    { text: '眠龙谷', pos: [1456, -2562] },
    { text: '雪葬之都 · 近郊', pos: [1200, -2200] },
    { text: '雪葬之都 · 旧宫', pos: [1900, -2300] },
    { text: '寒天之钉', pos: [1748, -2120] },
    { text: '星荧洞窟', pos: [1588, -1950] },
    // 璃月
    { text: '层岩巨渊', pos: [-1851, 128], level: 1 },
    { text: '珉林', pos: [-1500, -1429], level: 1 },
    { text: '璃沙郊', pos: [-864, 18], level: 1 },
    { text: '云来海', pos: [736, -199], level: 1 },
    { text: '琼玑野', pos: [482, -1531], level: 1 },
    { text: '碧水原', pos: [-205, -2507], level: 1 },
    { text: '轻策庄', pos: [-376, -3162] },
    { text: '无妄坡', pos: [0, -2920] },
    { text: '石门', pos: [240, -2778] },
    { text: '池中之盐', pos: [680, -2494] },
    { text: '荻花洲', pos: [50, -2386] },
    { text: '望舒客栈', pos: [64, -1950] },
    { text: '明蕴镇', pos: [876, -1854] },
    { text: '瑶光滩', pos: [748, -1402] },
    { text: '归离原', pos: [148, -1526] },
    { text: '孤云阁', pos: [1452, -514] },
    { text: '翠玦坡', pos: [-556, -1386] },
    { text: '渌华池', pos: [-292, -1042] },
    { text: '遁玉陵', pos: [-716, -518] },
    { text: '灵矩关', pos: [-1020, -154] },
    { text: '天衡山', pos: [-292, -158] },
    { text: '璃月港', pos: [204, -198] },
    { text: '青墟浦', pos: [-1220, 386] },
    { text: '奥藏山', pos: [-1580, -2334] },
    { text: '华光林', pos: [-1804, -2046] },
    { text: '庆云顶', pos: [-1536, -1910] },
    { text: '绝云间', pos: [-1080, -1754] },
    { text: '琥牢山', pos: [-1964, -1754] },
    { text: '南天门', pos: [-1760, -1362] },
    { text: '天遒谷', pos: [-1130, -1026] },
    { text: '采樵谷', pos: [-1608, -470] },
    { text: '伏鳌谷', pos: [-1908, -134] },
    { text: '地面矿区', pos: [-1896, 6] },
    { text: '巨渊之口', pos: [-1950, 150] },
    { text: '丹砂崖', pos: [-2244, 298] },
    { text: '天工峡', pos: [-1960, 414] },
    { text: '琉璃峰', pos: [-1500, 390] },
    // 稻妻
    { text: '刃连岛', pos: [6116, 1646] },
    { text: '荒海', pos: [6220, 2210] },
    { text: '离岛', pos: [5588, 2506] },
    { text: '鸣神大社 · 神樱', pos: [6450, 2454] },
    { text: '影向山', pos: [6336, 2602] },
    { text: '神里屋敷', pos: [6668, 2590] },
    { text: '绀田村', pos: [5990, 2750] },
    { text: '镇守之森', pos: [6456, 2858] },
    { text: '白狐之野', pos: [6150, 3000] },
    { text: '甘金岛', pos: [5820, 3130] },
    { text: '稻妻城', pos: [6588, 3418] },
    { text: '九条阵屋', pos: [5120, 3540] },
    { text: '踏鞴砂', pos: [4650, 4178] },
    { text: '名椎滩', pos: [4100, 3870] },
    { text: '藤兜砦', pos: [3328, 4006] },
    { text: '无明砦', pos: [2840, 4110] },
    { text: '无想刃狭间', pos: [3608, 4054] },
    { text: '绯木村', pos: [3384, 4200] },
    { text: '蛇神之首', pos: [3520, 4362] },
    { text: '蛇骨矿洞', pos: [3600, 4622] },
    { text: '水月池', pos: [1960, 3942] },
    { text: '曚云神社', pos: [1176, 4278] },
    { text: '珊瑚宫', pos: [1544, 4222] },
    { text: '望泷村', pos: [1648, 4470] },
    { text: '平海砦', pos: [6372, 4858] },
    { text: '越石村', pos: [5796, 5018] },
    { text: '「清籁丸」', pos: [5500, 5050] },
    { text: '浅濑神社', pos: [5400, 5542] },
    { text: '天云峠', pos: [6200, 5450] },
    { text: '知比山', pos: [3930, 7150] },
    { text: '笈名海滨', pos: [4036, 7334] },
    { text: '千来神祠', pos: [4376, 7286] },
    { text: '逢岳之野', pos: [3900, 7580] },
    { text: '菅名山', pos: [4100, 7600] },
    { text: '茂知祭场', pos: [4230, 7674] },
    { text: '惑饲滩', pos: [4192, 7854] },
    // 须弥（草原）
    { text: '善见地', pos: [-3850, 901], level: 1 },
    { text: '桓那兰那', pos: [-4125, -581], level: 1 },
    { text: '二净甸', pos: [-3811, -221], level: 1 },
    { text: '阿陀河谷', pos: [-2897, 1305], level: 1 },
    { text: '道成林', pos: [-2965, 41], level: 1 },
    { text: '护世森', pos: [-2657, -1112], level: 1 },
    { text: '无郁稠林', pos: [-2500, -1228] },
    { text: '卡萨扎莱宫', pos: [-2980, -930] },
    { text: '茸蕈窟', pos: [-3250, -800] },
    { text: '桓那兰那', pos: [-4086, -576] },
    { text: '须弥城', pos: [-3154, -320] },
    { text: '香醉坡', pos: [-2540, -280] },
    { text: '离渡谷', pos: [-2850, -64] },
    { text: '天臂池', pos: [-3300, -14] },
    { text: '化城郭', pos: [-2748, 260] },
    { text: '维摩庄', pos: [-3030, 642] },
    { text: '禅那园', pos: [-3700, 620] },
    { text: '谒颂幽境', pos: [-4300, 680] },
    { text: '降诸魔山', pos: [-2660, 1050] },
    { text: '水天丛林', pos: [-3850, 1304] },
    { text: '奥摩斯港', pos: [-2850, 1770] },
    { text: '荼诃之座', pos: [-4400, 1560] },
    { text: '觉王之殿', pos: [-4280, 14] },
    { text: '往昔的桓那兰那', pos: [-4700, 80] },
    // 须弥（沙漠）
    { text: '千壑沙地', pos: [-6489, 97], level: 1 },
    { text: '列柱沙原', pos: [-6826, 2371], level: 1 },
    { text: '上风蚀地', pos: [-5539, 3234], level: 1 },
    { text: '下风蚀地', pos: [-5282, 1557], level: 1 },
    { text: '失落的苗圃', pos: [-4656, 66], level: 1 },
    { text: '「五绿洲」的孑遗', pos: [-5600, -546] },
    { text: '「三运河之地」', pos: [-6600, -200] },
    { text: '镔铁沙丘', pos: [-5200, 0] },
    { text: '愚妄行宫', pos: [-5800, 154] },
    { text: '折胫谷', pos: [-7230, 16] },
    { text: '达马山', pos: [-6590, 281] },
    { text: '啁哳之沙', pos: [-5450, 326] },
    { text: '亡者狭廊', pos: [-5900, 626] },
    { text: '巨人峡谷', pos: [-6550, 870] },
    { text: '「神的棋盘」', pos: [-6950, 1100] },
    { text: '塔尼特露营地', pos: [-6200, 1150] },
    { text: '圣显厅', pos: [-5350, 1180] },
    { text: '喀万驿', pos: [-4632, 1324] },
    { text: '饱饮之丘', pos: [-6568, 1734] },
    { text: '阿如村', pos: [-5046, 1816] },
    { text: '舍身陷坑', pos: [-5500, 1986] },
    { text: '活力之家', pos: [-4760, 2200] },
    { text: '赤王陵', pos: [-6848, 2306] },
    { text: '丰饶绿洲', pos: [-5860, 2500] },
    { text: '避让之丘', pos: [-6420, 2992] },
    { text: '铄石之丘', pos: [-7190, 2970] },
    { text: '荼诃落谷', pos: [-5350, 3250] },
    { text: '秘仪圣殿', pos: [-6100, 2314] },
  ],
}
