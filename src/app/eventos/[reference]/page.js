"use client";
import { useState, useEffect, Suspense } from "react";
import { usePathname, useParams } from "next/navigation";
import Image from "next/image";
import EmptyImage from '../../../assets/images/empty.png';
import ExploreBg from '../../../assets/images/explore-bg.jpg';
import Skeleton from '@mui/material/Skeleton';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import '../../../components/css/text.css';
import '../../../components/css/explore.css';
import { fetchLocalById } from "@/components/getters/local";
import { MdCalendarMonth, MdCalendarToday, MdContactPhone, MdLocationPin } from "react-icons/md";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getEventById } from "@/components/getters/events";
import { useTranslation } from "react-i18next";
import '../../../utilis/i18n';
import Head from "next/head";

const libraries = ['geometry', 'drawing', 'places'];

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

function Bread({ last }) {
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
            <BreadcrumbItem
            >
                <p className="text-onde-xs">{last}</p>
            </BreadcrumbItem>
        </Breadcrumbs>
    );
}


export default function Page() {
    const { reference } = useParams();
    const [loading, setLoading] = useState(true);
    const [itemData, setItemData] = useState(null);
    const { t, i18n } = useTranslation();
    const [state, setState] = useState(t('Buscando dados...'));
    const [location, setLocation] = useState({ lat: -25.953724, lng: 32.585789 })

    useEffect(() => {
        getData(reference);
    }, []);

    const getData = async (id) => {
        setLoading(true);
        const data = await getEventById(id);
        if (data) {
            setItemData(data);
            setState(data.name);
            setLocation({ lat: data.lat, lng: data.lng });
        } else {
            setState(t("Nenhum evento encontrado"));
        }
        setLoading(false);
    }

    //Map the rows
    const mapStyles = {
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        borderRadius: "10px"
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const timestampToDate = (timestamp) => {
        const date = new Date(timestamp?.seconds * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head>
                <title>{t("Onde - Evento")}</title>
                <meta name="description" content="Pesquisa e descobre Moçambique" />
            </Head>
            <div className="onde-container">
                <div className="onde-content flex-col pb-4">
                    <Bread last={itemData ? itemData.name : state} />
                    {loading && <>
                        <div className="w-full grid grid-cols-1 gap-4 mt-6 mid-explore">
                            <div className="flex flex-col gap-1">
                                <Skeleton variant="rectangular" width="100%" height={300} />
                                <Skeleton variant="text" width="60%" height={40} />
                                <Skeleton variant="text" width="40%" height={40} />
                            </div>
                        </div>
                    </>}
                    {!loading && !itemData &&
                        <div className="w-full flex justify-center items-center h-96">
                            <Empty />
                        </div>
                    }
                    {!loading && itemData &&
                        <>
                            <div className="explore-bg-content my-4">
                                <Image
                                    src={ExploreBg}
                                    alt="LocalImage"
                                    fill
                                    className="explore-bg"
                                    priority
                                />
                                <div className="w-full me-abs">
                                    <div className="flex flex-col mid-explore gap-1">
                                        <Image
                                            src={itemData.coverImage}
                                            alt="LocalImage"
                                            width={500}
                                            height={300}
                                            className="explore-cover-image"
                                            placeholder="blur"
                                            priority
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex-col gap-4 mb-4 mid-explore">
                                <p className="title-onde-l">{itemData.name}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {itemData.category.map((tag, index) => (
                                        <div className="tag-category" key={index} onClick={() => window.location.href = `/eventos?category=${tag.name}`} >
                                            <p className="text-onde-xs">{i18n.language === 'pt' ? tag.name : tag.name_en}</p>
                                        </div>
                                    ))}
                                </div>

                                <p className="title-onde-sm mt-4">{t("Descrição")}</p>
                                <p className="text-onde-s mt-2">{i18n.language === 'pt' ? itemData.description : itemData.description_en}</p>
                                <p className="title-onde-sm mt-4">{t("Data")}</p>
                                <p className="text-onde-s flex items-center gap-3 mt-2">
                                    <MdCalendarToday size={20} color='#7034D4' />
                                    {timestampToDate(itemData.data)}  {itemData?.time}
                                </p>
                                <p className="title-onde-sm mt-4">{t("Localização")}</p>
                                <p className="text-onde-s flex items-center gap-3 mt-2">
                                    <MdLocationPin size={20} color='#7034D4' />
                                    {itemData.location + ', ' + itemData.locationName}
                                </p>
                                {isLoaded &&
                                    <GoogleMap
                                        mapContainerStyle={mapStyles}
                                        zoom={13}
                                        center={location}
                                    >
                                        <Marker
                                            position={{ lat: location.lat, lng: location.lng }}
                                        />
                                    </GoogleMap>
                                }

                                <p className="title-onde-sm mt-4">{t("Contacto")}</p>
                                <p className="text-onde-s flex items-center gap-3 mt-2">
                                    <MdContactPhone size={20} color='#7034D4' />
                                    {itemData?.organizer?.phone || 'Não disponível'}
                                </p>

                                <p className="title-onde-sm mt-4">Tags</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {itemData.hashtags?.split(' ').map((tag, index) => (
                                        <div className="tag" key={index}>
                                            <p className="text-onde-xs">{tag}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    }
                </div>

            </div>
        </Suspense>
    );
}