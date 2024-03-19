<script setup lang="jsx">
import {
  NDropdown,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NSpace,
} from "naive-ui";
import MyIcon from "~/components/MyIcon.vue";
import MyLink from "~/components/MyLink";

const userStore = useUserStore();
const route = useRoute();

const collapsed = ref(false);

const activeMenuKey = computed(() => {
  let menu;
  for (const item of menuOptions) {
    if (route.path.includes(item.key)) {
      menu = item;
      if (menu.children) {
        menu = menu.children.find((m) => route.path.includes(m.key));
      }
    }
  }

  return menu;
});
const menuOptions = [
  {
    key: "/cms",
    heading: "Dashboard",
    label: renderLabel("Dashboard", "/cms"),
    icon: renderIcon("ant-design:dashboard-filled"),
  },
  {
    key: "/cms/services",
    heading: "Services",
    label: renderLabel("Services", "/cms/services"),
    icon: renderIcon("carbon:ibm-cloud-internet-services"),
  },
  {
    key: "/cms/service-children",
    heading: "Services Children",
    label: renderLabel("Services Children"),
    icon: renderIcon("oui:index-mapping"),
    children: [
      {
        key: "/cms/service-children/hotel",
        heading: "Hotel",
        label: renderLabel("Hotel", "/cms/children/hotel"),
        icon: renderIcon("ep:magic-stick"),
      },
      {
        key: "/cms/service-children/rental",
        heading: "Rental",
        label: renderLabel("Rental", "/cms/children/rental"),
        icon: renderIcon("ep:magic-stick"),
      },
      {
        key: "/cms/service-children/car",
        heading: "Car",
        label: renderLabel("Car", "/cms/children/car"),
        icon: renderIcon("ep:magic-stick"),
      },
      {
        key: "/cms/service-children/tour",
        heading: "Tour",
        label: renderLabel("Tour", "/cms/children/tour"),
        icon: renderIcon("ep:magic-stick"),
      },
      {
        key: "/cms/service-children/activity",
        heading: "Activity",
        label: renderLabel("Activity", "/cms/children/activity"),
        icon: renderIcon("ep:magic-stick"),
      },
      {
        key: "/cms/service-children/room",
        heading: "Room",
        label: renderLabel("Activity", "/cms/children/room"),
        icon: renderIcon("ep:magic-stick"),
      },
    ],
  },
  // {
  //   key: "/cms/category",
  //   heading: "Category",
  //   label: renderLabel("Category"),
  //   icon: renderIcon("iconamoon:3d"),
  //   children: [
  //     {
  //       key: "/cms/category/hotel",
  //       heading: "Hotel",
  //       label: renderLabel("Hotel", "/cms/category/hotel"),
  //       icon: renderIcon("ep:magic-stick"),
  //     },
  //     {
  //       key: "/cms/category/rental",
  //       heading: "Rental",
  //       label: renderLabel("Rental", "/cms/category/rental"),
  //       icon: renderIcon("ep:magic-stick"),
  //     },
  //     {
  //       key: "/cms/category/car",
  //       heading: "Car",
  //       label: renderLabel("Car", "/cms/category/car"),
  //       icon: renderIcon("ep:magic-stick"),
  //     },
  //     {
  //       key: "/cms/category/tour",
  //       heading: "Tour",
  //       label: renderLabel("Tour", "/cms/category/tour"),
  //       icon: renderIcon("ep:magic-stick"),
  //     },
  //     {
  //       key: "/cms/category/activity",
  //       heading: "Activity",
  //       label: renderLabel("Activity", "/cms/category/activity"),
  //       icon: renderIcon("ep:magic-stick"),
  //     },
  //   ],
  // },
  {
    key: "/cms/story",
    heading: "Story",
    label: renderLabel("Story", "/cms/story"),
    icon: renderIcon("material-symbols-light:menu-book-outline"),
  },
  {
    key: "/cms/additional",
    heading: "Additional",
    label: renderLabel("Additional", "/cms/additional"),
    icon: renderIcon("pajamas:file-addition"),
  },
  {
    key: "/cms/other",
    heading: "Other",
    label: renderLabel("Other", "/cms/other"),
    icon: renderIcon("material-symbols-light:other-admission-outline-sharp"),
  },
  {
    key: "/cms/user",
    heading: "User",
    label: renderLabel("User", "/cms/user"),
    icon: renderIcon("material-symbols:manage-accounts-rounded"),
  },
  // {
  //   key: "/cms/group",
  //   heading: "Group",
  //   label: "Group",
  //   icon: renderIcon("ic:twotone-pie-chart-outline"),
  //   children: [
  //     {
  //       key: "/cms/user",
  //       heading: "User",
  //       label: renderLabel("User", "/cms/user"),
  //       icon: renderIcon("ic:twotone-pie-chart-outline"),
  //     },
  //   ],
  // },
];
const userOptions = [
  {
    label: () => (
      <button
        onClick={() => navigateTo("/change-pass")}
        class="bg-transparent hover:bg-transparent"
      >
        <div class="flex items-center">
          <Icon name="" size={16} />
          <span class="ml-1"> Đổi mật khẩu</span>
        </div>
      </button>
    ),
    key: "changPass",
  },
  {
    label: () => (
      <button
        onClick={handleLogout}
        class="text-red-500 bg-transparent hover:bg-transparent"
      >
        <div class="flex items-center">
          <span class="ml-1 "> Đăng xuất</span>
        </div>
      </button>
    ),
    key: "logout",
  },
];

