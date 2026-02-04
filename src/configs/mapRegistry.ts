import { agriMapConfig } from './maps/agri'
import type { MapConfig } from '@/types/gis'

// 使用具名导出 (Named Export)
export const mapRegistry: Record<string, MapConfig> = {
  agri: agriMapConfig,
}
