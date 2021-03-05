import { reactive } from "vue";

const store = {
  state: reactive({
    token: sessionStorage.getItem('token'),
    phone: sessionStorage.getItem('phone'),
    isApplied: sessionStorage.getItem('isApplied') ? true : false,
  }),
  setToken(token: string, validateTime?: number) {
    this.state.token = token;
    sessionStorage.setItem("token", token);

    validateTime &&
      setTimeout(() => {
        this.setToken("");
        sessionStorage.removeItem("token");
      }, validateTime);
  },
  getToken() {
    return this.state.token;
  },
  setPhone(phone: string) {
    this.state.phone = phone
    sessionStorage.setItem("phone", phone);
  },
  setIsApplied(isApplied: boolean) {
    this.state.isApplied = isApplied
    sessionStorage.setItem('isApplied', isApplied + '')
  }
};

export default store;
