import { Dexie } from 'dexie'
import { markerFormater } from './middleware'

/** MD5 表项 */
export interface MD5Vo {
  /** 点位 id 为 marker-0、marker-1，物品 id 为 item-0，以此类推 */
  id: string
  /** md5 的值 */
  value: string
}

/** 用于存储用户的非敏感信息，如本地设置、筛选器状态等 */
export interface UserPreference {
  /** 用户 id */
  id?: number
  /** 筛选器状态列表 */
  filterStates?: FilterState[]
}

export interface FilterState {
  /** 筛选器存储的唯一名称 */
  name: string
  /** 物品 ids */
  itemIds: number[]
}

export class AppDatabase extends Dexie {
  /** 地区表 @全量接口 */
  declare area: Dexie.Table<API.AreaVo, number>
  /** 图标标签表 @全量接口 */
  declare iconTag: Dexie.Table<API.TagVo, number>
  /** 物品表 @全量接口 */
  declare item: Dexie.Table<API.ItemVo, number>
  /** 物品类型表 @分页接口 */
  declare itemType: Dexie.Table<API.ItemTypeVo, number>
  /** 点位表 @全量接口 */
  declare marker: Dexie.Table<API.MarkerVo, number>
  /** MD5 记录表 @本地 */
  declare md5: Dexie.Table<MD5Vo, string>
  /** 用户表 @本地 */
  declare user: Dexie.Table<UserPreference, number>

  constructor() {
    super('AppDatabase')

    this
      .use(markerFormater)
      .version(1.9)
      .stores({
        area: '&id, parentId, name, code, hiddenFlag',
        icon: '&id, name',
        iconTag: '&tag',
        item: '&id, *typeIdList, areaId, name, specialFlag, hiddenFlag',
        itemType: '&id, name, hiddenFlag',
        marker: '&id, *itemIdList, markerTitle, refreshTime, hiddenFlag',
        md5: '&id',
        user: '&id',
      })
  }
}
