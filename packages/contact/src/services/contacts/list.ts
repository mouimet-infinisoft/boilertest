// @ts-ignore
/* eslint-disable */
import config from '../../../config/config.json';

export async function list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any },
) {
  const response = await fetch(`${config.api}/api/contacts`, {
    method: 'GET',

    ...params,
    ...(options || {}),
  });

  return response.json()
}
