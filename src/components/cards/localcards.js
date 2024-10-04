import Image from "next/image";
import '../css/destinycard.css';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { MdArrowDropUp, MdArrowOutward, MdArrowUpward, MdSubdirectoryArrowRight } from "react-icons/md";

export function LocalCardHr({ local }) {

    const trimTitle = (title) => {
        if (title?.length > 23) {
            return title.substring(0, 23) + '...';
        }
        return title;
    }



    return (
        <div className="event-card">
            <Image
                src={local?.coverImage}
                alt="EventImage"
                className="event-card-image"
                width={300}
                height={200}
            />
            <p className="event-card-title mt-1">{trimTitle(local?.name)}</p>
            <p className="event-card-date">
                {local?.category?.[0]?.name}
            </p>
            <p className="event-card-location">{trimTitle(local?.location)}</p>
        </div>
    );
}



export function DestinyCard({ destiny }) {
    return (
        <div className='destiny-card'>
            <Image
                src={destiny.image}
                alt={destiny.name}
                className='destiny-card-image'
                layout="fill"
                objectFit="cover"
            />
            <div className='destiny-card-content'>
                <p className='title-onde-m'>{destiny.name}</p>
            </div>
        </div>
    );
}

export function LocalCategory({ category }) {
    return (
        <div className='local-category'>
            <p className="text-onde-s">{category}</p>
            <MdArrowOutward size={20} color='gray' />
        </div>
    );
}