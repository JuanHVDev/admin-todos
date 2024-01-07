import Image from "next/image"
import Link from "next/link"
import { IoCalendarOutline, IoListOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoBasketOutline, IoPerson, IoPersonOutline } from "react-icons/io5"
import { SidebarItem } from "../Sidebar/SidebarItem"
import { CiLogout } from "react-icons/ci"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { LogoutButton } from "./LogoutButton"
const sideBarItems = [{
  icon: <IoCalendarOutline />, title: 'Dashboard', path: '/dashboard'
},
{
  icon: <IoCheckboxOutline />, title: 'Rest TODOS', path: '/dashboard/rest-todos'
},
{
  icon: <IoListOutline />, title: 'Server Action', path: '/dashboard/server-todos'
},
{
  icon: <IoCodeWorkingOutline />, title: 'Cookies', path: '/dashboard/cookies'
},
{
  icon: <IoBasketOutline />, title: 'Productos', path: '/dashboard/products'
},
{
  icon: <IoPersonOutline />, title: 'Profile', path: '/dashboard/profile'
}
]
export const Sidebar = async () =>
{

  const session = await getServerSession(authOptions)
  const userName = session?.user?.name ?? 'No name'
  const image = session?.user?.image ? session?.user?.image : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
  const email = session?.user?.email ?? 'No email'
  const userRoles = session?.user?.roles ?? ['No roles']
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="#" title="home">
            {/* Next/Image */}
            <Image src={"https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"} className="w-32" alt="tailus logo" width={10} height={10} />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image src={image} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" width={150} height={150} />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="capitalize hidden text-gray-400 lg:block">{userRoles.join(',')}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            sideBarItems.map(item => (
              <SidebarItem {...item} key={item.path} />
            ))
          }
          <li>
          </li>

        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>

    // {/*TODO: Fin del <Sidebar /> */ }
  )
}
