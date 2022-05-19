// @ts-ignore
/* eslint-disable */
import config from '../../../config/config.json';
/** Update PUT /api/contacts */
export async function update(body: API.Item, options?: { [key: string]: any }) {
  const response = await fetch(`${config.api}/api/contacts`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...(options || {}),
  });
  return response.json()
}
