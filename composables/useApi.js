import { useMessage } from "naive-ui";

const API_ENDPOINTS = {
  customer: {
    login: "/api/login",

    // reservation
    reserHotelDetail: "/api/reservation/hotel-reservation",
    reserHotel: "/api/reservation/hotel-reservation",
  },
  cms: {
    sign: "/api/user/user-signup",
    login: "/api/user/user-login",
    userByID: "api/user/user-by-id",
    userByType: "/api/user/get-user-type",
    userAll: "/api/user/get-all-user",
    user: "/api/user/update-user",
    userCheckEmail: "api/user/checkEmail",
    userRole: "/api/user/update-user-role",
    userDelete: "/api/user/delete-user-account",

    categoryStar: "/api/category/get-category-star",
    categoryCar: "/api/category/get-car-category",
    categoryTour: "/api/category/get-tour-category",
    categoryActivity: "/api/category/get-activity-category",
    categoryActivityDuration: "/api/category/get-activity-duration-category",
    categoryActivityLanguage: "/api/category/get-activity-language-category",

    story: "/api/story/get-all-story",
    addStory: "/api/story/add-story",

    services: "/api/service/get-service",
    addServices: "/api/service/add-service",
    bulkServices: "/api/service/add-bulk-discount",
    editServices: "/api/service/edit-service",
    editGalleryServices: "/api/service/edit-gallery",
    typeServices: "/api/service/get-gallery-by-service-type",
    tourServices: "/api/service/add-tour-facility",
    allServices: "/api/service/get-all-service",
    svGetHotel: "/api/service/get-hotel",
    svGetCar: "/api/service/get-car",
    svGetTour: "/api/service/get-tour",
    svGetActivity: "/api/service/get-activity",
    svGetRental: "/api/service/get-rental",
    svGetPackage: "/api/service/get-package",
    svGetRoomDetail: "/api/service/get-room-detail",
    svAddHotel: "/api/service/add-hotel",
    svAddCar: "/api/service/add-car",
    svAddTour: "/api/service/add-tour",
    svAddActivity: "/api/service/add-activity",
    svAddRental: "/api/service/add-rental",
    deleteServices: "/api/service/delete-service",

    hotel: "/api/hotel/get-hotel-rule",
    hotelTheme: "/api/category/get-hotel-theme",
    hotelFacility: "/api/category/get-hotel-facility-category",

    additional: "/api/additional/get-contact",
    additionalAdd: "/api/additional/add-contact",
    additionalAsk: "/api/additional/add-freequency-ask",
    additionalRoom: "/api/additional/add-room",
    additionalGetRoom: "/api/additional/get-room",
    additionalDeleteContact: "/api/additional/delete-contact",

    askQuestion: "/api/user/add-ask-question",
    getServiceDetail:"/api/service/service-detail",
    addInquiry:"/api/user/add-inquiry",
    children: {
      addHotelRule: "/api/hotel/add-hotel-rule",
      addHotelFacility: "/api/hotel/add-hotel-facility",
      addHotelTheme: "/api/hotel/add-hotel-theme",
      getHotelRule: "/api/hotel/get-hotel-rule",
      gethotelFacility: "/api/hotel/get-hotel-facility",
      getCategoryStar: "/api/category/get-category-star",
      addHotelFacilityCategory: "/api/category/add-hotel-facility-category",
      getHotelFacilityCategory: "/api/category/get-hotel-facility-category",
      // tour
      addLanguageTour: "/api/additional/add-language-tour",
      addTourDuration: "/api/additional/add-tour-duration",
      addTourFacility: "/api/additional/add-tour-facility",
      addTourBulkDiscount: "/api/additional/add-tour-bulkdiscount",      
      addTourCategoryLanguage: "/api/category/add-tour-category-language",
      addTourDurationCategory: "/api/category/add-tour-duration-category",
      getTourCategory: "/api/category/get-tour-category",
      getTourLanguageCategory: "/api/category/get-tour-category-language",
      getTourDurationCategory: "/api/category/get-tour-duration-category",
      getTourBulkdiscount:"/api/additional/get-tour-bulkdiscount",
      getTourFacility:"/api/additional/get-tour-facility",
      getTourLanguage:"/api/additional/get-language-tour",
      getTourDuration:"/api/additional/get-tour-duration",
      // car
      addCarFeature: "/api/additional/add-car-feature",
      addCarCategory: "/api/category/add-car-category",
      getCarCategory: "/api/category/get-car-category",
      getCarFeature: "/api/additional/get-car-feature",
      addCarBrand:"/api/additional/add-car-brand",
      getCarBrand:"/api/additional/get-car-brand",
      // rental
      addRentalAmenty:"/api/additional/add-rental-amenty",
      addRentalType:"/api/additional/add-rental-type",
      addRentalSuitalibity:"/api/additional/add-rental-suitability",
      getRentalType:"/api/additional/get-rental-type",
      getRentalAmentyCategory:"/api/category/get-rental-amenty-category",
      getRentalAmenty:"/api/category/get-rental-amenty",
      getRentalSuitability:"/api/additional/get-rental-suitability",
      addRentalAmentyCategory:"/api/category/add-rental-amenty-category",


      // activity
      addActivityDuration:"/api/category/add-activity-duration",
      addActivityLanguage:"/api/category/add-activity-language",
      addActivityCategory:"/api/category/add-activity-category",
      addActivityCategoryLanguage:"/api/category/add-activity-category-language",
      getActivityDuration:"/api/category/get-activity-duration",
      getActivityLanguage:"/api/category/get-activity-language",
      getActivityDuratiopnCategory:"/api/category/get-activity-duration-category",
      getActivityCategoryLanguage:"/api/category/get-activity-language-category",
      getActivityCategory:"/api/category/get-activity-category",
      addActivityFacility:"/api/additional/add-activity-facility",
      getActivityFacility:"/api/additional/get-activity-facility",
      // room
      addRoom: "/api/additional/add-room",
      addRoomFacility: "/api/additional/add-room-facility",
      getRoom: "/api/additional/get-room",
      getRoomFacility: "/api/additional/get-room-facility",
    },
    reservation:{
       getHotelReservation:"/api/reservation/get-hotel-reservation",
       getTourReservation:"/api/reservation/get-tour-reservation",
       getCarReservation:"/api/reservation/get-car-reservation",
       getActivityReservation:"/api/reservation/get-activity-reservation",
       getRentalReservation:"/api/reservation/get-rental-reservation",
       getPackageReservation:"/api/reservation/get-package-reservation",
       updateReservationstatus:"/api/reservation/update-reservation-status",
    },
  },
};
const NO_AUTH_API_ENDPOINTS = ["/api/login"];

