// @ts-ignore
/* eslint-disable */
import config from '../../../config/config.json';

/** Create POST /api/contacts */
export async function create(body: API.Item, options?: { [key: string]: any }) {
  const response = await fetch(`${config.api}/api/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...(options || {}),
  });

  return response.json()
}
