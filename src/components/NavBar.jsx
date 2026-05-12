import React from 'react'

export default function NavBar() {
    return (
        <div className='navigation-bar'>
            <div className='navigation-bar-container'>
                <div>
                    <div className='logo-wrapper'>
                    </div>
                    <div className='nav-links-wrapper'>
                        <a href="#" className='nav-link'>Home</a>
                        <a href="#" className='nav-link'>Tutorials</a>
                        <a href="#" className='nav-link'>About</a>
                    </div>
                    <div className='nav-actions-wrapper'>
                        <button className='nav-action-button'>Login</button>
                        <button className='nav-action-button primary'>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
