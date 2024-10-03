
import '../css/eventcard.css';
import Image from 'next/image';
import ProfileIcon from '../../assets/icons/profile.png';
import ButtonOnde from '../buttons/button';

export function EventCardHr() {

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
            <p className="event-card-title">{trimTitle('Rock in Rio')}</p>
            <p className="event-card-date">12 de Setembro</p>
            <p className="event-card-location">{trimTitle('Maputo')}</p>
            <p className="event-card-organizer">Nau Hotels</p>
        </div>
    );
}

export function Organizer() {
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
            <p className="event-card-title">{trimOrganizer('Nau Hotels')}</p>
            <ButtonOnde title="ver" />
        </div>
    );
}