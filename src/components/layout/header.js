"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Logo from "../../assets/icons/icon.png";
import { MdMenu, MdClose, MdFacebook, MdLocationPin, MdArrowDropDown } from "react-icons/md";
import { FaArrowRight, FaCalendar, FaInstagram, FaSearch, FaTwitter } from "react-icons/fa";
import "../css/header.css";
import "../css/text.css";
import "../css/home.css";
import '../../utilis/i18n'
import { useTranslation } from 'react-i18next';

const Header = () => {
    const params = useSearchParams();
    const router = usePathname();
    const [selectedLocal, setSelectedLocal] = useState(params.get('location') || 'Maputo');
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchChanged, setSearchChanged] = useState();

    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language);

    const handleMenu = (path) => {
        window.location.href = path;
        setMenuOpen(false);
    }

    const trimTitle = (title) => {
        if (title?.length > 6) {
            return title.substring(0, 6) + '...';
        }
        return title
    }
    //inputs
    const [search, setSearch] = useState('');

    //Location Picker
    const provinces = ["Maputo", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambezia", "Nampula", "Cabo Delgado", "Niassa"];

    const handleLocal = (province) => {
        setSelectedLocal(province);
    }

    const goSearch = () => {
        if (router.includes('/evento')) {
            window.location.href = `/eventos/search?name=${search}&location=${selectedLocal}`;
        } else {
            window.location.href = `/locais/search?name=${search}&location=${selectedLocal}`;
        }
    }

    return (
        <div className="header">
            <div className="header-content">
                <div className="logo-container">
                    <Image src={Logo} alt="Instituto Nilia" className="header-logo" onClick={() => window.location.href = "/"} priority />
                </div>
                <nav className="nav-menu hidden md:flex">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li className="dropdown">
                            <a href="/eventos">Eventos</a>
                        </li>
                        <li className="dropdown">
                            <a href="/locais">Locais</a>
                        </li>
                        <li>
                            <a href="/sobre">Sobre nós</a>
                        </li>
                        <li>
                            <a href="/contactos">Contactos</a>
                        </li>
                    </ul>
                </nav>
                <div className="justify-center items-center hidden md:flex ml-auto gap-3">
                    <div className="bg-white rounded-full flex items-center justify-center p-1 cursor-pointer">
                        <MdFacebook size={15} color='#7034D4' />
                    </div>
                    <div className="bg-white rounded-full flex items-center justify-center p-1 cursor-pointer">
                        <FaInstagram size={15} color='#7034D4' />
                    </div>
                    <div className="bg-white rounded-full flex items-center justify-center p-1 cursor-pointer">
                        <FaTwitter size={15} color='#7034D4' />
                    </div>
                </div>
                <div className="menu-icon md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <MdClose className='cursor-pointer' color="white" size={30} /> : <MdMenu className='cursor-pointer' color="white" size={30} />}
                </div>
                {menuOpen &&
                    <div className='menu-bar-mobile  block md:hidden'>
                        <p className='text-menu'>
                            <FaArrowRight size={17} color='#7034D4' />
                            <p className="nilia-text-m" onClick={() => handleMenu('/')}>Home</p>
                        </p>
                        <p className='text-menu'>
                            <FaArrowRight size={17} color='#7034D4' />
                            <p className="nilia-text-m" onClick={() => handleMenu('/eventos')}>Eventos</p>
                        </p>
                        <p className='text-menu'>
                            <FaArrowRight size={17} color='#7034D4' />
                            <p className="nilia-text-m" onClick={() => handleMenu('/locais')}>Locais</p>
                        </p>
                        <p className='text-menu'>
                            <FaArrowRight size={17} color='#7034D4' />
                            <p className="nilia-text-m" onClick={() => handleMenu('/sobre')}>Sobre nós</p>
                        </p>
                        <p className='text-menu'>
                            <FaArrowRight size={17} color='#7034D4' />
                            <p className="nilia-text-m" onClick={() => handleMenu('/contactos')}>Contactos</p>
                        </p>
                    </div>
                }
            </div>
            {(router.includes('/locais') || router.includes('/evento')) &&
                <div className="search-container">
                    <div className="location-search">
                        <MdLocationPin size={20} color='#7034D4' />
                        <p className="nilia-text-s" >{trimTitle(selectedLocal)}</p>
                        <MdArrowDropDown size={20} color='#7034D4' />
                        <div className="onde-dropdown">
                            {
                                provinces.map((province, index) => (
                                    <p
                                        className="text-onde-xs"
                                        key={index}
                                        onClick={() => {
                                            handleLocal(province);
                                        }}
                                    >
                                        {province}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="text-search">
                        <FaSearch size={20} color='#7034D4' />
                        <input type="text" placeholder="Pesquisar" className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="search-button" onClick={goSearch}>
                        Pesquisar
                    </div>
                </div>
            }
        </div>
    );
};

export default Header;
