// @ts-ignore
/* eslint-disable */
import config from '../../../config/config.json';

/** Meta category with count GET /api/Meta/category */
export async function metacategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.metacategoryParams,
  options?: { [key: string]: any },
) {
  const response = await  fetch(`${config.api}/api/Meta/category`, {
    method: 'GET',

      ...params,
   ...(options || {}),
  });
  return response.json()
}
