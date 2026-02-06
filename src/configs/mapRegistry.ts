import { agriHeritConfig } from './maps/Agricultural_Heritage'
import { argiIndusConfig } from './maps/Agri_Industry'
import { histrSitesCofig } from './maps/Historical_Sites'
import { leiAgriCofig } from './maps/Leisure_Agri'
import { ruralGoverCofig } from './maps/Rural_Governance'
import { ruralRevitCofig } from './maps/Rural_Revitalization'

import type { MapConfig } from '@/types/gis'

// 使用具名导出 (Named Export)
export const mapRegistry: Record<string, MapConfig> = {
  agriHerit: agriHeritConfig,
  argiIndus: argiIndusConfig,
  histrSites: histrSitesCofig,
  leiAgri: leiAgriCofig,
  ruralGover: ruralGoverCofig,
  ruralRevit: ruralRevitCofig,
}