const breadcrumb = computed(() => {
  let br = [];
  if (route.path === "/cms") {
    br = [menuOptions[0]];
  } else {
    br = [
      menuOptions.find(
        (item) => route.path.includes(item.key) && item.key !== "/cms"
      ),
    ];
  }

  if (br[0]?.children) {
    const index = br[0].children.findIndex((b) => route.path.includes(b.key));
    br.push(br[0].children[index]);
  }
  return br;
});

const handleLogout = () => {
  useUserLogout();
};

const handleWindowResize = () => {
  if (window.innerWidth < 1024) collapsed.value = true;
  else collapsed.value = false;
};

onMounted(() => {
  window.addEventListener("resize", handleWindowResize);
  handleWindowResize();
});

function renderLabel(title, link) {
  return () => h(MyLink, { to: link }, { default: () => title });
}
function renderIcon(icon) {
  return () => <MyIcon name={icon} class="text-2xl" />;
}
</script>

<template>
  <NSpace vertical class="!min-h-screen">
    <NLayoutHeader>
      <div
        class="!hidden lg:!flex h-20 px-6 flex justify-between items-center border-b bg-black"
      >
        <NuxtLink href="/cms">
          <img
            src="/images/logo.svg"
            alt="logo"
            class="w-full h-full text-black"
          />
        </NuxtLink>
        <NDropdown
          :options="userOptions"
          :show-arrow="true"
          width="160px"
          class="!py-2 flex flex-col gap-y-1"
        >
          <div class="flex items-center gap-2">
            <img
              src="/images/no-image.png"
              alt="avatar"
              class="w-10 h-10 rounded-full"
            />
            <div class="font-bold text-white">
              <h4>{{ userStore.userInfo.name }}</h4>
              <span>{{ userStore.userInfo.email }}</span>
            </div>
          </div>
        </NDropdown>
      </div>

      <!-- Header mobile, tablet -->
      <div
        class="lg:hidden h-16 px-5 flex justify-between items-center bg-gradient-to-r from-[#001529] to-purple-900"
      >
        <NuxtLink href="/">
          <img
            src="/images/logo.svg"
            alt="logo"
            class="w-full h-full text-black"
          />
        </NuxtLink>

        <NDropdown
          :options="userOptions"
          :show-arrow="true"
          placement="bottom-start"
          width="140px"
        >
          <img
            src="/images/no-image.png"
            alt="avatar"
            class="w-8 h-8 rounded-full object-cover"
          />
        </NDropdown>
      </div>
    </NLayoutHeader>

    <NLayout has-sider class="h-[calc(100vh-90px)]">
      <NLayoutSider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        class="h-full"
      >
        <NMenu
          :default-value="activeMenuKey?.key"
          :key="activeMenuKey?.key"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          class="font-500"
        />
      </NLayoutSider>
      <NLayout class="mx-6 mb-16">
        <h1
          class="text-lg font-semibold"
          :class="{ 'text-gray-5': breadcrumb.length > 1 }"
        >
          {{ breadcrumb?.[0]?.heading }}
          <span v-if="breadcrumb.length > 1">
            <span class="mx-6px">></span>
            <span class="text-black">{{ breadcrumb?.[1]?.heading }}</span>
          </span>
        </h1>
        <slot />
      </NLayout>
    </NLayout>
  </NSpace>
</template>

<style>
html,
body {
  font-family: "Segoe UI", sans-serif;
}

.n-menu-item-content-header {
  font-weight: 700;
}

.n-breadcrumb-item__link {
  padding: 0 !important;
}
</style>
