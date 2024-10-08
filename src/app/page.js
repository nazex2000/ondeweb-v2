"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "../assets/images/banner-home.webp";
import '../components/css/text.css';
import '../components/css/home.css';
import '../components/css/layout.css';
import ButtonOnde from "@/components/buttons/button";
import { FaMicrophone, FaMicrophoneAltSlash, FaUserAlt } from "react-icons/fa";
import { MdArrowDropDown, MdOutlineMusicVideo, MdPersonOutline } from "react-icons/md";

//icons
import MicIcon from '../assets/icons/mic.png';
import DiscoIcon from '../assets/icons/disco.png';
import MaskIcon from '../assets/icons/mask.png';
import FashionIcon from '../assets/icons/fashion.png';
import NetworkingIcon from '../assets/icons/networking.png';
import FoodIcon from '../assets/icons/food.png';
import SportsIcon from '../assets/icons/sports.png';
import { EventCardHr, Organizer } from "@/components/cards/eventcards";


//imagens provincias
import Maputo from '../assets/images/maputo.jpg';
import Gaza from '../assets/images/gaza.jpg';
import Inhambane from '../assets/images/inhambane.jpg';
import Sofala from '../assets/images/sofala.jpg';
import Manica from '../assets/images/manica.jpg';
import Tete from '../assets/images/tete.jpg';
import Zambezia from '../assets/images/zambezia.jpg';
import Nampula from '../assets/images/nampula.jpg';
import CaboDelgado from '../assets/images/cabo-delgado.jpg';
import Niassa from '../assets/images/niassa.jpg';
import { DestinyCard, LocalCardHr, LocalCategory } from "@/components/cards/localcards";
import { getBestLocals, getLocalCategories } from "@/components/getters/local";
import { getAllEvents, getOrganizers, getPopularEvents, getTopEvents } from "@/components/getters/events";
import { useTranslation } from "react-i18next";
import '../utilis/i18n';
//Empty Images
import EmptyImage from '../assets/images/empty.png';

//skeleton
import Skeleton from '@mui/material/Skeleton';


const Empty = () => {
  return (
    <div className="flex-col flex justify-center items-center w-full">
      <Image
        src={EmptyImage}
        alt="Empty"
        width={200}
        height={200}
      />
      <p className="text-onde-s">Nenhum evento encontrado</p>
    </div>
  );
}


