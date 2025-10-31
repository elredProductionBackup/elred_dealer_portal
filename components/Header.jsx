"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ATinksImage from "../assets/images/atinks-logo.svg";
import LogoutIcon from "../assets/icons/logoutIcon.svg";
import CartIcon from "../assets/icons/cartIcon.svg";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = 1;

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "All products", href: "/products" },
    { name: "Help & Support", href: "/support" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  return (
    <header className="w-full flex items-center justify-between px-[50px] py-[18px] max-w-[1600px] mx-auto border-b border-[#E4E3E3]/50 bg-white">
      {/* Left - Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={ATinksImage}
            alt="A.T. Inks Logo"
            width={124}
            height={40}
            className="object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Center - Navigation */}
      <nav className="flex items-center gap-[49px] font-medium text-[#899197]">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-[10px] rounded-full transition-all ${
                isActive
                  ? "bg-[#1C4532] text-white"
                  : "text-[#899197]"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Right - Icons and Logout */}
      <div className="flex items-center gap-[23px]">
        {/* Cart */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#1C4532]/30 cursor-pointer">
          <Image src={CartIcon} alt="Cart Icon" width={24} height={24} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-[-.8px] flex items-center justify-center text-[10px] font-medium text-white bg-[#E72D38] h-[18px] w-[18px] rounded-full border border-white">
              {cartCount}
            </span>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 border border-[#E72D38] rounded-full px-[24.5px] py-[10px] text-[#E72D38] font-medium cursor-pointer transition-colors"
        >
          <Image
            src={LogoutIcon}
            alt="Logout Icon"
            width={16}
            height={16}
            className="object-contain"
          />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
