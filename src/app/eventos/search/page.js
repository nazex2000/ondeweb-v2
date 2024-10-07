"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import EmptyImage from '../../../assets/images/empty.png';
import Skeleton from '@mui/material/Skeleton';
import { getBestLocals, getLocalCategories } from "@/components/getters/local";
import { MdSelectAll } from "react-icons/md";
import { RadioGroup, Radio } from "@nextui-org/radio";
import '../../../components/css/text.css';
import '../../../components/css/explore.css';
import Image from "next/image";
import { LocalCardVr } from "@/components/cards/localcards";
import Fuse from 'fuse.js';
import { getAllEvents, getEventCategories } from "@/components/getters/events";
import { EventCardVr } from "@/components/cards/eventcards";
import dayJS from 'dayjs';
import { DateRangePicker } from "@nextui-org/react";


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

function Bread() {
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
                <p className="text-onde-xs">Eventos</p>
            </BreadcrumbItem>
            <BreadcrumbItem
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
    const [searchFilter, setSearchFilter] = useState(search.get('name') || '');
    const [locationFilter, setLocationFilter] = useState(search.get('location') || 'Maputo');
    const [categoryFilter, setCategoryFilter] = useState(search.get('category') || '');
    const [startFilter, setStartFilter] = useState(search.get('start_date') || '');
    const [endFilter, setEndFilter] = useState(search.get('end_date') || '');

    useEffect(() => {
        setTimeout(() => {
            setLoadingParams(false);
            fetchExploreCategories();
            fetchEvents();
        }, 100);
    }, []);

    const goSearch = async (category) => {
        window.location.href = `/eventos/search?name=${searchFilter}&location=${locationFilter}&category=${category}`;
    }

    //Filters
    const [loadingFilters, setLoadingFilters] = useState(true);
    const [exploreCategories, setExploreCategories] = useState([]);
    const [orderFilter, setOrderFilter] = useState(null);
    const [orderOptions, setOrderOptions] = useState([
        { name: 'Mais populares', value: 'most-popular' },
        { name: 'A-Z', value: 'a-z' },
        { name: 'Z-A', value: 'z-a' },
    ]);

    const fetchExploreCategories = async () => {
        setLoadingFilters(true);
        let localCat = await getEventCategories();
        setExploreCategories(localCat);
        setLoadingFilters(false);
    }

    //collapse categories filter
    const [collapse, setCollapse] = useState(false);

    //Results
    const [loadingResults, setLoadingResults] = useState(true);
    const [results, setResults] = useState([]);

    const fetchEvents = async () => {
        setLoadingResults(true);
        let bestLoc = await getAllEvents();
        let dados = (bestLoc?.filter(locat => locat?.locationName?.toLowerCase().includes(locationFilter?.toLowerCase())));
        dados = filterByCategory(dados);
        if (searchFilter) dados = filterByFuse(dados);
        dados = filterByData(dados);
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
            return local.category.some(cat => (cat.name).includes(categoryFilter));

        });
    }

    const filterByFuse = (locals) => {
        const fuse = new Fuse(locals, {
            keys: ['name', 'hashtags', 'description', 'description_en'],
            includeScore: true,
        });
        return fuse.search(searchFilter).map(result => result.item);
    }

    const filterByData = (locals) => {
        if (startFilter === '' && endFilter === '') return locals;
        return locals.filter(local => {
            let eventDate = new Date(local?.data?.seconds * 1000);
            let startDate = new Date(startFilter);
            let endDate = new Date(endFilter);
            //compare with dayJS
            return dayJS(eventDate).startOf('day') >= dayJS(startDate).startOf('day') && dayJS(eventDate).startOf('day') <= dayJS(endDate).startOf('day');
        });
    }


    const filteredResults = filterByOrder(results);

    //Data Filter
    const [dataFilter, setDataFilter] = useState(search.get('type') || null);
    const [showCalendar, setShowCalendar] = useState(false);
    const dataOption = [
        { name: 'Hoje', value: 'today' },
        { name: 'Esta semana', value: 'this-week' },
        { name: 'Este mês', value: 'this-month' },
        { name: 'Escolher data', value: 'choose-date' },
    ];
    const [dataRange, setDataRange] = useState({ start: null, end: null });

    const handleDataFilter = (value) => {
        setDataFilter(value);
        if (value === 'today') {
            //pick the actual date of the system
            let today = new Date();
            let todayDate = today.toISOString().split('T')[0];

            window.location.href = `/eventos/search?name=${searchFilter}&location=${locationFilter}&category=${categoryFilter}&start_date=${todayDate}&end_date=${todayDate}&type=today`;
        } else if (value === 'this-week') {
            let today = new Date();
            let nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            let todayDate = today.toISOString().split('T')[0];
            let nextWeekDate = nextWeek.toISOString().split('T')[0];
            window.location.href = `/eventos/search?name=${searchFilter}&location=${locationFilter}&category=${categoryFilter}&start_date=${todayDate}&end_date=${nextWeekDate}&type=this-week`;
        } else if (value === 'this-month') {
            let today = new Date();
            let nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            let todayDate = today.toISOString().split('T')[0];
            let nextMonthDate = nextMonth.toISOString().split('T')[0];
            window.location.href = `/eventos/search?name=${searchFilter}&location=${locationFilter}&category=${categoryFilter}&start_date=${todayDate}&end_date=${nextMonthDate}&type=this-month`;
        } else if (value === 'choose-date') {
            setShowCalendar(true);
        }
    }

    const handleDataRange = (value) => {
        console.log(value);
        let startDate = value?.start?.toISOString().split('T')[0];
        let endDate = value?.end?.toISOString().split('T')[0];
        if (startDate && endDate) {
            window.location.href = `/eventos/search?name=${searchFilter}&location=${locationFilter}&category=${categoryFilter}&start_date=${startDate}&end_date=${endDate}&type=choose-date`;
        }
    }

    useEffect(() => {
        if (dataRange.start && dataRange.end) {
            window.location.href = `/eventos/search?name=${searchFilter}&location=${locationFilter}&category=${categoryFilter}&start_date=${dataRange.start}&end_date=${dataRange.end}`;
        }
    }, [dataRange.start, dataRange.end]);

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
                    <div className="w-full flex-col gap-4 my-4">
                        <p className="title-onde-m">Resultados para {searchFilter} {categoryFilter ? (<>[{categoryFilter}]</>) : null} em {locationFilter}</p>
                        <div className="w-full flex gap-10 mt-3">
                            <div className="w-1/4 flex-col gap-4">
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
                                        <p className="title-onde-s">Data</p>
                                        <div className="w-full grid grid-cols-1 gap-2 mt-2">
                                            <RadioGroup
                                                value={dataFilter}
                                                onChange={(e) => handleDataFilter(e.target.value)}
                                                size="sm"
                                            >
                                                {dataOption.map((option, index) => (
                                                    <Radio key={index} value={option.value}>
                                                        <p className="text-onde-xs">{option.name}</p>
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                            <div className="w-full mt-2">
                                                {dataFilter === 'choose-date' && <>
                                                    <DateRangePicker
                                                        label="selecione o intervalo de datas"
                                                        visibleMonths={2}
                                                        pageBehavior="single"
                                                        size="sm"
                                                        value={dataRange}
                                                        onChange={setDataRange}
                                                    />
                                                </>}
                                            </div>
                                        </div>
                                    </div>
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
                                                            goSearch(category.name);
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
                                    <div className="w-full flex-col gap-4 mt-4">
                                        <p className="title-onde-s">Ordenar por</p>
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
                            <div className="w-3/4 flex-col gap-4">
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
                                                <div className="flex mt-2 grid grid-cols-1 gap-4 mb-5">
                                                    {
                                                        results.map((ev, index) => (
                                                            <EventCardVr event={ev} key={index} />
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
    );
}