import Image from "next/image";
import '../css/destinycard.css';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { MdArrowDropUp, MdArrowOutward, MdArrowUpward, MdSubdirectoryArrowRight } from "react-icons/md";

export function LocalCardHr() {

    const trimTitle = (title) => {
        if (title.length > 23) {
            return title.substring(0, 23) + '...';
        }
        return title;
    }



    return (
        <div className="event-card">
            <Image
                src="https://assets.milestoneinternet.com/highgate-hotels/nau-hotels/offers/rock-in-rio.png?time=1718822169"
                alt="EventImage"
                className="event-card-image"
                width={300}
                height={200}
            />
            <p className="event-card-title mt-1">{trimTitle('Mundos Restaurante')}</p>
            <p className="event-card-date">Restaurante</p>
            <p className="event-card-location">{trimTitle('Maputo')}</p>
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
                <p className='title-onde-l'>{destiny.name}</p>
            </div>
        </div>
    );
}

export function LocalCategory ({category}) {
    return (
        <div className='local-category'>
            <p className="text-onde-s">{category}</p>
            <MdArrowOutward size={20} color='gray' />
        </div>
    );
}