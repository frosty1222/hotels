<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const settings = ref({
  routers: [
    {
      path: "/",
      name: t("common.home"),
      route: "home",
    },
    {
      path: "/hotel",
      name: t("common.hotel"),
      route: "hotel",
      childrens: [
        {
          path: "/hotel/hotel-search-halfmap",
          name: "Search Halfmap",
        },
        {
          path: "/hotel/search-popup-map",
          name: "Search Popup Map",
        },
        {
          path: "/hotel/1",
          name: "Detail Hotel",
        },
        {
          path: "/hotel/room/1",
          name: "Detail Room",
        },
      ],
    },
    {
      path: "/tour",
      name: t("common.tour"),
      route: "tour",
      childrens: [
        {
          path: "/tour/tour-search-halfmap",
          name: "Search Halfmap",
        },
        {
          path: "/tour/tour-search-sidebar",
          name: "Search Sidebar",
        },
        {
          path: "/tour/1",
          name: "Detail Tour",
        },
      ],
    },
    {
      path: "/activity",
      name: t("common.activity"),
      route: "activity",
      childrens: [
        {
          path: "/activity/activity-search-halfmap",
          name: "Search Halfmap",
        },
        {
          path: "/activity/activity-search-sidebar",
          name: "Search Sidebar",
        },
        {
          path: "/activity/1",
          name: "Detail Activity",
        },
      ],
    },
    {
      path: "/rental",
      name: t("common.rental"),
      route: "rental",
      childrens: [
        {
          path: "/rental/rental-search-halfmap",
          name: "Search Halfmap",
        },
        {
          path: "/rental/rental-popup-map",
          name: "Search Sidebar",
        },
        {
          path: "/rental/1",
          name: "Detail Rental",
        },
      ],
    },
    {
      path: "/car",
      name: t("common.car"),
      route: "car",
      childrens: [
        {
          path: "/car/car-search-halfmap",
          name: "Search Halfmap",
        },
        {
          path: "/car/car-search-sidebar",
          name: "Search Sidebar",
        },
        {
          path: "/car/1",
          name: "Car Detail",
        },
      ],
    },
    {
      path: "/pages",
      name: "pages",
      route: "car",
      childrens: [
        {
          path: "/car/car-search-halfmap",
          name: "Search Halfmap",
        },
        {
          path: "/car/car-search-sidebar",
          name: "Search Sidebar",
        },
        {
          path: "/car/1",
          name: "Car Detail",
        },
      ],
    },
  ],
  showLang: false,
  showMenuMobile: false,
});

watch(locale, (newValue, oldValue) => {
  useHead({ title: t("common.home") });
  settings.value.routers.forEach((route) => {
    route.name = t(`common.${route.route}`);
  });
});

const languageDropdown = ref<HTMLElement | null>(null);
const stMainMenu = ref<HTMLElement | null>(null);
const btnShowMenuMobile = ref<HTMLElement | null>(null);

const showOptionLang = (): void => {
  settings.value.showLang = !settings.value.showLang;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    languageDropdown.value &&
    !languageDropdown.value.contains(event.target as Node)
  ) {
    if (settings.value.showLang) {
      settings.value.showLang = false;
    }
  }
};