class Request {
  constructor() {
    this.baseURL = useRuntimeConfig().public.baseURL;
    this.accessToken = `Bearer ${useUserStore().userInfo.accessToken}`;
    this.headers = {};
    this.handleFetch = this.createHandleFetch();
  }

  createHandleFetch() {
    return {
      onRequest({ request, options }) {},
      onRequestError({ request, options, error }) {
        console.error("Request error: ", error.message);
      },
      onResponse({ request, response, options }) {},
      onResponseError({ request, response, options }) {
        useMessage().error(response._data?.message);
      },
    };
  }

  fetch(url, method, options) {
    if (this.accessToken) {
      this.headers = {
        "Content-type": "application/json",
        Authorization: this.accessToken,
      };
    } else {
      this.headers = {
        "Content-type": "application/json",
      };
    }

    return useFetch(url, {
      baseURL: this.baseURL,
      method: method,
      headers: this.headers,
      ...options,
      ...this.handleFetch,
    });
  }

  get(url, options) {
    return this.fetch(url, "GET", options);
  }
  post(url, options) {
    return this.fetch(url, "POST", options);
  }
  put(url, options) {
    return this.fetch(url, "PUT", options);
  }
  patch(url, options) {
    return this.fetch(url, "PATCH", options);
  }
  delete(url, options) {
    return this.fetch(url, "DELETE", options);
  }
}

class CustomerManager {
  constructor(request) {
    this.request = request;
  }

  // Auth
  async login(data) {
    return this.request.post(API_ENDPOINTS.customer.login, data);
  }

  // Reservation
  async getReserHotelDetail(data) {
    return this.request.get(API_ENDPOINTS.customer.reserHotelDetail, data);
  }
  async createPaymentHotel(data) {
    return this.request.post(API_ENDPOINTS.customer.reserHotel, data);
  }
}

class CMSManager {
  constructor(request) {
    this.request = request;
  }

  // Auth
  async login(data) {
    return this.request.post(API_ENDPOINTS.cms.login, data);
  }

  // User
  async getUserById(data) {
    return this.request.get(API_ENDPOINTS.cms.userByID, data);
  }
  async getUserByType(data) {
    return this.request.get(API_ENDPOINTS.cms.userByType, data);
  }
  async getUserAll(data) {
    return this.request.get(API_ENDPOINTS.cms.userAll, data);
  }
  async userCheckMail(data) {
    return this.request.get(API_ENDPOINTS.cms.userCheckEmail, data);
  }
  async createUser(data) {
    return this.request.post(API_ENDPOINTS.cms.sign, data);
  }
  async updateUser(data) {
    return this.request.post(API_ENDPOINTS.cms.user, data);
  }
  async deleteUser(data) {
    return this.request.delete(API_ENDPOINTS.cms.userDelete, data);
  }

