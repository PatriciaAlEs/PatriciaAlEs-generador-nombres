import api from "./api";

export async function getGeneratorData() {
  const res = await api.fetchGet("/generator-data");
  return res;
}

export async function generateNames(payload) {
  const res = await api.fetchPost("/generate", payload);
  return res;
}

export default { getGeneratorData, generateNames };
