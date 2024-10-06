"use client";
import { useState, useEffect } from "react"
import '../../components/css/text.css';
import '../../components/css/explore.css';
import '../../components/css/layout.css';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

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
            </div>
        </div>
    )
}