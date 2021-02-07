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
  job: string;
  name: string;
  phone: string;
  email: string;
  resumeUrl: string;
  age?: number;
  sex?: string;
  highestEducation?: Education;
}

const applyJob = async (applyInfo: any) => {
  const optionalProps: OptionalProps[] = ["age", "sex", "highestEducation"];
  const { job, name, phone, email, resumeUrl } = applyInfo;
  const requestBody: RequestBody = {
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

export default applyJob;