export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    getEventsData(selectedLocal);
    getLocalData(selectedLocal);
  }, []);

  //Local
  const [loadingLocals, setLoadingLocals] = useState(true);
  const provinces = ["Maputo", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambezia", "Nampula", "Cabo Delgado", "Niassa"];
  const [selectedLocal, setSelectedLocal] = useState("Maputo");
  const [localCategories, setLocalCategories] = useState([]);
  const [bestLocals, setBestLocals] = useState([]);

  //events
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [organizers, setOrganizers] = useState([]);
  const [topEvents, setTopEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const handleMenu = (menu) => {
    setSelectedMenu(menu);
  }

  const handleLocal = (local) => {
    setSelectedLocal(local);
    getEventsData(local);
    getLocalData(local);
  }

  //fetch data of events
  const getEventsData = async (local) => {
    setLoadingEvents(true);
    let top = await getTopEvents();
    setTopEvents(top?.filter(event => event?.locationName?.toLowerCase().includes(local?.toLowerCase())).slice(0, 6));
    let popular = await getPopularEvents();
    setPopularEvents(popular?.filter(event => event?.locationName?.toLowerCase().includes(local?.toLowerCase())).slice(0, 12));
    let org = await getOrganizers();
    setOrganizers(org);
    let all = await getAllEvents();
    setAllEvents(all?.filter(event => event?.locationName?.toLowerCase().includes(local?.toLowerCase())).slice(0, 15));
    setLoadingEvents(false);
  }

  //fetch data of locals
  const getLocalData = async (local) => {
    setLoadingLocals(true);
    let localCat = await getLocalCategories();
    setLocalCategories(localCat);
    let bestLoc = await getBestLocals();
    setBestLocals(bestLoc?.filter(locat => locat?.location?.toLowerCase().includes(local?.toLowerCase())).slice(0, 12));
    setLoadingLocals(false);
  }

  //filter events by date
  const filterDateEvents = allEvents.filter(event => {
    const date = new Date(event?.data?.seconds * 1000);
    const today = new Date();
    const week = new Date(today);
    week.setDate(week.getDate() + 7);
    const month = new Date(today);
    month.setMonth(month.getMonth() + 1);
    if (selectedMenu === "today") {
      return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }
    if (selectedMenu === "week") {
      return date >= today && date <= week;
    }
    if (selectedMenu === "month") {
      return date >= today && date <= month;
    }
    return event;
  }
  );

  return (
    <>
      <div className="banner-home">
        <Image
          src={Banner}
          alt="Banner"
          className="banner-home-image"
          fill
        />
        <div className="banner-home-container">
          <div className="banner-home-content">
            <p className="title-onde-home">{t('Pesquisa e Descobre')}</p>
            <p className="title-onde-home-hl">{t('Moçambique')}</p>
            <div className="mt-5">
              <ButtonOnde
                title={t("Começa a explorar")}
                onClick={() => window.location.href = "/eventos"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="onde-container">
        <div className="onde-content">
          <div className="w-full flex grid grid-cols-7 mt-3 gap-4">
            <div className="onde-option">
              <div className="onde-option-rounded">
                <Image
                  src={MicIcon}
                  alt="Mic"
                  className="onde-option-icon"
                />
              </div>
              <p className="text-onde-s">Música</p>
            </div>
            <div className="onde-option">
              <div className="onde-option-rounded">
                <Image
                  src={DiscoIcon}
                  alt="Mic"
                  className="onde-option-icon"
                />
              </div>
              <p className="text-onde-s">Festas Noturnas</p>
            </div>
            <div className="onde-option">
              <div className="onde-option-rounded">
                <Image
                  src={MaskIcon}
                  alt="Mic"
                  className="onde-option-icon"
                />
              </div>
              <p className="text-onde-s">Arte</p>
            </div>
            <div className="onde-option">
              <div className="onde-option-rounded">
                <Image
                  src={FashionIcon}
                  alt="Mic"
                  className="onde-option-icon"
                />
              </div>
              <p className="text-onde-s">Moda</p>
            </div>
            <div className="onde-option">
              <div className="onde-option-rounded">
                <Image
                  src={NetworkingIcon}
                  alt="Mic"
                  className="onde-option-icon"
                />
              </div>
              <p className="text-onde-s">Networking</p>
            </div>
            <div className="onde-option">
              <div className="onde-option-rounded">
                <Image
                  src={FoodIcon}
                  alt="Mic"
                  className="onde-option-icon"
                />
              </div>
              <p className="text-onde-s">Comida</p>
            </div>
            <div className="onde-option">
              <div className="onde-option-rounded">
                <Image
                  src={SportsIcon}
                  alt="Mic"
                  className="onde-option-icon"
                />
              </div>
              <p className="text-onde-s">Desporto</p>
            </div>

          </div>
        </div>
      </div>
      <section className="onde-container">
        <hr className="w-full mt-2" />
        <div className="onde-content" style={{ padding: "0.5rem 1.6rem" }}>
          <div className="flex gap-2 items-center">
            <p className="text-onde-m">{t('Explorando eventos em')}</p>
            <div className="onde-drop">
              <MdArrowDropDown size={24} color="#7034D4" />
              <p className="text-onde-m dest">{selectedLocal ? selectedLocal : "Maputo"}</p>
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
          </div>
        </div>
        <hr className="w-full mb-2" />
      </section>
      <div className="onde-container">
        <div className="onde-content flex-col">
          <div className="menu-bar flex gap-6 items-center">
            <p
              className={`text-onde-xs ${selectedMenu === "all" ? "selected" : ""}`}
              onClick={() => handleMenu("all")}
            >
              {t('Todos')}
            </p>
            <p
              className={`text-onde-xs ${selectedMenu === "today" ? "selected" : ""}`}
              onClick={() => handleMenu("today")}
            >
              {t('Hoje')}
            </p>
            <p
              className={`text-onde-xs ${selectedMenu === "week" ? "selected" : ""}`}
              onClick={() => handleMenu("week")}
            >
              {t('Esta semana')}
            </p>
            <p
              className={`text-onde-xs ${selectedMenu === "month" ? "selected" : ""}`}
              onClick={() => handleMenu("month")}
            >
              {t('Este mês')}
            </p>
          </div>
          {loadingEvents && <>
            <div className="w-full grid grid-cols-4 gap-4 mt-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="flex flex-col gap-1" key={index}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </div>
              ))}
            </div>
          </>}
          {!loadingEvents && selectedMenu === "all" && <>
            <div className="w-full flex-col gap-4 mt-6">
              <p className="title-onde-m">{t('Eventos em destaque')}</p>
              {topEvents.length > 0 ? <>
                <div className="flex mt-2 grid grid-cols-4 gap-4">
                  {
                    topEvents.map((event, index) => (
                      <EventCardHr event={event} key={index} />
                    ))
                  }
                </div>
              </> : (
                <Empty />
              )
              }
            </div>
            <div className="w-full flex-col gap-4 mt-5">
              <p className="title-onde-m">{t('Eventos populares')}</p>
              {popularEvents.length > 0 ? <>
                <div className="flex mt-2 grid grid-cols-4 gap-4">
                  {
                    popularEvents.map((event, index) => (
                      <EventCardHr event={event} key={index} />
                    ))
                  }
                </div>
              </> : (
                <Empty />
              )}
            </div>
          </>}
          {!loadingEvents && selectedMenu !== "all" && <>
            <div className="w-full flex-col gap-4 mt-6">
              <p className="title-onde-m">{t('Eventos encontrados')}</p>
              {filterDateEvents.length > 0 && <>
                <div className="flex mt-2 grid grid-cols-4 gap-4">
                  {
                    filterDateEvents.map((event, index) => (
                      <EventCardHr event={event} key={index} />
                    ))
                  }
                </div>
              </>}
              {filterDateEvents.length === 0 && <>
                <Empty />
              </>}
            </div>
          </>}
          {!loadingEvents && organizers.length > 0 && <>
            <hr className="w-full my-7" />
            <div className="w-full flex-col gap-4 mb-5">
              <p className="title-onde-m flex items-center gap-3">
                <MdPersonOutline size={34} color="#7034D4" />
                {t('Organizadores')}
              </p>
              <div className="onde-scroll-items bg-gray-100 gap-4">
                {
                  organizers.map((organizer, index) => (
                    <Organizer organizer={organizer} key={index} />
                  ))
                }
              </div>
            </div>
          </>}
        </div>
      </div>
      <div className="onde-container bg-gray-100">
        <div className="onde-content">
          <div className="w-full flex-col gap-4 mt-3">
            <p className="title-onde-m">{t('Os melhores destinos em Moçambique')}</p>
            <div className="onde-scroll-items bg-gray-100 gap-4 mt-4 mb-4">
              <DestinyCard
                destiny={
                  {
                    name: "Maputo",
                    image: Maputo
                  }
                }
              />
              <DestinyCard
                destiny={
                  {
                    name: "Gaza",
                    image: Gaza
                  }
                }
              />
              <DestinyCard
                destiny={
                  {
                    name: "Inhambane",
                    image: Inhambane
                  }
                }
              />
              <DestinyCard
                destiny={
                  {
                    name: "Sofala",
                    image: Sofala
                  }
                }
              />
              <DestinyCard
                destiny={
                  {
                    name: "Manica",
                    image: Manica
                  }
                }
              />
              <DestinyCard
                destiny={
                  {
                    name: "Tete",
                    image: Tete
                  }
                }
              />
              <DestinyCard
                destiny={
                  {
                    name: "Zambezia",
                    image: Zambezia
                  }
                }
              />
              <DestinyCard
                destiny={
                  {
                    name: "Nampula",
                    image: Nampula
                  }
                }
              />
              <DestinyCard
                destiny={
                  {
                    name: "Cabo Delgado",
                    image: CaboDelgado
                  }
                }
              />
              <DestinyCard
                destiny={
                  {
                    name: "Niassa",
                    image: Niassa
                  }
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="onde-container">
        <div className="onde-content flex-col">
          {loadingLocals && <>
            <div className="w-full grid grid-cols-4 gap-4 mt-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="flex flex-col gap-1" key={index}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </div>
              ))}
            </div>
          </>}
          {!loadingLocals &&
            <div className="w-full flex-col gap-4 mt-6">
              <p className="title-onde-m">{t('Lugares em destaque')}</p>
              {bestLocals.length > 0 ?
                <div className="flex mt-2 grid grid-cols-4 gap-4 mb-5">
                  {
                    bestLocals.map((local, index) => (
                      <LocalCardHr local={local} key={index} />
                    ))
                  }
                </div>
                :
                <Empty />
              }
            </div>
          }
        </div>
      </div>
      {localCategories?.length > 0 &&
        <div className="onde-container bg-gray-100">
          <div className="onde-content">
            <div className="w-full flex-col gap-4 mt-3">
              <p className="title-onde-m">{t('Explore as nossas categorias de lugares')}</p>
              <div className="flex flex-wrap gap-4 mt-4 mb-5">
                {
                  localCategories.map((category, index) => (
                    <LocalCategory key={index} category={category.name} local={selectedLocal} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
