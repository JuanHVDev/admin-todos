import { Sidebar } from '@/components/Sidebar';
import { TopMenu } from '@/components/TopMenu';
import { CiBellOn, CiBookmarkCheck, CiChat1, CiLogout, CiMenuBurger, CiSearch } from 'react-icons/ci';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
})
{
  return (
    <>
      {/* TODO: src/components <Sidebar /> */}
      <Sidebar />
      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">

        {/* TODO: src/components <TopMenu /> */}
        <TopMenu />
        {/* TODO: Fin del <TopMenu /> */}

        {/* TODO: Contenido en el Layout.tsx */}
        <div className="px-6 pt-6 bg-white p-2 m-2 rounded pb-5">


          {/* TODO: dashboard/page.tsx  */}
          {/* Este contenido va dentro de page.tsx */}
          {children}
          {/* TODO: Fin del contenido en el Layout.tsx */}
        </div>
      </div>
    </>
  );
}