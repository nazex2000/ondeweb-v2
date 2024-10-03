"use client";
import { useState } from "react";
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
import { DestinyCard } from "@/components/cards/localcards";


export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("all");

  const handleMenu = (menu) => {
    setSelectedMenu(menu);
  }
  return (
    <>
      <div className="banner-home">
        <Image
          src={Banner}
          alt="Banner"
          className="banner-home-image"
          layout="fill"
          objectFit="cover"
        />
        <div className="banner-home-container">
          <div className="banner-home-content">
            <p className="title-onde-home">Pesquisa e Descobre</p>
            <p className="title-onde-home-hl">Moçambique</p>
            <div className="mt-5">
              <ButtonOnde
                title={"Começa a explorar"}
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
            <p className="text-onde-m">Explorando eventos em </p>
            <div className="onde-drop">
              <MdArrowDropDown size={24} color="#7034D4" />
              <p className="text-onde-m dest">Maputo</p>
              <div className="onde-dropdown">
                <p className="text-onde-s">Maputo</p>
                <p className="text-onde-s">Matola</p>
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
              Todos
            </p>
            <p
              className={`text-onde-xs ${selectedMenu === "today" ? "selected" : ""}`}
              onClick={() => handleMenu("today")}
            >
              Hoje
            </p>
            <p
              className={`text-onde-xs ${selectedMenu === "week" ? "selected" : ""}`}
              onClick={() => handleMenu("week")}
            >
              Esta semana
            </p>
            <p
              className={`text-onde-xs ${selectedMenu === "month" ? "selected" : ""}`}
              onClick={() => handleMenu("month")}
            >
              Este mês
            </p>
          </div>
          <div className="w-full flex-col gap-4 mt-6">
            <p className="title-onde-m">Eventos em destaque</p>
            <div className="flex mt-2 grid grid-cols-4 gap-4">
              <EventCardHr />
            </div>
          </div>
          <div className="w-full flex-col gap-4 mt-5">
            <p className="title-onde-m">Eventos populares</p>
            <div className="flex mt-2 grid grid-cols-4 gap-4">
              <EventCardHr />
            </div>
          </div>
          <hr className="w-full my-7" />
          <div className="w-full flex-col gap-4 mb-5">
            <p className="title-onde-m flex items-center gap-3">
              <MdPersonOutline size={34} color="#7034D4" />
              Organizadores
            </p>
            <div className="onde-scroll-items bg-gray-100 gap-4">
              <Organizer />
              <Organizer />
              <Organizer />
              <Organizer />
              <Organizer />
              <Organizer />
            </div>
          </div>
        </div>
      </div>
      <div className="onde-container bg-gray-100">
        <div className="onde-content">
          <div className="w-full flex-col gap-4 mt-3">
            <p className="title-onde-m">Os melhores destinos em Moçambique</p>
            <div className="onde-scroll-items bg-gray-100 gap-4 mt-4">
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
                    image:Gaza  
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
    </>
  );
}
