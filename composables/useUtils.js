import dayjs from "dayjs";

export function useUserLogin(userInfo) {
  const userStore = useUserStore();
  userStore.setUserInfo(userInfo);

  return navigateTo("/cms");
}

export function useUserLogout() {
  const userStore = useUserStore();

  userStore.logOut();
  return navigateTo("/login");
}

export function useFormatNumberVN(number) {
  let newNumber = number;

  if (!newNumber) return 0;
  if (typeof newNumber === "string") newNumber = parseInt(newNumber);
  return newNumber.toLocaleString("en-US").replaceAll(",", ".");
}

export function useFormatTime(date, format = "DD/MM/YYYY HH:mm:ss") {
  if (!date) return;
  return dayjs(date).format(format);
}

export function useObjectToFormData(obj) {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(obj[key])) {
      const files = obj[key];
      Array.from(files).forEach((file) => {
        if (file.file) formData.append(key, file.file);
        else formData.append(key, file);
        console.log(file);
      });
    } else formData.append(key, value);
  });

  return formData;
}
