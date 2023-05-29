import { TSGhostAdminAPI } from '@ts-ghost/admin-api';

const api = new TSGhostAdminAPI(
  process.env.NEXT_PUBLIC_GHOST_URL || '',
  process.env.NEXT_PUBLIC_GHOST_ADMIN_KEY || '',
  'v5.47.0'
);

export default function addMember(email: string) {
  return api.members.add({ email });
}
