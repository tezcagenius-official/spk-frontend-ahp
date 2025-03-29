import { ISidebarList } from "@/interfaces/page/dashboard/ui.interface";
import {
    faCalculator,
    faFile,
    faHelmetSafety,
    faPerson,
    faUser,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const sidebarListMain: ISidebarList[] = [
    {
        name: "Kriteria",
        icon: faPerson,
        link: "/dashboard/chriteria",
    },
    {
        name: "Sub Kriteria",
        icon: faFile,
        link: "/dashboard/sub-chriteria",
    },
];

export const sidebarListCounter: ISidebarList[] = [
    {
        name: "Kriteria",
        icon: faCalculator,
        link: "/dashboard/compare/chriteria",
    },
    {
        name: "Sub Kriteria",
        icon: faCalculator,
        link: "/dashboard/compare/sub-chriteria",
    },
    {
        name: "Perhitungan",
        icon: faCalculator,
        link: "/dashboard/consid",
    },
];

export const sidebarListUser: ISidebarList[] = [
    {
        name: "User Alternatif",
        icon: faUsers,
        link: "/dashboard/alternate",
    },
    {
        name: "User Admin",
        icon: faUser,
        link: "/dashboard/users",
    },
    {
        name: "Divisi Alternatif",
        icon: faHelmetSafety,
        link: "/dashboard/division",
    },
];
