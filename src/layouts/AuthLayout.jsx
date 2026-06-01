import { Outlet } from "react-router-dom";
import './AuthLayout.css';

export default function AuthLayout() {
    return (
        <div className="auth-layout">
            <div className="auth-layout__floating auth-layout__floating--top-left">🍽️</div>
            <div className="auth-layout__floating auth-layout__floating--top-right">🥘</div>
            <div className="auth-layout__floating auth-layout__floating--bottom-left">🍛</div>
            <div className="auth-layout__floating auth-layout__floating--bottom-right">🥗</div>

            <div className="auth-layout__card">
                <div className="auth-layout__brand">
                    <div className="auth-layout__logo">🍽️</div>
                    <h1 className="auth-layout__title">Catering</h1>
                </div>

                <Outlet />

                <div className="auth-layout__footer">
                    <p className="auth-layout__footer-text">
                        © 2025 Catering App. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}