const handleClickOutsideMenuMobile = (event: MouseEvent) => {
  if (
    stMainMenu.value &&
    btnShowMenuMobile.value &&
    !btnShowMenuMobile.value.contains(event.target as Node) &&
    !stMainMenu.value.contains(event.target as Node)
  ) {
    if (settings.value.showMenuMobile) {
      settings.value.showMenuMobile = false;
    }
  }
};

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const uroute = useRoute();
const activeMenu = (routeMenu: string) => {
  const pathElements = routeMenu.split("/");
  const activityElement = pathElements[1];
  return `/${activityElement}`;
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("click", handleClickOutsideMenuMobile);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("click", handleClickOutsideMenuMobile);
});
</script>
<template>
  <header
    class="header bg-[rgba(35,35,35,.6)] text-white flex items-center justify-between px-[40px]"
  >
    <div class="header__left flex items-center justify-center">
      <button
        ref="btnShowMenuMobile"
        aria-controls="navbar-default"
        aria-expanded="false"
        class="menu-toggle inline-flex items-center justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        data-collapse-toggle="navbar-default"
        type="button"
        @click="settings.showMenuMobile = !settings.showMenuMobile"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 17 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1h15M1 7h15M1 13h15"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
      <nuxt-link class="logo lg:block hidden" to="/">
        <img alt="logo" class="logo-main" src="/images/logo.svg" />
      </nuxt-link>
      <nuxt-link class="logo lg:hidden block" to="/">
        <img alt="logo" src="/images/logo-sm.svg" />
      </nuxt-link>
    </div>
    <div class="header__center">
      <nav
        id="st-main-menu"
        ref="stMainMenu"
        :class="{ open: settings.showMenuMobile }"
      >
        <a class="back-menu" href="#" @click="settings.showMenuMobile = false">
          <span class="stt-icon stt-icon-arrow-left">
            <font-awesome-icon :icon="['fas', 'angle-left']" />
          </span>
        </a>
        <ul
          id="main-menu"
          class="menu main-menu font-dmsans dropdown-mobile z-50"
        >
          <template v-for="route in settings.routers" :key="route.name">
            <li
              :class="{
                'menu-item-has-children':
                  route?.childrens && route?.childrens.length > 0,
              }"
              @click="route.isShow = !route.isShow"
            >
              <a
                :class="{ active: activeMenu(uroute.fullPath) == route.path }"
                href="#"
              >
                {{ route.name }}
                <template
                  v-if="route?.childrens && route?.childrens.length > 0"
                >
                  <font-awesome-icon
                    :icon="['fas', 'angle-down']"
                    class="text-[13px] ml-1"
                  />
                </template>
              </a>
              <ul
                v-if="route?.childrens && route?.childrens.length > 0"
                :class="{ 'show-dropdown-mobile': route.isShow }"
                class="menu-dropdown z-50"
              >
                <template v-for="item in route?.childrens" :key="item.name">
                  <li @click="item.isShow = !item.isShow">
                    <nuxt-link :to="item.path">
                      {{ item.name }}
                    </nuxt-link>
                  </li>
                </template>
              </ul>
            </li>
          </template>
        </ul>
      </nav>
    </div>
    <div class="header__right">
      <ul id="lang" class="items flex items-center flex-wrap font-dmsans">
        <li class="dropdown dropdown-currency">
          <div
            ref="languageDropdown"
            class="cursor-pointer"
            @click="showOptionLang"
          >
            <a class="text-white font-bold font-dmsans" href="#">{{
              locale.toUpperCase()
            }}</a>
            <font-awesome-icon
              :icon="['fas', 'angle-down']"
              class="text-[13px] ml-[6px]"
            />
          </div>
          <ul
            :class="{ show: settings.showLang }"
            class="menu-dropdown font-dmsans"
          >
            <li v-for="locale in availableLocales" :key="locale.code">
              <NuxtLink :to="switchLocalePath(locale.code)">{{
                locale.name
              }}</NuxtLink>
            </li>
          </ul>
        </li>
        <li class="dropdown dropdown-minicart ml-[20px]">
          <button class="bg-white lg:w-[44px] lg:h-[44px] rounded-full">
            <font-awesome-icon
              :icon="['fas', 'suitcase-rolling']"
              class="text-gray-700 lg:text-base text-xl"
            />
          </button>
        </li>
        <li class="dropdown dropdown-user-dashboard ml-[20px]">
          <button class="bg-white lg:w-[44px] lg:h-[44px] rounded-full">
            <font-awesome-icon
              :icon="['fas', 'user']"
              class="text-gray-700 lg:text-base text-xl"
            />
          </button>
        </li>
        <li class="ml-[20px]">
          <button
            class="bg-[#3b71fe] text-base px-3.5 h-[44px] rounded-full btn-bah font-dmsans"
          >
            {{ $t("common.beComeHost") }}
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>
<style lang="scss">
$color_1: #fff;
$color_2: rgba(59, 113, 254, 0.9);
$color_3: #1a2b48;
$color_4: var(--link-color);
$color_5: gray;
$color_6: var(--heading-color);
$color_7: var(--link-color-hover);

header.header {
  color: $color_1;
  z-index: 12;
  position: absolute;
  width: 100%;
  border-bottom: none;
  background: rgba(35, 35, 35, 0.6);

  .active {
    color: #3b71fe !important;
  }

  #main-menu {
    > li {
      ul {
        li {
          a {
            color: $color_3;
          }
        }
      }
    }
  }
}

.header__left {
  .menu-toggle {
    display: none;
  }

  @media screen and (max-width: 991px) {
    .menu-toggle {
      display: block;
    }
  }
}

