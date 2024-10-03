import Image from "next/image";
import '../css/destinycard.css';

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