import React, { useState } from 'react';

// ICONS //
import { LuBox, LuUser, LuMessageSquare } from 'react-icons/lu';
import { FaSuitcase } from 'react-icons/fa';
import { TbUsers } from 'react-icons/tb';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Panah ikon
import { Link } from 'react-router-dom';
// ICONS //

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
            {/* Logo */}
            <div className='mb-8'>
                <img src="/img/logo.png" alt="logo" className="w-28 hidden md:flex"/>
                <img src="/img/name_logo.png" alt="logo" className="w-8 flex md:hidden"/>
            </div>
            {/* Logo */}

            {/* Navigation Links */}
            <ul className='mt-6 space-y-6'>
                {SIDEBAR_LINKS.map((link) => (
                    <li key={link.id}>
                        {/* Main Link */}
                        <div className='flex justify-between items-center'>
                            <Link to={link.path} className={`font-medium rounded-md py-2 px-5 flex justify-center md:justify-start items-center md:space-x-5 hover:bg-gray-100 hover:text-indigo-500`}>
                                <span>{link.icon()}</span>
                                <span className='text-sm text-gray-500 hidden md:flex'>{link.name}</span>
                            </Link>
                            {/* Submenu Toggle Icon */}
                            {link.subLinks && (
                                <span
                                    onClick={() => toggleSubMenu(link.id)}
                                    className="cursor-pointer md:flex hidden"
                                >
                                    {openSubMenu === link.id ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                </span>
                            )}
                        </div>

                        {/* Dropdown submenu */}
                        {link.subLinks && openSubMenu === link.id && (
                            <ul className='ml-8 mt-2 space-y-2'>
                                {link.subLinks.map((subLink, subIndex) => (
                                    <li key={subIndex} className='font-medium rounded-md py-1 px-3 hover:bg-gray-100 hover:text-indigo-500'>
                                        <Link to={subLink.path} className='flex items-center'>
                                            <span className='text-xs text-gray-500'>{subLink.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            {/* Navigation Links */}

            <div className='w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center'>
                <p className='flex items-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full'> 
                    <span>?</span> <span> Need Help</span>
                </p>
            </div>
        </div>
    );
}

export default Sidebar;
