import { Operations } from "@/common/constant";
import axios from "axios";

type Education =
  | "undergraduate"
  | "master"
  | "doctor"
  | "juniorCollege"
  | "highSchool"
  | "other";

type OptionalProps = "age" | "sex" | "highestEducation";

interface RequestBody {
  token: string;
  job: string;
  name: string;
  phone: string;
  email: string;
  resumeUrl: string;
  age?: number;
  sex?: string;
  highestEducation?: Education;
}

export const login = async (loginForm: any) => {
  const res = await axios.post("/api/candidate/login", loginForm);

  return res.data;
};

export const applyJob = async (applyInfo: any) => {
  const optionalProps: OptionalProps[] = ["age", "sex", "highestEducation"];
  const { job, name, phone, email, resumeUrl, token } = applyInfo;
  const requestBody: RequestBody = {
    token,
    job,
    name,
    phone,
    email,
    resumeUrl,
  };

  optionalProps.forEach((prop: OptionalProps) => {
    if (applyInfo[prop]) requestBody[prop] = applyInfo[prop];
  });

  const response = await axios.post("/api/candidate", requestBody);

  return response;
};

export const getCandidate = async (token: string | null) => {
  const res = await axios.post("/api/candidate/get-info-front", {
    token,
  });

  return res.data;
};

export const changeStatus = async (
  token: string | null,
  operation: Operations
) => {
  const res = await axios.post("/api/candidate/change-status", {
    token,
    operation,
  });

  return res.data;
};
