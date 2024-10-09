"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

//css
import '../../components/css/text.css';
import '../../components/css/home.css';
import '../../components/css/explore.css';

//imagens provincias
import Festival from '../../assets/images/festival.jpg';
import Image from "next/image";
import { MdArrowDropDown, MdArrowOutward, MdLocationPin, MdSelectAll } from "react-icons/md";
import { getAllEvents, getEventCategories, getTopEvents } from "@/components/getters/events";
import { EventCardHr } from "@/components/cards/eventcards";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

//Empty Images
import EmptyImage from '../../assets/images/empty.png';

//skeleton
import Skeleton from '@mui/material/Skeleton';

//Translation
import { useTranslation } from "react-i18next";
import '../../utilis/i18n';

const Empty = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className="flex-col flex justify-center items-center w-full">
            <Image
                src={EmptyImage}
                alt="Empty"
                width={200}
                height={200}
            />
            <p className="text-onde-s">{t("Nenhum evento encontrado")}</p>
        </div>
    );
}

function Bread() {
    const { t, i18n } = useTranslation();
    return (
        <Breadcrumbs>
            <BreadcrumbItem
                href="/"
            >
                <p className="text-onde-xs">Home</p>
            </BreadcrumbItem>
            <BreadcrumbItem
                href="/eventos"
            >
                <p className="text-onde-xs">{t("Eventos")}</p>
            </BreadcrumbItem>
        </Breadcrumbs>
    );
}

export default function Page() {
    const search = useSearchParams();
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language);

    useEffect(() => {
        getEventData(selectedLocation);
        if (search.get('category')) {
            setSelectedCategory(search.get('category'));
        }
    }, []);

    //Location Information
    const [selectedLocation, setSelectedLocation] = useState('Maputo');
    const provinces = ["Maputo", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambezia", "Nampula", "Cabo Delgado", "Niassa"];
    const handleLocal = (province) => {
        setSelectedLocation(province);
        getEventData(province);
    }

    //fetch data of locals
    const [events, setEvents] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    const getEventData = async (local) => {
        setLoadingEvents(true);
        let eventCat = await getEventCategories();
        setEventCategories(eventCat);
        let bestEvent = await getAllEvents();
        setEvents(shuffle(bestEvent?.filter(locat => locat?.locationName?.toLowerCase().includes(local.toLowerCase()))));
        setLoadingEvents(false);
    }

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    //Category Filter
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const filteredEvents = events.filter(event => {
        if (selectedCategory === 'Todos') {
            return event;
        }
        return event?.category?.some(cat => cat.name.includes(selectedCategory));
    });


    return (
        <>
            <div className="onde-container">
                <div className="onde-content flex-col pb-4">
                    <Bread />
                    <div className="card-explore my-3">
                        <Image
                            src={Festival}
                            alt="Maputo"
                            className="card-explore-image"
                            fill
                        />
                        <div className="card-explore-content">
                            <div className="flex flex-col items-start justify-start w-full md:w-1/2">
                                <p className="title-onde-sm md:title-onde-l">{t("Os Melhores eventos em")}</p>
                                <p className="title-onde-home">{selectedLocation}</p>
                                <p className="text-onde-s">{t("Você está em")} {selectedLocation} {t("e não sabe o que fazer? Aqui você encontra os melhores eventos para participar")}</p>
                                <div
                                    className="explore-button mt-5"
                                >
                                    <MdLocationPin size={20} color='white' />
                                    <p className="text-onde-s">{selectedLocation}</p>
                                    <MdArrowDropDown size={20} color='white' />
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
                    </div>
                    {loadingEvents ? <>
                        <Skeleton variant="text" width="100%" height={70} />
                        <div className="w-full grid grid-cols-4 gap-4 mt-6">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div className="flex flex-col gap-1" key={index}>
                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                    <Skeleton />
                                    <Skeleton width="60%" />
                                </div>
                            ))}
                        </div>
                    </> :
                        <>
                            <div className="menu-explore my-2">
                                <div className="menu-explore-content">
                                    <div
                                        className={`menu-explore-item ${selectedCategory === 'Todos' ? 'mei-active' : ''}`}
                                        key={0}
                                        onClick={() => setSelectedCategory('Todos')}
                                    >
                                        <MdSelectAll size={20} />
                                        <p className="text-onde-xs">{t("Todos")}</p>
                                    </div>
                                    {
                                        eventCategories.map((category, index) => (
                                            <div
                                                className={`menu-explore-item ${selectedCategory.trim() === category.name.trim() ? 'mei-active' : ''}`}
                                                key={index + 1}
                                                onClick={() => setSelectedCategory(category.name)}
                                            >
                                                <MdArrowOutward size={20} />
                                                <p className="text-onde-xs">{i18n.language === 'pt' ? category.name : category.name_en}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-full flex-col gap-4 my-6">
                                <p className="title-onde-m">{t("Eventos em")} {selectedLocation}</p>
                                {filteredEvents.length > 0 ?
                                    <div className="flex mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                                        {
                                            filteredEvents.map((ev, index) => (
                                                <EventCardHr event={ev} key={index} />
                                            ))
                                        }
                                    </div>
                                    :
                                    <Empty />
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}