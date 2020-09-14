import React from 'react';
import logo from '../c8ffe006-9009-4fc2-aa49-894884473503_200x200.png';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <div className="header">
            <Link to="/songs">
                <img src={logo} id="logo" alt="logo"/>
            </Link>
            <a className="link" href="https://github.com/TheAlmightyCrumb" target="_blank" rel="noopener noreferrer">@TheAlmightyCrumb on GitHub</a>
        </div>
    )
}
