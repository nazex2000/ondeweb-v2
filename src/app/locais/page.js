"use client";
import { useState, useEffect } from "react";

//css
import '../../components/css/text.css';
import '../../components/css/home.css';
import '../../components/css/explore.css';

//imagens provincias
import Maputo from '../../assets/images/maputo.jpg';
import Gaza from '../../assets/images/gaza.jpg';
import Inhambane from '../../assets/images/inhambane.jpg';
import Sofala from '../../assets/images/sofala.jpg';
import Manica from '../../assets/images/manica.jpg';
import Tete from '../../assets/images/tete.jpg';
import Zambezia from '../../assets/images/zambezia.jpg';
import Nampula from '../../assets/images/nampula.jpg';
import CaboDelgado from '../../assets/images/cabo-delgado.jpg';
import Niassa from '../../assets/images/niassa.jpg';
import Image from "next/image";
import { MdArrowDownward, MdArrowDropDown, MdArrowOutward, MdLocationPin, MdSelectAll } from "react-icons/md";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { getBestLocals, getLocalCategories } from "@/components/getters/local";
import { LocalCardHr } from "@/components/cards/localcards";

//Empty Images
import EmptyImage from '../../assets/images/empty.png';

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
            <p className="text-onde-s">Nenhum lugar encontrado</p>
        </div>
    );
}

function Bread() {

    return (
        <Breadcrumbs>
            <BreadcrumbItem
                href="/"
            >
                <p className="text-onde-xs">Home</p>
            </BreadcrumbItem>
            <BreadcrumbItem
                href="/locais"
            >
                <p className="text-onde-xs">Lugares</p>
            </BreadcrumbItem>
        </Breadcrumbs>
    );
}

export default function Page() {
    useEffect(() => {
        getLocalData(selectedLocation);
    }, []);

    //Location Information
    const [selectedLocation, setSelectedLocation] = useState('Maputo');
    const provinces = ["Maputo", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambezia", "Nampula", "Cabo Delgado", "Niassa"];
    const provinceImages = {
        'Maputo': Maputo,
        'Gaza': Gaza,
        'Inhambane': Inhambane,
        'Sofala': Sofala,
        'Manica': Manica,
        'Tete': Tete,
        'Zambezia': Zambezia,
        'Nampula': Nampula,
        'Cabo Delgado': CaboDelgado,
        'Niassa': Niassa
    }
    const handleLocal = (province) => {
        setSelectedLocation(province);
        getLocalData(province);
    }

    //fetch data of locals
    const [locals, setLocals] = useState([]);
    const [localCategories, setLocalCategories] = useState([]);
    const [loadingLocals, setLoadingLocals] = useState(true);

    const getLocalData = async (local) => {
        setLoadingLocals(true);
        let localCat = await getLocalCategories();
        setLocalCategories(localCat);
        let bestLoc = await getBestLocals();
        setLocals(shuffle(bestLoc?.filter(locat => locat?.location?.toLowerCase().includes(local.toLowerCase()))));
        setLoadingLocals(false);
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

    const filteredLocals = locals.filter(local => {
        if (selectedCategory === 'Todos') {
            return local;
        }
        return Array.isArray(local.category)
            ? local.category.some(cat => cat.name === selectedCategory)
            : local.category?.name === selectedCategory;
    });


    return (
        <>
            <div className="onde-container">
                <div className="onde-content flex-col pb-4">
                    <Bread />
                    <div className="card-explore my-3">
                        <Image
                            src={provinceImages[selectedLocation]}
                            alt="Maputo"
                            className="card-explore-image"
                            objectFit="cover"
                            layout="fill"
                        />
                        <div className="card-explore-content">
                            <div className="flex flex-col items-start justify-start w-1/2">
                                <p className="title-onde-l">Os Melhores lugares em</p>
                                <p className="title-onde-home">{selectedLocation}</p>
                                <p className="text-onde-s">Você está em {selectedLocation} e não sabe o que fazer? Aqui você encontra os melhores Locais para visitar.</p>
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
                    <div className="menu-explore my-2">
                        <div className="menu-explore-content">
                            <div
                                className={`menu-explore-item ${selectedCategory === 'Todos' ? 'mei-active' : ''}`}
                                key={0}
                                onClick={() => setSelectedCategory('Todos')}
                            >
                                <MdSelectAll size={20} />
                                <p className="text-onde-xs">Todos</p>
                            </div>
                            {
                                localCategories.map((category, index) => (
                                    <div
                                        className={`menu-explore-item ${selectedCategory === category.name ? 'mei-active' : ''}`}
                                        key={index + 1}
                                        onClick={() => setSelectedCategory(category.name)}
                                    >
                                        <MdArrowOutward size={20} />
                                        <p className="text-onde-xs">{category.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {loadingLocals ? <>
                        <div className="w-full grid grid-cols-4 gap-4 mt-6">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div className="flex flex-col gap-1" key={index}>
                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                    <Skeleton />
                                    <Skeleton width="60%" />
                                </div>
                            ))}
                        </div>
                    </>:
                        <div className="w-full flex-col gap-4 my-6">
                            <p className="title-onde-m">Lugares em {selectedLocation}</p>
                            {filteredLocals.length > 0 ?
                                <div className="flex mt-2 grid grid-cols-4 gap-4 mb-5">
                                    {
                                        filteredLocals.map((local, index) => (
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
        </>
    );
}