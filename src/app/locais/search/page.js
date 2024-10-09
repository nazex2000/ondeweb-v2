"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import EmptyImage from '../../../assets/images/empty.png';
import Skeleton from '@mui/material/Skeleton';
import { getBestLocals, getLocalCategories } from "@/components/getters/local";
import { MdArrowDropDown, MdSelectAll } from "react-icons/md";
import { RadioGroup, Radio } from "@nextui-org/radio";
import '../../../components/css/text.css';
import '../../../components/css/explore.css';
import Image from "next/image";
import { LocalCardHr, LocalCardVr } from "@/components/cards/localcards";
import Fuse from 'fuse.js';
import { useTranslation } from "react-i18next";
import '../../../utilis/i18n';

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
            <p className="text-onde-s">{t("Nenhum lugar encontrado")}</p>
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
                href="/locais"
            >
                <p className="text-onde-xs">{t("Lugares")}</p>
            </BreadcrumbItem>
            <BreadcrumbItem
            >
                <p className="text-onde-xs">{t("Resultados")}</p>
            </BreadcrumbItem>
        </Breadcrumbs>
    );
}

export default function Page() {
    const { t, i18n } = useTranslation();
    //search information
    const search = useSearchParams();
    const [loadingParams, setLoadingParams] = useState(true);
    const [searchFilter, setSearchFilter] = useState(search.get('name') || '');
    const [locationFilter, setLocationFilter] = useState(search.get('location') || 'Maputo');
    const [categoryFilter, setCategoryFilter] = useState(search.get('category') || '');

    useEffect(() => {
        setTimeout(() => {
            setLoadingParams(false);
            fetchExploreCategories();
            fetchLocals();
        }, 100);
    }, []);

    const goSearch = async (category) => {
        window.location.href = `/locais/search?name=${searchFilter}&location=${locationFilter}&category=${category}`;
    }

    //Filters
    const [loadingFilters, setLoadingFilters] = useState(true);
    const [exploreCategories, setExploreCategories] = useState([]);
    const [orderFilter, setOrderFilter] = useState(null);
    const [orderOptions, setOrderOptions] = useState([
        { name: t('Mais populares'), value: 'most-popular' },
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

    //Results
    const [loadingResults, setLoadingResults] = useState(true);
    const [results, setResults] = useState([]);

    const fetchLocals = async () => {
        setLoadingResults(true);
        let bestLoc = await getBestLocals();
        console.log(locationFilter);
        let dados = (bestLoc?.filter(locat => locat?.location?.toLowerCase().includes(locationFilter?.toLowerCase())));
        dados = filterByCategory(dados);
        if (searchFilter) dados = filterByFuse(dados);
        setResults(dados);
        setLoadingResults(false);
    }

    const filterByOrder = (locals) => {
        switch (orderFilter) {
            case 'most-popular':
                return locals.sort((a, b) => b?.views - a?.views);
            case 'a-z':
                return locals.sort((a, b) => a?.name.localeCompare(b?.name));
            case 'z-a':
                return locals.sort((a, b) => b?.name.localeCompare(a?.name));
            default:
                return locals;
        }
    }

    const filterByCategory = (locals) => {
        if (categoryFilter === '') return locals;
        return locals.filter(local => {
            console.log(local.category);
            return local.category.some(cat => (cat.name).includes(categoryFilter));

        });
    }

    const filterByFuse = (locals) => {
        const fuse = new Fuse(locals, {
            keys: ['name', 'hashtags', 'description'],
            includeScore: true,
        });
        return fuse.search(searchFilter).map(result => result.item);
    }

    const filteredResults = filterByOrder(results);

    return (
        <Suspense fallback={<div>Loading...</div>}>
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
                        <div className="w-full flex-col gap-4 my-4">
                            <p className="title-onde-m">{t("Resultados para")} {searchFilter} {categoryFilter ? (<>[{categoryFilter}]</>) : null} {t("em")} {locationFilter}</p>
                            <div className="w-full flex flex-col md:flex-row gap-4 mt-3">
                                <div className="w-1/4 hidden md:flex flex-col gap-4">
                                    <p className="title-onde-sm">{t("Filtros")}</p>
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
                                            <p className="title-onde-s">{t("Categorias")}</p>
                                            <div className="w-full grid grid-cols-1 gap-2 mt-2">
                                                {exploreCategories
                                                    .slice(0, collapse ? exploreCategories.length : 5)
                                                    .map((category, index) => (
                                                        <div
                                                            className={`item-category ${category.name === searchFilter ? 'ic-active' : ''}`}
                                                            key={index}
                                                            onClick={() => {
                                                                goSearch(category.name);
                                                            }}
                                                        >
                                                            <MdSelectAll size={20} />
                                                            <p className="text-onde-xs">{i18n.language === 'pt' ? category.name : category.name_en}</p>                                                    </div>
                                                    ))}
                                                <div className="collapse-button mt-2" onClick={() => setCollapse(!collapse)}>
                                                    <p className="text-onde-xs">{collapse ? <>{t("Ver menos")}</> : <>{t("Ver mais")}</>}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex-col gap-4 mt-4">
                                            <p className="title-onde-s">{t("Ordenar por")}</p>
                                            <div className="w-full grid grid-cols-1 gap-2 mt-2">
                                                <RadioGroup
                                                    value={orderFilter}
                                                    onChange={(e) => setOrderFilter(e.target.value)}
                                                    size="sm"
                                                >
                                                    {orderOptions.map((option, index) => (
                                                        <Radio key={index} value={option.value}>
                                                            <p className="text-onde-xs">{option.name}</p>
                                                        </Radio>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </>}
                                </div>
                                <div className="w-full flex md:hidden gap-4">
                                    <div className="explore-filter px-4 py-2 bg-gray-100 rounded-full  flex items-center justify-between">
                                        <MdArrowDropDown size={20} color='#7034D4' />
                                        <p className="text-onde-s">Categorias</p>

                                        <div className="category-dropdown">
                                            {
                                                exploreCategories.map((cat, index) => (
                                                    <p
                                                        className="text-onde-xs"
                                                        key={index}
                                                        onClick={() => {
                                                            goSearch(cat.name);
                                                        }}
                                                    >
                                                        {i18n.language === 'pt' ? cat.name : cat.name_en}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="explore-filter px-4 py-2 bg-gray-100 rounded-full  flex items-center justify-between">
                                        <MdArrowDropDown size={20} color='#7034D4' />
                                        <p className="text-onde-s">{t("Ordenar por")}</p>
                                        <div className="category-dropdown p-3">
                                            <div className="w-full grid grid-cols-1 gap-2 mt-2">
                                                <RadioGroup
                                                    value={orderFilter}
                                                    onChange={(e) => setOrderFilter(e.target.value)}
                                                    size="sm"
                                                >
                                                    {orderOptions.map((option, index) => (
                                                        <Radio key={index} value={option.value}>
                                                            <p className="text-onde-xs">{option.name}</p>
                                                        </Radio>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-3/4 flex-col gap-4">
                                    {loadingResults && <>
                                        <div className="w-full grid grid-cols-3 gap-4 mt-6">
                                            {Array.from({ length: 8 }).map((_, index) => (
                                                <div className="flex flex-col gap-1" key={index}>
                                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                                    <Skeleton />
                                                    <Skeleton width="60%" />
                                                </div>
                                            ))}
                                        </div>
                                    </>}
                                    {!loadingResults &&
                                        <>
                                            {filteredResults.length > 0 ?
                                                <>
                                                    <div className="hidden md:grid mt-2 grid-cols-1 gap-4 mb-5">
                                                        {
                                                            results.map((local, index) => (
                                                                <LocalCardVr local={local} key={index} />
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="flex md:hidden mt-2 grid grid-cols-2 gap-4 mb-5">
                                                        {
                                                            results.map((local, index) => (
                                                                <LocalCardHr local={local} key={index} />
                                                            ))
                                                        }
                                                    </div>
                                                </> :
                                                <Empty />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            </div >
        </Suspense>
    );
}