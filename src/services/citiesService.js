import axios from "axios";

const citiesGetRequest = async () => {
  let result = [];
  let newInstance = axios.create({
    baseURL: "https://data.gov.il",
    params: {
      resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
    },
    headers: {
      common: {},
    },
  });
  for (let i = 0; i < 13; i++) {
    await newInstance
      .get("/api/3/action/datastore_search", {
        params: {
          resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
          offset: 100 * i,
        },
      })
      .then((response) => {
        result.push(...response.data.result.records);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return result;
};

const makeCitiesArray = async () => {
  let result = await citiesGetRequest();
  let cities = { names: [] };
  result.forEach((record, idx) => {
    cities.names.push(record["שם_ישוב"].trim());
  });
  return cities;
};

export default makeCitiesArray;
