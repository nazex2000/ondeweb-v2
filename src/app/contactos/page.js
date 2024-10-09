"use client";
import { useState, useEffect, Suspense } from "react"
import '../../components/css/text.css';
import '../../components/css/explore.css';
import '../../components/css/layout.css';
import '../../components/css/contact.css';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { MdLocationPin, MdMail, MdPhone } from "react-icons/md";
import { useTranslation } from "react-i18next";
import '../../utilis/i18n';
import Head from "next/head";


export default function Page() {
    const { t, i18n } = useTranslation();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head>
                <title>{t("Onde - Contactos")}</title>
                <meta name="description" content="Pesquisa e descobre Moçambique" />
            </Head>
            <div className="onde-container bg-gray-100">
                <div className="onde-content flex-col pb-4 bg-white my-8 rounded-lg shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 gap-4">
                        <div className="w-full md:w-1/2 flex flex-col items-start md:items-start pr-8">
                            <p className="title-onde-sm text-[#5f2fbc]" style={{ textAlign: "left" }}>{t("Contactos")}</p>
                            <p className="title-onde-l md:text-onde-lg text-[#5f2fbc] pr-8" style={{ fontWeight: 700 }}>{t("Encontre a melhor solução para o seu negócio com a ONDE")}</p>
                            <p className="text-onde-s mt-3">
                                {t("Aproveite o maior mercado de eventos do mundo e alcance mais consumidores que procuram eventos como o seu com nossas ferramentas de marketing de eventos líderes do setor. Pronto para dar vida ao seu próximo evento")}?
                            </p>
                            <p className="text-onde-s">
                                {t("A nossa equipa de especialistas está pronta para ajudar a sua empresa a crescer. Entre em contacto connosco para saber mais sobre as nossas soluções de marketing de eventos")}.
                            </p>
                            <p className="text-onde-s flex items-center gap-2 mt-2">
                                <MdLocationPin size={20} color="#5f2fbc" />
                                <span>Av. Julius Nyerere 657, 2º Andar, Porta 3, Maputo, Moçambique</span>
                            </p>
                            <p className="text-onde-s flex items-center gap-2 mt-2">
                                <MdPhone size={20} color="#5f2fbc" />
                                <span>21-486 630</span>
                            </p>
                            <p className="text-onde-s flex items-center gap-2 mt-2">
                                <MdMail size={20} color="#5f2fbc" />
                                <span>info@onde.co.mz</span>
                            </p>
                            <div className="w-full p-4 bg-[#EFEFEF] rounded-lg mt-3">
                                <p className="title-onde-s text-center text-[#5f2fbc]">{t("Horário de Atendimento")}</p>
                                <p className="text-onde-s text-center">{t("Segunda a Sexta-feira")}: 08:00 - 17:00</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col items-start md:items-center md:items-start gap-4">
                            <p className="title-onde-l text-[#5f2fbc] px-0 md:px-12">{t("Fale Conosco")}</p>
                            <form className="flex flex-col gap-4 w-full px-0 md:px-12">
                                <input type="text" placeholder={t("Nome")} className="input-onde" />
                                <input type="email" placeholder={t("Email de Trabalho")} className="input-onde" />
                                <input type="text" placeholder={t("Telefone")} className="input-onde" />
                                <input type="text" placeholder={t("Nome da Empresa")} className="input-onde" />
                                <input type="text" placeholder={t("Assunto")} className="input-onde" />
                                <textarea placeholder={t("Mensagem")} className="input-onde h-36"></textarea>
                                <button className="btn-onde">{t("Enviar")}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}