import type { NextApiRequest, NextApiResponse } from 'next';

import addMember from './ghost-admin';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { email } = request.body;
  addMember(email)
    .then((member: any) => {
      response.status(200).json(member);
    })
    .catch((error: any) => {
      response.status(500).json({ error: error.message });
    });
}
