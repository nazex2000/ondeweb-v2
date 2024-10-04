"use client";
import React, { useState, useEffect, use } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import EmptyImage from '../../../assets/images/empty.png';
import Skeleton from '@mui/material/Skeleton';
import { getLocalCategories } from "@/components/getters/local";
import { MdSelectAll } from "react-icons/md";
import { Radio } from "@nextui-org/react";
import '../../../components/css/text.css';
import '../../../components/css/explore.css';


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
            <BreadcrumbItem
                href="/locais/search"
            >
                <p className="text-onde-xs">Resultados</p>
            </BreadcrumbItem>
        </Breadcrumbs>
    );
}

export default function Page() {

    //search information
    const search = useSearchParams();
    const [loadingParams, setLoadingParams] = useState(true);
    const [searchFilter, setSearchFilter] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);

    useEffect(() => {
        popInformation();
        setTimeout(() => {
            setLoadingParams(false);
            fetchExploreCategories();
        }, 100);
    }, []);

    const popInformation = () => {
        const searchParams = search.get('name');
        const locationParams = search.get('location');
        setSearchFilter(searchParams || "");
        setLocationFilter(locationParams || 'Maputo');
    }

    //Filters
    const [loadingFilters, setLoadingFilters] = useState(true);
    const [exploreCategories, setExploreCategories] = useState([]);
    const [orderFilter, setOrderFilter] = useState('most-popular');
    const [orderOptions, setOrderOptions] = useState([
        { name: 'Mais populares', value: 'most-popular' },
        { name: 'A-Z', value: 'a-z' },
        { name: 'Z-A', value: 'z-a' },
    ]);

    const fetchExploreCategories = async () => {
        setLoadingFilters(true);
        let localCat = await getLocalCategories();
        setExploreCategories(localCat);
        setLoadingFilters(false);
    }

    //collapse categories filter
    const [collapse, setCollapse] = useState(false);

    return (
        <div className="onde-container">
            <div className="onde-content flex-col pb-4">
                <Bread />
                {loadingParams && <>
                    <div className="w-full grid grid-cols-1 gap-4 mt-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div className="flex flex-col gap-1" key={index}>
                                <Skeleton variant="rectangular" width="100%" height={100} />
                            </div>
                        ))}
                    </div>
                </>}
                {!loadingParams && <>
                    <div className="w-full flex-col gap-4 mt-3">
                        <p className="title-onde-m">Resultados para {searchFilter} em {locationFilter}</p>
                        <div className="w-full flex-col gap-4 mt-3">
                            <div className="w-1/4 flex-col gap-4 my-6">
                                <p className="title-onde-sm">Filtros</p>

                                {loadingFilters ? <>
                                    <div className="w-full grid grid-cols-1 gap-4 mt-3">
                                        {Array.from({ length: 8 }).map((_, index) => (
                                            <div className="flex flex-col gap-1" key={index}>
                                                <Skeleton variant="rectangular" width="100%" height={30} />
                                            </div>
                                        ))}
                                    </div>
                                </> : <>
                                    <div className="w-full flex-col gap-4 mt-3">
                                        <p className="title-onde-s">Categorias</p>
                                        <div className="w-full grid grid-cols-1 gap-2 mt-2">
                                            {exploreCategories
                                            .slice(0, collapse ? exploreCategories.length : 5)
                                            .map((category, index) => (
                                                <div
                                                    className={`item-category ${category.name === searchFilter ? 'ic-active' : ''}`}
                                                    key={index}
                                                    onClick={() => {
                                                        setSearchFilter(category.name);
                                                    }}
                                                >
                                                    <MdSelectAll size={20} />
                                                    <p className="text-onde-xs">{category.name}</p>
                                                </div>
                                            ))}
                                            <div className="collapse-button mt-2" onClick={() => setCollapse(!collapse)}>
                                                <p className="text-onde-xs">{collapse ? 'Ver menos' : 'Ver mais'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex-col gap-4 mt-3">
                                        <p className="title-onde-s">Ordenar por</p>
                                        <div className="w-full grid grid-cols-1 gap-2 mt-2">
                                            <Radio.Group
                                                value={orderFilter}
                                                onChange={(e) => setOrderFilter(e.target.value)}
                                            >
                                                {orderOptions.map((option, index) => (
                                                    <Radio key={index} value={option.value} className="text-onde-xs">
                                                        {option.name}
                                                    </Radio>
                                                ))}
                                            </Radio.Group>
                                        </div>
                                    </div>
                                </>}

                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </div >
    );
}