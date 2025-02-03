export default ({ $axios, i18n }, inject) => {
  const $api = $axios.create({
    baseURL: "https://internetbor.ru/api/v1/",
    headers: {
      common: {
        Accept: "application/json",
        "Accept-Language": i18n.locale,
      },
    },
  });

  const apiMethods = {
    instance: $api,
    // cities
    getPlans: (params) => $api.$get("/plans/", { params }),
    getCoverageCities: () => $api.$get("/coverage-cities/"),
    // get questions and answers
    getQuestionsAndAnswers: () => $api.$get("/q&a/"),
    // offers
    getOffers: () => $api.$get("/offers"),
    getTopProviers: () => $api.$get("/top-providers"),
    getTariff: (id) => $api.$get(`/plans/${id}`),
    // callbacks
    postCallBacks: (params) => $api.$post("/callbacks", params),
    postCallBack: (name, phone, preferrableTime) =>
      $api.$post(`/quick/`, {
        name,
        phone,
        preferrable_time: preferrableTime,
      }),
    // catchers
    clickCatcher: (title) => $api.$post(`/click`, { title }),
  };

  inject("api", apiMethods);
};
