import { FORECAST_CATEGORIES, INDUSTRIES, LEAD_SOURCES } from './constants';
import type { AuditLog, AuditAction, EntityType } from './audit';

export interface BaseEntity {
  id: string;
  created_at: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
}

// Rest of the types remain the same...

export type { AuditLog, AuditAction, EntityType };
export { FORECAST_CATEGORIES, INDUSTRIES, LEAD_SOURCES };