// @ts-ignore
import config from '../../../config/config.json';
/** ReadOne GET /api/contacts/${param0} */
export async function read(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.readParams,
  options?: { [key: string]: any },
) {
  const { SK: param0, ...queryParams } = params;
  const response = await  fetch(`${config.api}/api/contacts/${param0}`, {
    method: 'GET',
    ...queryParams,
    ...(options || {}),
  });
  return response.json()
}
