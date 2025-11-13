// Pequeño helper para llamadas al backend con Authorization si hay token
export async function fetchGet(path) {
  const backend = import.meta.env.VITE_BACKEND_URL || "";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(backend + path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return res;
}

export async function fetchPost(path, body = {}) {
  const backend = import.meta.env.VITE_BACKEND_URL || "";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(backend + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });
  return res;
}

export default { fetchGet, fetchPost };
