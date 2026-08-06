import Image from "next/image";
import { HiOutlinePlus, HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { HiOutlineMail, HiOutlineArrowRight } from "react-icons/hi";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOption from "@/lib/auth";

const getAdminData = async () => {
  try {
    const session = await getServerSession(authOption);
    if(session?.user?.role === "admin"){
      return session.user;
    }
  } catch (error) {
    console.error(error);
  }
}

const Page = async () => {
  const adminData = await getAdminData();
  const actions = [
    {
      Icon: HiOutlinePlus,
      title: "Add Product",
      description: "Upload new items, set pricing, and publish to the catalogue.",
      href: "/admin/add-product",
    },
    {
      Icon: HiOutlineViewGrid,
      title: "View Orders",
      description: "Browse all pending and completed orders placed by your customers.",
      href: "/admin/view-orders",
    },
    {
      Icon: HiOutlineAdjustmentsHorizontal,
      title: "Manage Products",
      description: "Edit, archive, or remove products and update stock levels.",
      href: "/admin/manage-product",
    },
  ];
  return (
    <div>
      <div className="h-[140vh] sm:h-[91vh] flex flex-col justify-evenly items-center">
        <div className="h-[17%] sm:h-[25%] w-[95vw] sm:w-[88vw] bg-black text-white flex items-center justify-between px-5">
          <div className="flex items-center">
            <Image className="rounded-full" src={"/admin_profile.png"} height={100} width={100} alt="profile pic" />
            <div className="ml-5 flex flex-col gap-1.5">
              <span className="text-gray-400 text-xs tracking-widest uppercase">Administrator</span>
              <h2 className="text-4xl font-serif">{adminData.name} </h2>
              <span className="text-gray-300 text-sm flex items-center gap-1.5">
                <HiOutlineMail className="text-gray-400" />
                {adminData.email}
              </span>
            </div>
          </div>
        </div>
        <div className="h-[70%] sm:h-[60%] w-[95vw] sm:w-[88vw] flex flex-col justify-evenly">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs tracking-widest uppercase">Quick Actions</span>
            <span className="text-2xl font-semibold mt-1">Manage Your Store</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            {actions.map(({ Icon, title, description, href }) => (
              <Link href={href} key={title} className="h-[30%] w-full sm:h-60 sm:w-[30%] border border-gray-300 flex flex-col justify-between p-5 hover:border-black transition-colors cursor-default">
                <Icon className="text-2xl mb-1 sm:mb-0" />
                <div className="flex flex-col gap-2 mb-1 sm:mb-0">
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
                <button className="flex items-center gap-1.5 text-sm font-medium group">Go
                  <HiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
