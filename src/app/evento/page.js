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
import { MdArrowDownward, MdArrowDropDown, MdLocationPin } from "react-icons/md";

export default function Page() {
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
    }


    return (
        <>
            <div className="onde-container">
                <div className="onde-content">
                    <div className="card-explore">
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
                                    <p className="text-onde-s">Explorar</p>
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
                </div>
            </div>
        </>
    );
}