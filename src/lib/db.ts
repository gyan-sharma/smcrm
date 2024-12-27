import Dexie, { Table } from 'dexie';
import { User, Opportunity, Attachment, AuditLog } from '../types';

export class CrmDatabase extends Dexie {
  users!: Table<User>;
  opportunities!: Table<Opportunity>;
  attachments!: Table<Attachment>;
  auditLogs!: Table<AuditLog>;

  constructor() {
    super('CrmDatabase');
    
    this.version(2).stores({
      users: 'id, email, role, deleted_at',
      opportunities: 'id, title, sales_rep_id, stage, priority, created_at, deleted_at',
      attachments: 'id, opportunity_id, filename',
      auditLogs: 'id, timestamp, user_id, action, entity_type, entity_id'
    });
  }
}

const db = new CrmDatabase();
export default db;