.header__center {
  #st-main-menu {
    .back-menu {
      display: none;
    }

    .main-menu {
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
      position: relative;

      > li {
        display: inline-block;

        > a {
          display: block;
          padding: 35px 30px;
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
        }
      }

      li.menu-item-has-children {
        position: relative;

        .menu-dropdown {
          list-style: none;
          position: absolute;
          left: 0;
          top: 120%;
          padding-left: 0;
          margin-bottom: 0;
          min-width: 230px;
          padding-top: 10px;
          padding-bottom: 10px;
          background: #fff;
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease-in-out;
          border: 1px solid #dedede;
          box-sizing: border-box;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08),
            0 4px 12px rgba(0, 0, 0, 0.05);
          border-radius: 10px;

          li {
            a {
              padding: 15px 0;
              display: block;
              font-weight: 500;
              font-size: 16px;
              line-height: 26px;
            }

            padding-left: 30px;
            padding-right: 30px;
          }
        }
      }

      li {
        &:hover {
          > .menu-dropdown {
            top: 100%;
            opacity: 1;
            visibility: visible;
            top: 100%;
            opacity: 1;
            visibility: visible;
          }
        }
      }

      a {
        &:hover {
          color: $color_2;
        }
      }
    }
  }
}

.header__right {
  ul {
    .btn-bah {
      &:hover {
        filter: brightness(115%);
        transition: 0.3s;
      }
    }
  }

  #lang {
    li.dropdown-currency {
      position: relative;

      .menu-dropdown {
        list-style: none;
        position: absolute;
        left: 0;
        top: 120%;
        padding-left: 0;
        margin-bottom: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        background: #fff;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease-in-out;
        border: 1px solid #dedede;
        box-sizing: border-box;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08),
          0 4px 12px rgba(0, 0, 0, 0.05);
        border-radius: 10px;

        li {
          padding-left: 30px;
          padding-right: 30px;
          cursor: pointer;
          color: $color_4;
          font-weight: 500;
          font-size: 16px;
          line-height: 26px;

          &:hover {
            color: $color_2;
          }
        }
      }
    }

    li {
      > .menu-dropdown.show {
        top: 100%;
        opacity: 1;
        visibility: visible;
      }

      .menu-dropdown {
        inset: 0px auto auto 0px;
        margin: 0px;
        transform: translate(0px, 32px);
        min-width: 160px;
      }
    }
  }
}

