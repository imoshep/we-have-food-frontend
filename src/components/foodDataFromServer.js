let allFoodData = [
  {
    createdAt: "2020-08-10T12:23:31.843Z",
    foodDesc: "qwer",
    foodImage: null,
    foodLocation: '{"lat":"32.4767103","lng":"34.9863749"}',
    foodTitle: "qwer",
    __v: 0,
    _id: "5f313c4374f2535c2845ee32",
  },
  {
    createdAt: "2020-08-10T12:23:50.687Z",
    foodDesc: "qwer",
    foodImage: null,
    foodLocation: '{"lat":"31.7227008","lng":"34.9831168"}',
    foodTitle: "qwer",
    __v: 0,
    _id: "5f313c56f4c1812aec494f27",
  },
  {
    createdAt: "2020-08-10T12:24:03.326Z",
    foodDesc: "qwr",
    foodImage: null,
    foodLocation: '{"lat":"31.7227008","lng":"34.9831168"}',
    foodTitle: "qwer",
    __v: 0,
    _id: "5f313c6307742213bc39cd13",
  },
  {
    createdAt: "2020-08-10T12:24:20.898Z",
    foodDesc: "qwer",
    foodImage: null,
    foodLocation: '{"lat":"31.7227008","lng":"34.9831168"}',
    foodTitle: "qwer",
    __v: 0,
    _id: "5f313c7407742213bc39cd14",
  },
  {
    createdAt: "2020-08-10T12:37:17.409Z",
    foodDesc: "12341234",
    foodImage: null,
    foodLocation: '{"lat":"32.4767103","lng":"34.9863749"}',
    foodTitle: "12134",
    __v: 0,
    _id: "5f313f7d7ec41f5e8c58e15f",
  },
  {
    createdAt: "2020-08-10T15:26:12.634Z",
    foodDesc: "1234",
    foodImage: null,
    foodLocation: '{"lat":"31.7227008","lng":"34.9831168"}',
    foodTitle: "1234",
    __v: 0,
    _id: "5f3167147ec41f5e8c58e160",
  },
];

let convertArrToGEOjson = (arr) => {
  console.log(arr);
  arr.forEach((obj) => {
    obj.foodLocation = JSON.parse(obj.foodLocation);

    obj.type = "Feature";
    obj.geometry = {
      type: "Point",
      coordinates: [obj.foodLocation.lat, obj.foodLocation.lng],
    };
    obj.properties = {
      foodTitle: obj.foodTitle,
      foodDesc: obj.foodDesc,
      foodImage: obj.foodImage,
      createdAt: obj.createdAt,
      _id: obj._id,
    };
  });
  console.log(arr);
};

///////////////////////////////////
