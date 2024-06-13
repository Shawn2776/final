import {
  MdChecklist,
  MdDashboard,
  MdFormatListBulleted,
  MdQuestionMark,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { GoGear } from "react-icons/go";
import { TbHelpTriangle } from "react-icons/tb";
import { HiLogout } from "react-icons/hi";
import MenuLink from "./menu-link";
import Image from "next/image";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Elections",
        path: "/dashboard/elections",
        icon: <MdChecklist />,
      },
      {
        title: "Ballots",
        path: "/dashboard/ballots",
        icon: <MdFormatListBulleted />,
      },
      {
        title: "Candidates",
        path: "/dashboard/candidates",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Voters",
        path: "/dashboard/voters",
        icon: <MdDashboard />,
      },
      {
        title: "Questions",
        path: "/dashboard/questions",
        icon: <MdQuestionMark />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Results",
        path: "/dashboard/results",
        icon: <MdDashboard />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <GoGear />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <TbHelpTriangle />,
      },
      {
        title: "Logout",
        path: "/dashboard/logout",
        icon: <HiLogout className="rotate-180" />,
      },
    ],
  },
];

const MobileSidebar = ({ session }) => {
  const { user } = session;

  return (
    <div className="absolute z-10 flex flex-col w-3/4 top-5 md:hidden">
      <div className="flex items-center gap-1 m-1">
        <Image
          src={user?.image || "/no-avatar.png"}
          width={50}
          height={50}
          alt="user's profile pic"
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="overflow-x-hidden text-xl font-medium text-nowrap">
            {user?.name}
          </span>
          <span className="text-xs text-textSoft">{user?.email}</span>
        </div>
      </div>
      <hr className="my-2 border-t-2 border-textSoft" />
      <ul>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-textSoft font-bold text-[13px] mt-2 mb-2">
              {cat.title}
            </span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileSidebar;