  // Category
  async getCategoryStar(data) {
    return this.request.get(API_ENDPOINTS.cms.categoryStar, data);
  }
  async getCategoryTour(data) {
    return this.request.get(API_ENDPOINTS.cms.categoryTour, data);
  }
  async getCategoryCar(data) {
    return this.request.get(API_ENDPOINTS.cms.categoryCar, data);
  }
  async getCategoryActivity(data) {
    return this.request.get(API_ENDPOINTS.cms.categoryActivity, data);
  }
  async getCategoryActivityDuration(data) {
    return this.request.get(API_ENDPOINTS.cms.categoryActivityDuration, data);
  }
  async getCategoryActivityLanguage(data) {
    return this.request.get(API_ENDPOINTS.cms.categoryActivityLanguage, data);
  }

  // Story
  async getStory(data) {
    return this.request.get(API_ENDPOINTS.cms.story, data);
  }
  async createStory(data) {
    return this.request.post(API_ENDPOINTS.cms.addStory, data);
  }

  // Services
  async getServicesAll(data) {
    return this.request.get(API_ENDPOINTS.cms.allServices, data);
  }
  async getServicesByType(data) {
    console.log(21323123)
    return this.request.get(`${API_ENDPOINTS.cms.getServiceDetail}?service_id=${data.service_id}&service_type=${data.service_type}`);
  }
  async getGalleryServices(data) {
    return this.request.get(API_ENDPOINTS.cms.typeServices, data);
  }
  async createServices(data) {
    return this.request.post(API_ENDPOINTS.cms.addServices, data);
  }
  async updateServices(data) {
    return this.request.put(API_ENDPOINTS.cms.editServices, data);
  }
  async updateGallery(data) {
    return this.request.put(API_ENDPOINTS.cms.editGalleryServices, data);
  }
  async deleteServices(data) {
    return this.request.delete(API_ENDPOINTS.cms.deleteServices, data);
  }
  async getSVHotel(data) {
    return this.request.get(API_ENDPOINTS.cms.svGetHotel, data);
  }
  async getSVCar(data) {
    return this.request.get(API_ENDPOINTS.cms.svGetCar, data);
  }
  async getSVTour(data) {
    return this.request.get(API_ENDPOINTS.cms.svGetTour, data);
  }
  async getSVActivity(data) {
    return this.request.get(API_ENDPOINTS.cms.svGetActivity, data);
  }
  async getSVRental(data) {
    return this.request.get(API_ENDPOINTS.cms.svGetRental, data);
  }
  async getSVPackage(data) {
    return this.request.get(API_ENDPOINTS.cms.svGetPackage, data);
  }
  async getSVRoomDetail(data) {
    return this.request.get(API_ENDPOINTS.cms.svGetRoomDetail, data);
  }
  async createSVHotel(data) {
    return this.request.post(API_ENDPOINTS.cms.svAddHotel, data);
  }
  async createSVCar(data) {
    return this.request.post(API_ENDPOINTS.cms.svAddCar, data);
  }
  async createSVTour(data) {
    return this.request.post(API_ENDPOINTS.cms.svAddTour, data);
  }
  async createSVActivity(data) {
    return this.request.post(API_ENDPOINTS.cms.svAddActivity, data);
  }
  async createSVRental(data) {
    return this.request.post(API_ENDPOINTS.cms.svAddRental, data);
  }

