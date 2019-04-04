// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Tests from "@material-ui/icons/PlaylistAddCheck"
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import UserProfileEdit from "views/UserProfileEdit/UserProfileEdit.jsx";
import Documents from "views/Documents/Documents.jsx";
import TestsSelector from "views/Tests/Tests.jsx";
import UserGroups from "views/UserGroups/UserGroups.jsx"
import Users from "views/Users/Users.jsx"
import TableList from "views/TableList/TableList.jsx";
import InterviewList from "views/Interviewer/InterviewList.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";


export const candidateRoutes = [
  // {
  //   path: "/profile",
  //   name: "My Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/dashboard"
  // },
  {
    path: "/editprofile",
    name: "Edit Profile",
    icon: Person,
    hidden: true,
    component: UserProfileEdit,
    layout: "/dashboard"
  },
  {
    path: "/documents",
    name: "Documents",
    icon: LibraryBooks,
    component: Documents,
    layout: "/dashboard"
  },
  {
    path: "/tests",
    name: "Tests",
    icon: Tests,
    component: TestsSelector,
    layout: "/dashboard"
  }
]

export const adminRoutes = [
  {
    path: "/editprofile",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/dashboard"
  },
  {
    path: "/users",
    name: "Users",
    icon: Person,
    component: Users,
    layout: "/dashboard"
  },
  {
    path: "/usergroups",
    name: "User Groups",
    icon: Person,
    component: UserGroups,
    layout: "/dashboard"
  },
]

export const interviewerRoutes = [
  {
    path: "/profile",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/dashboard"
  },
  {
    path: "/interview-list",
    name: "Interview List",
    icon: Person,
    component: InterviewList,
    layout: "/dashboard"
  },
]

export const managerRoutes = [
  {
    path: "/profile",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/dashboard"
  },
]

// export const dashboardRoutes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: Dashboard,
//     component: DashboardPage,
//     layout: "/dashboard"
//   },
//   {
//     path: "/profile",
//     name: "User Profile",
//     icon: Person,
//     component: UserProfile,
//     layout: "/dashboard"
//   },
//   {
//     path: "/table",
//     name: "Table List",
//     icon: "content_paste",
//     component: TableList,
//     layout: "/dashboard"
//   },
//   {
//     path: "/typography",
//     name: "Typography",
//     icon: LibraryBooks,
//     component: Typography,
//     layout: "/dashboard"
//   },
//   {
//     path: "/icons",
//     name: "Icons",
//     icon: BubbleChart,
//     component: Icons,
//     layout: "/dashboard"
//   },
//   {
//     path: "/maps",
//     name: "Maps",
//     icon: LocationOn,
//     component: Maps,
//     layout: "/dashboard"
//   },
//   {
//     path: "/notifications",
//     name: "Notifications",
//     icon: Notifications,
//     component: NotificationsPage,
//     layout: "/dashboard"
//   }
// ];

