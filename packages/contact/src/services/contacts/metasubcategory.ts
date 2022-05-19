// @ts-ignore
/* eslint-disable */
import config from '../../../config/config.json';
/** Meta subcategory with count GET /api/Meta/subcategory */
export async function metasubcategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.metasubcategoryParams,
  options?: { [key: string]: any },
) {
  const response = await  fetch(`${config.api}/api/Meta/subcategory`, {
    method: 'GET',

    ...params,

    ...(options || {}),
  });
  return response.json()
}