.header {
  .header__left {
    .logo {
      .logo-sm {
        img {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 1399px) {
  .header__center {
    #st-main-menu {
      .main-menu {
        > li {
          > a {
            padding: 35px 24px 35px 10px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .header__right {
    .items {
      li {
        > .btn-bah {
          display: none !important;
        }
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .header {
    padding: 18px;
    position: relative !important;
  }
  .header__left {
    display: flex;
    align-items: center;

    .menu-toggle {
      display: block;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .logo {
      margin-left: 60px;

      img {
        width: 94px;
        object-fit: cover;
      }
    }
  }
  @media screen and (max-width: 991px) {
    .header__center {
      #st-main-menu {
        li {
          a {
            color: #232323;
          }
        }

        .main-menu {
          > li {
            display: inline-block;
            width: 100%;
            margin: 0;
            text-transform: uppercase;

            &.menu-item-has-children {
              > .menu-dropdown {
                width: 100%;
                position: relative !important;
                padding: 3px 10px;
                background: 0 0;
                border: none;
                list-style: none;
                position: absolute;
                left: 0;
                top: 100%;
                padding-left: 0;
                margin-bottom: 0;
                min-width: 100%;
                width: 100%;
                padding-top: 5px;
                padding-bottom: 5px;
                background: #fff;
                box-shadow: 0 1px 1px #dbdbdb;
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s ease-in-out;
                display: none;
                position: static !important;
                opacity: 1 !important;
                visibility: visible !important;
                box-shadow: none !important;

                &.show-dropdown-mobile {
                  display: block !important;
                }
              }
            }
          }
        }

        .menu {
          &.main-menu {
            padding: 0 20px;
          }
        }

        #main-menu {
          li:not(:last-child) a {
            border-bottom: 1px solid #eee;
          }

          li {
            &.menu-item-has-children {
              > a {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
  .header__center {
    #st-main-menu {
      position: fixed;
      left: -150%;
      top: 0;
      background: #fff;
      max-width: 320px;
      height: 100%;
      overflow: auto;
      z-index: 99;
      transition: all 0.3s;

      .back-menu {
        background: #f5f5f5;
        width: 100%;
        padding: 9px 20px;
        font-size: 22px;
        display: block;
        cursor: pointer;
        color: $color_5;

        .stt-icon {
          font-size: 14px;
        }
      }

      .menu.main-menu {
        padding: 0 20px;

        li {
          &:last-child {
            a {
              border-bottom: 1px solid #eee;
            }
          }
        }

        li.menu-item-has-children {
          .menu-dropdown {
            li.menu-item-has-children {
              .fa {
                right: 2px;
                transform: rotate(0deg);
              }
            }
          }
        }

        li.menu-item-has-children.menu-item-mega-parent {
          .menu-dropdown {
            li {
              a {
                border-bottom: 1px solid #eee !important;
              }
            }
          }
        }

        > li {
          &:first-child {
            margin-top: 0;
          }

          > a {
            padding: 17px 0 15px;
          }

          .menu-dropdown {
            display: none;
          }
        }

        > li.menu-item-mega-parent {
          > .menu-dropdown {
            width: 100%;
            position: relative !important;
            padding: 10px;
            background: 0 0;
            border: none;

            > li {
              width: 100%;
              max-width: 100%;
              padding: 0;

              a {
                margin: 0;
                padding: 15px 0;
                font-size: 15px;
                display: block;
                font-weight: 500 !important;
                font-size: 16px !important;
                line-height: 26px !important;
                color: $color_6 !important;
              }

              .menu-dropdown {
                padding: 0 10px 10px;

                li {
                  a {
                    margin: 0;
                    padding: 5px 0;
                  }
                }
              }
            }
          }
        }

        > li.menu-item-has-children {
          > .menu-dropdown {
            width: 100%;
            position: relative !important;
            padding: 3px 10px;
            background: 0 0;
            border: none;

            > li {
              width: 100%;
              max-width: 100%;
              padding: 0;

              a {
                padding: 12px 0;
              }

              .menu-dropdown {
                padding: 0 10px 10px;
                width: 100%;
                position: relative !important;
                background: 0 0;
                border: none;
                left: 0;

                li {
                  width: 100%;
                  max-width: 100%;
                  padding: 0;

                  a {
                    padding: 12px 0;
                  }
                }
              }
            }
          }
        }
      }
    }

    #st-main-menu.open {
      left: 0;
    }

    .overlay {
      position: fixed;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 9;
      top: 0;
      left: 0;
      display: none;
    }
  }
  .header__right {
    .dropdown-currency {
      display: none;
    }

    .dropdown-minicart {
      .mini-cart.dropdown-toggle {
        box-shadow: none !important;
        border: none !important;
        width: auto !important;
        height: auto !important;

        .stt-icon {
          font-size: 23px !important;
        }
      }
    }

    .dropdown-user-dashboard {
      .dropdown-toggle {
        width: auto !important;
        height: auto !important;
        background: 0 0 !important;
        box-shadow: none !important;
        border: none !important;

        .stt-icon {
          font-size: 23px !important;
        }
      }
    }
  }
  body.admin-bar {
    .header__center {
      #st-main-menu {
        top: 32px;
      }
    }
  }
  header.header {
    padding-top: 18px;
    padding-bottom: 18px;
    background: #fff;
  }
}

@media screen and (max-width: 782px) {
  body.admin-bar {
    .header__center {
      #st-main-menu {
        top: 46px;
      }
    }
  }
  .header__left {
    .logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-left: 0;
    }
  }
}

@media screen and (min-width: 992px) {
  .stt-menu-transparent {
    header.header {
      color: $color_1;
      z-index: 12;
      position: absolute;
      width: 100%;
      border-bottom: none;
      background: rgba(35, 35, 35, 0.6);
    }
  }
  header.header {
    @media screen and (max-width: 991px) {
      #main-menu li:not(:last-child) a {
        border-bottom: 1px solid #eee;
      }
    }

    #main-menu {
      > li {
        a {
          color: $color_1;

          .fa {
            color: $color_1;
          }
        }

        ul {
          li {
            a {
              color: $color_4;

              .fa {
                color: $color_4;
              }

              &:hover {
                color: $color_7;
              }
            }
          }
        }
      }
    }

    .header__right {
      ul {
        li {
          a.dropdown-toggle {
            color: $color_1;

            .fa {
              &:not(.input-icon) {
                color: $color_1;
              }
            }
          }
        }
      }
    }
  }
  .search-result-page {
    .banner {
      padding-top: 151px;
      padding-bottom: 60px;

      .st-banner-search-form {
        z-index: 2;
        position: relative;
      }
    }
  }
}
</style>
