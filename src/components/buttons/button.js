"use client";
import React from 'react';
import '../css/button.css';

export default function ButtonOnde({title, onClick}) {
    return (
        <button className="button-onde" onClick={onClick}>
            {title}
        </button>
    );
}