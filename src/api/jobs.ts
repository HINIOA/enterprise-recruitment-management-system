import axios from "axios";

async function queryJobs(params?: any, query?: any) {
  let api = "/api/job";

  if (params) Object.keys(params).forEach((key) => (api += `/${params[key]}`));

  if (query) {
    api += "?";
    Object.keys(query).forEach((key) => {
      if (query[key]) api += `${key}=${query[key]}`
    });
  }

  const response = await axios.get(api);

  return response.data;
}

export { queryJobs };
