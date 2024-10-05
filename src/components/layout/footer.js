import Image from 'next/image';
import '../css/footer.css';
import Logo from '../../assets/icons/icon.png';
import Playstore from '../../assets/images/playstore.png';
import Appstore from '../../assets/images/applestore.png';
import { MdFacebook } from 'react-icons/md';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className='flex w-full gap-[7vw]'>
                    <div className="flex flex-col items-start justify-start">
                        <Image
                            src={Logo}
                            alt="Instituto Nilia"
                            className="footer-logo"
                            priority
                        />
                        <div className='mt-3 flex flex-col items-start justify-start'>
                            <p className='text-onde-s'>
                                Conecte-se conosco
                            </p>
                            <div className='flex gap-3 mt-2'>
                                <div className="bg-white rounded-full flex items-center justify-center p-1 cursor-pointer">
                                    <MdFacebook size={15} color='#7034D4' />
                                </div>
                                <div className="bg-white rounded-full flex items-center justify-center p-1 cursor-pointer">
                                    <FaInstagram size={15} color='#7034D4' />
                                </div>
                                <div className="bg-white rounded-full flex items-center justify-center p-1 cursor-pointer">
                                    <FaTwitter size={15} color='#7034D4' />
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 flex flex-col items-start justify-start'>
                            <p className='text-onde-s'>
                                Faça já o download do aplicativo
                            </p>
                            <div className='flex gap-3 mt-2'>
                                <Image
                                    src={Playstore}
                                    alt="Playstore"
                                    className="footer-app"
                                />
                                <Image
                                    src={Appstore}
                                    alt="Appstore"
                                    className="footer-app"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2">
                        <p className='title-onde-s'>
                            Explore
                        </p>
                        <div className='flex flex-col items-start justify-start gap-4'>
                            <p className='text-onde-s link'>
                                Eventos
                            </p>
                            <p className='text-onde-s link'>
                                Locais
                            </p>
                            <p className='text-onde-s link'>
                                Organizadores
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2">
                        <p className='title-onde-s'>
                            Sobre nós
                        </p>
                        <div className='flex flex-col items-start justify-start gap-4'>
                            <p className='text-onde-s link'>
                                Quem somos
                            </p>
                            <p className='text-onde-s link'>
                                Missão
                            </p>
                            <p className='text-onde-s link'>
                                Serviços
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2">
                        <p className='title-onde-s'>
                            Patrocinadores
                        </p>
                        <div className='flex flex-col items-start justify-start gap-4'>
                            <p className='text-onde-s link'>
                                Yango
                            </p>
                            <p className='text-onde-s link'>
                                Standard Bank
                            </p>
                            <p className='text-onde-s link'>
                                ITCOM
                            </p>
                        </div>
                    </div>
                </div>
                <hr className='w-full mt-4' />
                <p className='text-onde-s mt-2 ml-auto'>
                    © 2024 ITCOM. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
}

export default Footer;