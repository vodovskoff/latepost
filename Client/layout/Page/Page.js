import React, { useEffect, useState } from "react";
import s from './Page.module.scss';

export default function Page({children, pageTitle = ''}) {
    return (
            <div classname={s.Page}>
                <header>
                </header>

                <main className={s.main}>
                    {children}
                </main>

                <footer>
                </footer>
            </div>
    );
}