import { agriMapConfig } from './maps/agri'
import { argiIndusConfig } from './maps/Agri_Industry'
import type { MapConfig } from '@/types/gis'

// 使用具名导出 (Named Export)
export const mapRegistry: Record<string, MapConfig> = {
  agri: agriMapConfig,
  argiIndus: argiIndusConfig,
}
