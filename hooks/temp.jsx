import React, { useEffect, useRef, useCallback, useContext } from 'react';
import PlaceHolder from '../../assets/images/PlaceholderLogo.png';
import AccountMenuComponent from './AccountMenu.jsx';

const Header = props => {

    //  const { user, token } = useContext(AppContext)
    const { token } = props;


    return (
        <>
            <div
                id="HeaderWrapper"
                className={HeaderStyle}>
                <div
                    id="DesktopHeader"
                    className={DesktopStyle}>
                    <img
                        src={PlaceHolder}
                        className={LogoStyle}
                        onClick={useCallback(() => GoHome(navigate), [navigate])}
                    />
                    <div
                        id="DesktopMenuLinks"
                        className={DesktopMenuLinks}
                    >
                        <div className="inline-block" onClick={useCallback(() => GoHome(navigate), [navigate])}>Home</div>
                        {token ?
                            <>
                                <div
                                    id="AccountLink"
                                    className="inline-block"
                                    onClick={useCallback(() => toggleAccountMenu(), [])}
                                >User</div>
                                <AccountMenuComponent AccountMenuRef={AccountMenuRef} />
                            </>
                            :
                            <div
                                className="inline-block"
                                onClick={useCallback(() => GoSignIn(navigate), [navigate])}>Sign In</div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;  