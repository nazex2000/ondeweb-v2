
import '../css/eventcard.css';
import Image from 'next/image';
import ProfileIcon from '../../assets/icons/profile.png';
import ButtonOnde from '../buttons/button';

export function EventCardHr({ event }) {

    const trimTitle = (title) => {
        if (title?.length > 23) {
            return title.substring(0, 23) + '...';
        }
        return title;
    }

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
        <div className="event-card" onClick={() => window.location.href = `/eventos/${event?.id}`}>
            <Image
                src={event?.coverImage}
                alt="EventImage"
                className="event-card-image"
                width={300}
                height={200}
            />
            <p className="event-card-title mt-1">{trimTitle(event?.name)}</p>
            <p className="event-card-date">{timestampToDate(event?.data) + ' ' + event?.time}</p>
            <p className="event-card-location">{trimTitle(event?.locationName)}</p>
            <p className="event-card-organizer">{trimTitle(event?.organizer?.name)}</p>
        </div>
    );
}

export function EventCardVr({ event }) {

    const trimTitle = (title) => {
        if (title?.length > 23) {
            return title.substring(0, 23) + '...';
        }
        return title;
    }

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
        <div className="event-card-vr" onClick={() => window.location.href = `/eventos/${event?.id}`}>
            <Image
                src={event?.coverImage}
                alt="EventImage"
                className="event-card-image-vr eci-vr-ext"
                width={300}
                height={200}
            />
            <div className="flex flex-col gap-2 content-vr">
                <p className="event-card-title mt-1">{(event?.name)}</p>
                <p className="event-card-date">{timestampToDate(event?.data) + ' ' + event?.time}</p>
                <p className="event-card-location">{(event?.locationName)}</p>
                <p className="event-card-organizer">{(event?.organizer?.name)}</p>
            </div>
        </div>
    );
}

export function Organizer({ organizer }) {
    const trimOrganizer = (organizer) => {
        if (organizer.length > 14) {
            return organizer.substring(0, 14) + '...';
        }
        return organizer
    }
    return (
        <div className="organizer-card">
            <Image
                src={ProfileIcon}
                alt="EventImage"
                className="organizer-card-image"
            />
            <p className="event-card-title">{trimOrganizer(organizer.name)}</p>
            <ButtonOnde title="ver" />
        </div>
    );
}