import React, { useEffect, useState } from "react";

export default function Page({children, pageTitle = ''}) {
    return (
            <div>
                <header>
                </header>

                <main>
                    {children}
                </main>

                <footer>
                </footer>
            </div>
    );
}