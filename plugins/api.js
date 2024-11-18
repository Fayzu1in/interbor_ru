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
    postCallBack: (name, phone, preferrableTime) =>
      $api.$post(`/quick/`, {
        name,
        phone,
        preferrable_time: preferrableTime,
      }),
    clickCatcher: (title) => $api.$post(`/click`, { title }),
    getCoverageCities: () => $api.$get("/coverage-cities/"),
    getQuestionsAndAnswers: () => $api.$get("/q&a/"),
    getOffers: () => $api.$get("/offers"),
    getTopProviers: () => $api.$get("/top-providers"),
    getTariff: (id) => $api.$get(`/plans/${id}`),
    postCallBacks: (params) => $api.$post("/callbacks", { params }),
  };

  inject("api", apiMethods);
};
