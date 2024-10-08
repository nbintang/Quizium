import Breadcrumbs from "@/components/admin/core/Breadcrumbs";
import NavbarMobile from "@/components/admin/fragments/navigations/NavbarMobile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import Sidebar from "@/components/admin/fragments/navigations/Sidebar";
import ProfileAdmin from "@/components/admin/core/ProfileAdmin";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  if (session.user?.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <Sidebar />
      </aside>
      <div className="flex flex-col w-full sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky  w-full top-0 z-30 flex justify-between h-14  items-center gap-4 border-b  bg-background px-4 sm:static sm:h-auto sm:pb-3   sm:bg-transparent sm:px-6">
          <NavbarMobile />
          <Breadcrumbs />
        
          <ProfileAdmin />
        </header>
        <main className=" p-4 sm:px-6 sm:py-0 ">{children}</main>
      </div>
    </div>
  );
}
