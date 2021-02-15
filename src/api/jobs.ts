import axios from "axios";

async function queryJobs(params?: any, query?: any) {
  let api = "/api/job";

  if (params) Object.keys(params).forEach((key) => (api += `/${params[key]}`));

  if (query) {
    const queryArr: string[] = []
    Object.keys(query).forEach((key) => {
      if (query[key]) queryArr.push(`${key}=${query[key]}`)
    });

    api += '?' + queryArr.join('&')
  }

  const response = await axios.get(api);
  return response.data;
}

export { queryJobs };