  // Hotel
  async getHotel(data) {
    return this.request.get(API_ENDPOINTS.cms.hotel, data);
  }
  async getHotelRule(data) {
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getHotelRule}?hotelId=${data}`
    );
  }
  async getHotelTheme(data) {
    return this.request.get(API_ENDPOINTS.cms.hotelTheme, data);
  }
  async getHotelFacility(data) {
    return this.request.get(API_ENDPOINTS.cms.hotelFacility, data);
  }
  async getHotelFacilityData(data) {
    return this.request.get(
      `${API_ENDPOINTS.cms.children.gethotelFacility}?hotelId=${data}`
    );
  }
  async getStarCategory() {
    return this.request.get(API_ENDPOINTS.cms.children.getCategoryStar);
  }

  //tour
  async getTourCategory(data) {
    return this.request.get(API_ENDPOINTS.cms.children.getTourCategory, data);
  }
  async getTourLanguageCategory(data) {
    return this.request.get(
      API_ENDPOINTS.cms.children.getTourLanguageCategory,
      data
    );
  }
  async getTourDurationCategory(data) {
    return this.request.get(
      API_ENDPOINTS.cms.children.getTourDurationCategory,
      data
    );
  }
  async getTourBulkdiscount(data){
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getTourBulkdiscount}?tourId=${data}`
    );
  }
  async getTourFacility(data){
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getTourFacility}?tourId=${data}`
    );
  }
  async getTourLanguage(data){
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getTourLanguage}?tourId=${data}`
    );
  }
  async getTourDuration(data){
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getTourDuration}?tourId=${data}`
    );
  }

  //car
  async getCarFeature(data) {
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getCarFeature}?carId=${data}`
    );
  }
  async getCarCategory(data) {
    return this.request.get(API_ENDPOINTS.cms.children.getCarCategory, data);
  }
  async getCarBrand(data){
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getCarBrand}?carId=${data}`
    )
  }
  // rental
  async getRentalSuitability(data) {
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getRentalSuitability}?rentalId=${data}`
    );
  }
  async getRentalAmenty(data) {
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getRentalAmenty}?rentalId=${data}`
    );
  }
  async getRentalAmentyCategory(data) {
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getRentalAmentyCategory}?rentalId=${data}`
    );
  }
  async getRentalType(data){
     return this.request.get(`${API_ENDPOINTS.cms.children.getRentalType}?rentalId=${data}`)
  }
  // activity
  async getActivityDuration(data){
    return this.request.get(`${API_ENDPOINTS.cms.children.getActivityDuration}?activityId=${data}`)
  }
  async getActivityLanguage(data){
    return this.request.get(`${API_ENDPOINTS.cms.children.getActivityLanguage}?activityId=${data}`)
  }
  async getActivityCategory(){
    return this.request.get(API_ENDPOINTS.cms.children.getActivityCategory)
  }
  async getActivityDuratiopnCategory(data){
    return this.request.get(API_ENDPOINTS.cms.children.getActivityDuratiopnCategory)
  }
  async getActivityCategoryLanguage(data){
     return this.request.get(API_ENDPOINTS.cms.children.getActivityCategoryLanguage)
  }
  async getActivityFacility(data){
    return this.request.get(`${API_ENDPOINTS.cms.children.getActivityFacility}?activityId=${data}`)
  }
  //room
  async getRoom(data) {
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getRoom}?hotelId=${data}`
    );
  }
  async getRoomFacility(data) {
    return this.request.get(
      `${API_ENDPOINTS.cms.children.getRoomFacility}?roomId=${data}`
    );
  }

  // Additional
  async getAdditionalContact(data) {
    return this.request.get(API_ENDPOINTS.cms.additional, data);
  }
  async getAdditionalRoom(data) {
    return this.request.get(API_ENDPOINTS.cms.additionalGetRoom, data);
  }
  async createAdditionalContact(data) {
    return this.request.post(API_ENDPOINTS.cms.additionalAdd, data);
  }
  async createAdditionalRoom(data) {
    return this.request.post(API_ENDPOINTS.cms.additionalRoom, data);
  }
  async createAdditionalAsk(data) {
    return this.request.post(API_ENDPOINTS.cms.additionalAsk, data);
  }
  async deleteContact(data) {
    return this.request.delete(
      `${API_ENDPOINTS.cms.additionalDeleteContact}?id=${data.id}`,
      data
    );
  }

  // Ask question
  async createAskQuestion(data) {
    return this.request.post(API_ENDPOINTS.cms.askQuestion, data);
  }

  
  // Reservastion
  async getHotelReservation(){
     return this.request.get(API_ENDPOINTS.cms.reservation.getHotelReservation);
  }
  async getTourReservation(){
    return this.request.get(API_ENDPOINTS.cms.reservation.getTourReservation);
 }
  async getCarReservation(){
    return this.request.get(API_ENDPOINTS.cms.reservation.getCarReservation);
  }
  async getActivityReservation(){
    return this.request.get(API_ENDPOINTS.cms.reservation.getActivityReservation);
  }
  async getRentalReservation(){
    return this.request.get(API_ENDPOINTS.cms.reservation.getRentalReservation);
  }
  async getPackageReservation(){
    return this.request.get(API_ENDPOINTS.cms.reservation.getPackageReservation); 
  }
}

class RestAPI {
  constructor() {
    this.request = new Request();
    this.customer = new CustomerManager(this.request);
    this.cms = new CMSManager(this.request);
    this.API_ENDPOINTEXPORT = API_ENDPOINTS;
  }
}

export default () => ({ restAPI: new RestAPI() });
