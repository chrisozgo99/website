import GhostAdminAPI from '@tryghost/admin-api';

const api = new GhostAdminAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL || '',
  key: process.env.NEXT_PUBLIC_GHOST_ADMIN_KEY || '',
  version: 'v5.0',
});

export default function addMember(email: string) {
  return api.members.add({ email });
}
