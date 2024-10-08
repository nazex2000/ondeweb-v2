"use client";
import { Suspense } from "react";
import Image from "next/image";
import IconOnde from '../../assets/icons/icon.png';
import PhoneOnde from '../../assets/images/phone.png';
import PlayStore from '../../assets/images/playstore.png';
import AppStore from '../../assets/images/applestore.png';
import CoverImage from '../../assets/images/about.webp';
import '../../components/css/text.css';
import '../../components/css/explore.css';
import '../../components/css/layout.css';
import '../../components/css/about.css';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import '../../utilis/i18n';
import Head from "next/head";


export default function Page() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Head>
                    <title>{t("Onde - Sobre")}</title>
                    <meta name="description" content="Pesquisa e descobre Moçambique" />
                </Head>
                <div className="onde-container pb-4">
                    <div className="cover-about mb-4 px-[1rem]">
                        <Image
                            src={CoverImage}
                            alt="Cover"
                            className="about-cover-image"
                            fill
                        />
                        <div className="cover-about-content">
                            <Image
                                src={IconOnde}
                                alt="Icon"
                                width={70}
                                height={70}
                            />
                            <p className="px-8 title-onde-l md:title-onde-lg text-white w-full lg:w-1/2 text-center">
                                {t("Descobrindo Moçambique através de experiências inesquecíveis e lugares incríveis")}
                            </p>
                        </div>

                    </div>
                    <div className="onde-content items-center">
                        <Image
                            src={PhoneOnde}
                            alt="Phone"
                            width={250}
                            height={'auto'}
                            className="hidden md:block"
                        />
                        <div className="flex-col flex gap-2 px-0 md:px-8">
                            <p className="title-onde-l text-[#5f2fbc]">{t("Sobre a ONDE")}</p>
                            <p className="text-onde-s">
                                {t("A ONDE é uma plataforma digital que conecta pessoas a experiências inesquecíveis e lugares incríveis em Moçambique. Através da nossa plataforma, os viajantes podem descobrir e reservar experiências únicas, desde eventos culturais e festivais a passeios turísticos e atividades ao ar livre. A nossa missão é ajudar os viajantes a explorar o melhor que Moçambique tem para oferecer, ao mesmo tempo que apoiamos as comunidades locais e promovemos o turismo sustentável no país")}.
                            </p>
                            <p className="title-onde-l text-[#5f2fbc]">{t("Conheça o nosso aplicativo móvel")}</p>
                            <p className="text-onde-s">
                                {t("Faça o download do nosso aplicativo móvel para descobrir as melhores experiências em Moçambique, onde quer que esteja. Com o nosso aplicativo, pode explorar eventos, locais e atividades em todo o país, reservar bilhetes e receber atualizações em tempo real sobre eventos e ofertas especiais. Não perca a oportunidade de descobrir o melhor de Moçambique com a ONDE!")}
                            </p>
                            <div className="flex gap-4">
                                <Image
                                    src={PlayStore}
                                    alt="PlayStore"
                                    width={150}
                                    height={50}
                                    className="cursor-pointer"
                                    onClick={() => window.location.href = "https://play.google.com/store/apps/details?id=com.ondeapp&pcampaignid=web_share"}
                                />
                                <Image
                                    src={AppStore}
                                    alt="AppStore"
                                    width={150}
                                    height={50}
                                    className="cursor-pointer"
                                    onClick={() => window.location.href = "https://apps.apple.com/us/app/onde-mz/id6503192341"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </>
    )
}