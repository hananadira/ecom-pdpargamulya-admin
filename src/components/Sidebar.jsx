import React, { useState } from 'react';
import { LuBox, LuUser, LuMessageSquare } from 'react-icons/lu';
import { FaSuitcase } from 'react-icons/fa';
import { TbUsers } from 'react-icons/tb';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (id) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: LuBox },
    { id: 2, path: "/pembelian", name: "Pembelian", icon: TbUsers },
    { id: 3, path: "/pengiriman", name: "Pengiriman", icon: LuMessageSquare },
    {
      id: 4,
      path: "/laporan",
      name: "Laporan",
      icon: FaSuitcase,
      subLinks: [
        { path: "/laporan/pembelian", name: "Pembelian" },
        { path: "/laporan/penjualan", name: "Penjualan" }
      ]
    },
    {
      id: 5,
      path: "/master",
      name: "Master",
      icon: LuUser,
      subLinks: [
        { path: "/master/user", name: "User" },
        { path: "/master/produk", name: "Produk" },
        { path: "/master/kategori", name: "Kategori" },
        { path: "/master/rekening", name: "Rekening" },
        { path: "/master/page", name: "Page" },
        { path: "/master/section", name: "Section" },
        { path: "/master/content", name: "Content" },
      ]
    },
  ];

  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white'>
      <div className="mb-8 md:flex items-center">
        <img src="/img/logo.png" alt="logo" className="w-16 h-16" />
        <h3 className="font-bold" style={{ color: '#8C8787' }}>
          PDP ARGAMULYA
        </h3>
      </div>
      <ul className='mt-6 space-y-6'>
        {SIDEBAR_LINKS.map((link) => (
          <li key={link.id}>
            <div className='flex justify-between items-center'>
              <Link to={link.path} className={`font-medium rounded-md py-2 px-5 flex justify-center md:justify-start items-center md:space-x-5 hover:bg-gray-100 hover:text-indigo-500`}>
                <link.icon className="text-2xl" />
                <span className='hidden md:block'>{link.name}</span>
              </Link>
              {link.subLinks && (
                <button onClick={() => toggleSubMenu(link.id)}>
                  {openSubMenu === link.id ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              )}
            </div>
            {link.subLinks && openSubMenu === link.id && (
              <ul className='pl-8 space-y-4 mt-2'>
                {link.subLinks.map((subLink, index) => (
                  <li key={index}>
                    <Link to={subLink.path} className='text-gray-600 hover:text-indigo-500'>{subLink.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
