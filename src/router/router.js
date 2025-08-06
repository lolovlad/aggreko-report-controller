import {
    createRouter,
    createWebHistory
} from "vue-router"
import {auth as $store} from "@/store/auth.model";
import AdminMainPage from "@/pages/AdminPage/AdminMainPage.vue";
import YandexAcceptPage from "@/pages/YandexAcceptPage.vue";
import ProfilePage from "@/pages/AllPage/ProfilePage/ProfilePage.vue";
import EditAccountPage from "@/pages/AllPage/ProfilePage/EditAccountPage.vue";
import EditSignaturePage from "@/pages/AllPage/ProfilePage/EditSignaturePage.vue";
import ViewAccountPage from "@/pages/AllPage/ProfilePage/ViewAccountPage.vue";
import UserMainPage from "@/pages/UserPage/UserMainPage.vue";
import BasePage from "@/pages/UserPage/ClaimPage/BasePage.vue";
import ClaimViewPage from "@/pages/UserPage/ClaimPage/ClaimViewPage.vue";
import EditClaimPage from "@/pages/UserPage/ClaimPage/EditClaimPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import AdminUserPage from "@/pages/AdminPage/UsersPage/AdminUserPage.vue";
import BaseAdminUserPage from "@/pages/AdminPage/UsersPage/BaseAdminUserPage.vue";
import EditUserPage from "@/pages/AdminPage/UsersPage/EditUserPage.vue";
import BaseEnvPage from "@/pages/AdminPage/EnvPage/BaseEnvPage.vue";
import ProfessionPage from "@/pages/AdminPage/EnvPage/ProfessionPage.vue";
import TypeBlueprintPage from "@/pages/AdminPage/EnvPage/TypeBlueprintPage.vue";
import TypeEquipmentBlueprintPage from "@/pages/AdminPage/EnvPage/TypeEquipmentBlueprintPage.vue";
import BaseBlueprintPage from "@/pages/AdminPage/BlueprintPage/BaseBlueprintPage.vue";
import ViewBlueprintPage from "@/pages/AdminPage/BlueprintPage/ViewBlueprintPage.vue";
import TypeDevice from "@/pages/AdminPage/EnvPage/TypeDevice.vue";
import BaseDevicePage from "@/pages/AdminPage/DevicePage/BaseDevicePage.vue";
import ViewDevicePage from "@/pages/AdminPage/DevicePage/ViewDevicePage.vue";
import EditDevicePage from "@/pages/AdminPage/DevicePage/EditDevicePage.vue";
import BaseUserBlueprintPage from "@/pages/UserPage/BlueprintPage/BaseUserBlueprintPage.vue";
import ViewUserBlueprintPage from "@/pages/UserPage/BlueprintPage/ViewUserBlueprintPage.vue";
import AddUserClaimPage from "@/pages/UserPage/ClaimPage/AddUserClaimPage.vue";
import BaseAdminPage from "@/pages/AdminPage/ClaimPage/BaseAdminPage.vue";
import ViewClaimAdminPage from "@/pages/AdminPage/ClaimPage/ViewClaimAdminPage.vue";
import EditClaimAdminPage from "@/pages/AdminPage/ClaimPage/EditClaimAdminPage.vue";
import TypeEquipmentPage from "@/pages/AdminPage/EnvPage/TypeEquipmentPage.vue";
import BaseAdminEquipmentPage from "@/pages/AdminPage/EquipmentPage/BaseAdminEquipmentPage.vue";
import EditEquipmentPage from "@/pages/AdminPage/EquipmentPage/EditEquipmentPage.vue";
import ViewEquipmentAdminPage from "@/pages/AdminPage/EquipmentPage/ViewEquipmentAdminPage.vue";

const routes = [
    {
        path: '/',
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                if(initialState.user.type.system_name !== "user") {
                    next("/admin/user");
                }
                else {
                    next("/user/claim");
                }
            }else{
                next()
            }
        }
    },
    {
        path: '/login/yandex',
        component: YandexAcceptPage,
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                if(initialState.user.type.system_name !== "user") {
                    next("/admin/user");
                }
                else {
                    next("/user/claim");
                }
            }else{
                next()
            }
        }
    },
    {
        path: "/profile",
        component: ProfilePage,
        children: [
            {
                path: "account",
                component: EditAccountPage
            },
            {
                path: "signature",
                component: EditSignaturePage
            },
            {
                path: '',
                component: ViewAccountPage
            }
        ],
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                next();
            }else{
                next('/')
            }
        }
    },
    {
        path: '/admin',
        component: AdminMainPage,
        children:[
            {
                path: "user",
                component: BaseAdminUserPage,
                children: [
                    {
                        path: "edit/:uuid",
                        component: EditUserPage,
                    },
                    {
                        path: "add",
                        component: EditUserPage,
                    },
                    {
                        path: "",
                        component: AdminUserPage
                    }
                ]
            },
            {
                path: "",
                component: BaseAdminUserPage
            },
            {
                path: "env",
                component: BaseEnvPage,
                children: [
                    {
                        path: "profession",
                        component: ProfessionPage
                    },
                    {
                        path: "type_blueprint",
                        component: TypeBlueprintPage
                    },
                    {
                        path: "type_equipment_blueprint",
                        component: TypeEquipmentBlueprintPage
                    },
                    {
                        path: "type_device",
                        component: TypeDevice
                    },
                    {
                        path: "type_equipment",
                        component: TypeEquipmentPage
                    }

                ]
            },
            {
                path: "blueprint",
                component: BaseBlueprintPage,
                children: [
                    {
                        path: "",
                        component: ViewBlueprintPage
                    }
                ]
            },
            {
                path: "device",
                component: BaseDevicePage,
                children: [
                    {
                        path: "",
                        component: ViewDevicePage
                    },
                    {
                        path: "edit/:id",
                        component: EditDevicePage,
                    },
                    {
                        path: "add",
                        component: EditDevicePage,
                    },
                ]
            },
            {
                path: "claim",
                component: BaseAdminPage,
                children: [
                    {
                        path: "",
                        component: ViewClaimAdminPage
                    },
                    {
                        path: "edit/:uuid",
                        component: EditClaimAdminPage
                    }
                ]
            },
            {
                path: "equipment",
                component: BaseAdminEquipmentPage,
                children: [
                    {
                        path: "edit/:uuid_equip",
                        component: EditEquipmentPage
                    },
                    {
                        path: "add",
                        component: EditEquipmentPage
                    },
                    {
                        path: "",
                        component: ViewEquipmentAdminPage
                    }
                ]
            }

        ],
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                if(initialState.user.type.system_name !== "user") {
                    next();
                }
                else {
                    next(false);
                }
            }else{
                next('/')
            }
        }
    },
    {
        path: '/user',
        component: UserMainPage,
        children: [
            {
                path: "claim",
                component: BasePage,
                children: [
                    {
                        path: "",
                        component: ClaimViewPage
                    },
                    {
                        path: "edit/:uuid",
                        component: EditClaimPage
                    }
                ]
            },
            {
                path: "blueprint",
                component: BaseUserBlueprintPage,
                children: [
                    {
                        path: "",
                        component: ViewUserBlueprintPage
                    },
                    {
                        path: "create_claim/:uuid",
                        component: AddUserClaimPage
                    }
                ]
            },
        ],
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                if(initialState.user.type.system_name === "user") {
                    next();
                }
                else {
                    next(false);
                }
            }else{
                next('/')
            }
        }
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

export default router;