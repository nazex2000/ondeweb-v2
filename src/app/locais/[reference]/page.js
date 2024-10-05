"use client";
import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import Image from "next/image";
import EmptyImage from '../../../assets/images/empty.png';
import ExploreBg from '../../../assets/images/explore-bg.jpg';
import Skeleton from '@mui/material/Skeleton';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import '../../../components/css/text.css';
import '../../../components/css/explore.css';
import { fetchLocalById } from "@/components/getters/local";
import { MdContactPhone, MdLocationPin } from "react-icons/md";

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

function Bread({ last }) {
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
    const [state, setState] = useState('Buscando dados...');

    useEffect(() => {
        getData(reference);
    }, []);

    const getData = async (id) => {
        setLoading(true);
        const data = await fetchLocalById(id);
        if (data) {
            setItemData(data);
            setState(data.name);
        } else {
            setState('Nenhum lugar encontrado');
        }
        setLoading(false);
    }

    return (
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
                            layout="fill"
                            objectFit="cover"
                            className="explore-bg"
                        />
                        <div className="w-full me-abs">
                            <div className="flex flex-col mid-explore gap-1">
                                <Image
                                    src={itemData.coverImage}
                                    alt="LocalImage"
                                    width={500}
                                    height={300}
                                    className="explore-cover-image"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex-col gap-4 mb-4 mid-explore">
                        <p className="title-onde-l">{itemData.name}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {itemData.category.map((tag, index) => (
                                <div className="tag-category" key={index}>
                                    <p className="text-onde-xs">{tag.name}</p>
                                </div>
                            ))}
                        </div>
                        <p className="title-onde-sm mt-4">Localização</p>
                        <p className="text-onde-s flex items-center gap-3 mt-2">
                            <MdLocationPin size={20} color='#7034D4' />
                            {itemData.location}
                        </p>
                        <p className="title-onde-sm mt-4">Descrição</p>
                        <p className="text-onde-s mt-2">{itemData.description}</p>
                        <p className="title-onde-sm mt-4">Contacto</p>
                        <p className="text-onde-s flex items-center gap-3 mt-2">
                            <MdContactPhone size={20} color='#7034D4' />
                            {itemData.phone || 'Não disponível'}
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
    );
}