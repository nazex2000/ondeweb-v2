"use client";
import { useState, useEffect } from "react"
import '../../components/css/text.css';
import '../../components/css/explore.css';
import '../../components/css/layout.css';
import '../../components/css/contact.css';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { MdLocationPin, MdMail, MdPhone } from "react-icons/md";

function Bread() {
    return (
        <Breadcrumbs>
            <BreadcrumbItem
                href="/"
            >
                <p className="text-onde-xs">Home</p>
            </BreadcrumbItem>
            <BreadcrumbItem
                href="/contactos"
            >
                <p className="text-onde-xs">Contactos</p>
            </BreadcrumbItem>
        </Breadcrumbs>
    );
}


export default function Page() {
    return (
        <div className="onde-container">
            <div className="onde-content flex-col pb-4">
                <Bread />
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4">
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-4 pr-8">
                        <p className="title-onde-l text-[#5f2fbc] pr-8" style={{fontSize: '2.4rem', lineHeight:'45px', fontWeight:'700'}}>Encontre a melhor solução para o seu negócio com a ONDE</p>
                        <p className="text-onde-s">
                            Aproveite o maior mercado de eventos do mundo e alcance mais consumidores que procuram eventos como o seu com nossas ferramentas de marketing de eventos líderes do setor. Pronto para dar vida ao seu próximo evento?
                        </p>
                        <p className="text-onde-s">
                            A nossa equipa de especialistas está pronta para ajudar a sua empresa a crescer. Entre em contacto connosco para saber mais sobre as nossas soluções de marketing de eventos.
                        </p>
                        <p className="text-onde-s flex items-center gap-2">
                            <MdLocationPin size={20} color="#5f2fbc" />
                            <span>Av. Julius Nyerere 657, 2º Andar, Porta 3, Maputo, Moçambique</span>
                        </p>
                        <p className="text-onde-s flex items-center gap-2">
                            <MdPhone size={20} color="#5f2fbc" />
                            <span>21-486 630</span>
                        </p>
                        <p className="text-onde-s flex items-center gap-2">
                            <MdMail size={20} color="#5f2fbc" />
                            <span>info@onde.co.mz</span>
                        </p>
                        <div className="w-full p-4 bg-[#EFEFEF] rounded-lg">
                            <p className="title-onde-s text-center text-[#5f2fbc]">Horário de Atendimento</p>
                            <p className="text-onde-s text-center">Segunda a Sexta-feira: 08:00 - 17:00</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-4">
                        <form className="flex flex-col gap-4 w-full px-12">
                            <input type="text" placeholder="Nome" className="input-onde" />
                            <input type="email" placeholder="Email de Trabalho" className="input-onde" />
                            <input type="text" placeholder="Telefone" className="input-onde" />
                            <input type="text" placeholder="Nome da Empresa" className="input-onde" />
                            <input type="text" placeholder="Assunto" className="input-onde" />
                            <textarea placeholder="Mensagem" className="input-onde h-36"></textarea>
                            <button className="btn-onde">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}