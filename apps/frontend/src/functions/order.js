import axios from "axios";

export const createOrder = async (body) =>
  await axios.post(`${import.meta.env.VITE_API_V1_URL}/order`, body);

// export async function getAllDevis(save, sort, order, limit) {
//   let sortData = sort ?? "createdAt";
//   let orderData = order ?? "asc";
//   let limitData = limit ?? 0;
//   await axios
//     .get(`${baseURL}/alldevis/${sortData}/${orderData}/${limitData}`)
//     .then((result) => {
//       if (save) {
//         if (result?.data?.error === false) {
//           save(result?.data?.data);
//         } else {
//           save([]);
//         }
//         return;
//       }
//     })
//     .catch((error) => {
//       if (error?.response?.status !== 401) {
//         DisplayError();
//       }
//     });
// }

// export async function getAllOrder(save, sort, order, limit) {
//   let sortData = sort ?? "createdAt";
//   let orderData = order ?? "asc";
//   let limitData = limit ?? 0;
//   await axios
//     .get(`${baseURL}/allOrders/${sortData}/${orderData}/${limitData}`)
//     .then((result) => {
//       if (save) {
//         if (result?.data?.error === false) {
//           save(result?.data?.data);
//         } else {
//           save([]);
//         }
//         return;
//       }
//     })
//     .catch((error) => {
//       if (error?.response?.status !== 401) {
//         DisplayError();
//       }
//     });
// }

// export async function getDevis(id, save) {
//   await axios
//     .get(`${baseURL}/devis/${id}`)
//     .then((result) => {
//       if (save) {
//         save(result?.data?.data);
//       } else {
//         return result?.data?.data;
//       }
//     })
//     .catch((error) => {
//       if (error?.response?.status !== 401) {
//         DisplayError();
//       }
//     });
// }

// export async function statusDevis(id, status, save) {
//   try {
//     const result = await axios.put(`${baseURL}/devis/status/${id}`, {
//       status: status,
//     });
//     if (result) {
//       DisplaySuccess(result?.data?.status, result?.data?.message);
//       if (save) {
//         save(result?.data?.data);
//       }
//       return true;
//     }
//   } catch (error) {
//     if (error?.response?.status !== 401) {
//       DisplayError(error?.response?.data?.error);
//     }
//     return false;
//   }
// }

// export async function updateDevis(id, dataToSend, save, refresh, close) {
//   await axios
//     .put(`${baseURL}/devis/${id}`, dataToSend)
//     .then((result) => {
//       DisplaySuccess(result?.data?.status, result?.data?.message);
//       if (refresh) {
//         refresh();
//       }
//       if (close) {
//         close();
//       }
//       if (save) {
//         save(getDevis(id, save));
//       } else {
//         return result?.data?.data;
//       }
//     })
//     .catch((error) => {
//       if (error?.response?.status !== 401) {
//         DisplayError(error?.response?.data?.error);
//       }
//     });
// }

// export async function createDevis(dataToSend, reset, save) {
//   await axios
//     .post(`${baseURL}/devis/create`, dataToSend)
//     .then((result) => {
//       DisplaySuccess(result?.data?.status, result?.data?.message);
//       if (save) {
//         save(result?.data?.data);
//       } else {
//         if (reset) {
//           reset();
//         }
//         return result?.data?.data;
//       }
//     })
//     .catch((error) => {
//       if (error?.response?.status !== 401) {
//         DisplayError(error?.response?.data?.error);
//       }
//     });
// }

// export async function updateDevisByAdmin(id, dataToSend, save) {
//   await axios
//     .put(`${baseURL}/devis/products/${id}`, dataToSend)
//     .then((result) => {
//       DisplaySuccess(result?.data?.status, result?.data?.message);
//       if (save) {
//         save(getDevis(id, save));
//       }
//     })
//     .catch((error) => {
//       if (error?.response?.status !== 401) {
//         DisplayError(error?.response?.data?.message);
//       }
//     });
// }

// export async function exportDevisPdfApi(id, type, save) {
//   await axios
//     .post(`${baseURL}/devis/pdf/${id}`, { type: type })
//     .then((result) => {
//       if (result?.data?.data) {
//         const link = document.createElement("a");
//         link.href = result?.data?.data;
//         link.target = "blanc";
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);
//       }
//       if (save) {
//         save(result?.data?.data);
//       } else {
//         return result?.data?.data;
//       }
//     })
//     .catch((error) => {
//       DisplayError();
//     });
// }

// export async function exportBonPdfApi(id, type, save) {
//   await axios
//     .post(`${baseURL}/devis/bon/${id}`, { type: type })
//     .then((result) => {
//       if (result?.data?.data) {
//         const link = document.createElement("a");
//         link.href = result?.data?.data;
//         link.target = "blanc";
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);
//       }
//       if (save) {
//         save(result?.data?.data);
//       } else {
//         return result?.data?.data;
//       }
//     })
//     .catch((error) => {
//       DisplayError();
//     });
// }

// export async function exportrecuePdfApi(id, type, save) {
//   await axios
//     .post(`${baseURL}/devis/recue/${id}`, { type: type })
//     .then((result) => {
//       if (result?.data?.data) {
//         const link = document.createElement("a");
//         link.href = result?.data?.data;
//         link.target = "blanc";
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);
//       }
//       if (save) {
//         save(result?.data?.data);
//       } else {
//         return result?.data?.data;
//       }
//     })
//     .catch((error) => {
//       DisplayError();
//     });
// }
