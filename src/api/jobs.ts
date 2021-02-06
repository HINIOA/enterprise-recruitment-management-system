import axios from "axios";

interface Params {
  id?: string;
}

interface Query {
  name?: string;
}

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
