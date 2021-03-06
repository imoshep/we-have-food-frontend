import http from "./httpService";
import { apiUrl } from "../config.json";
import _ from "lodash";

export function createFood(form, imageFilename) {
  const formData = new FormData(form);
  formData.set('foodImage', imageFilename)
  // for (let p of formData) console.log(p);
  return http.post(`${apiUrl}/food`, formData)
  .catch((err) => {
    console.log(err.response.data);
    return err.response.data;
  });
}

export async function getSignedRequest(file) {
  const rndName = _.padStart(_.toString(_.random(99999999)), 8, "0");
  const parts = file.type.split("/");
  const fileName = `IMAGE-${rndName}.${parts[1]}`;
  let S3URL;

  await http.get(`${apiUrl}/sign-s3?file-name=${encodeURIComponent(fileName)}&file-type=${file.type}`)
  .then((res) => {
    S3URL = res.data.url
    uploadFileToS3(file, res.data.signedRequest, res.data.url)
  })
  .catch((err) => console.log(err))

  return S3URL;

}

function uploadFileToS3(file, signedRequest, url) {
  http.put(signedRequest, file)
  .then()
  .catch((err) => console.log(err))
}

export function deleteFood(id) {
  return http.delete(`${apiUrl}/food/${id}`);
}

export function updateFood(id, form, imageFilename) {
  const formData = new FormData(form);
  formData.set('foodImage', imageFilename)

  return http.put(`${apiUrl}/food/${id}`, formData)
  .catch((err) => {
    return err.response.data;
  });
}

export function searchFoodByFoodId(foodId) {
  return http.get(`${apiUrl}/food?_id=${foodId}`).catch((err) => {
    console.log(err.response.data);
    return err.response.data;
  });
}

export function searchFoodByCity(city) {
  return http.get(`${apiUrl}/food?foodCity=${city}`).catch((err) => {
    console.log(err.response.data);
    return err.response.data;
  });
}

export function searchFoodByCreator(userId) {
  return http.get(`${apiUrl}/food?user_id=${userId}`).catch((err) => {
    console.log(err.response.data);
    return err.response.data;
  });
}


export default {
  createFood,
  getSignedRequest,
  deleteFood,
  updateFood,
  searchFoodByFoodId,
  searchFoodByCity,
  searchFoodByCreator,
};

// formData.append("foodLocation", location);

// for (let p of formData) {
//   console.log(p);
// }
