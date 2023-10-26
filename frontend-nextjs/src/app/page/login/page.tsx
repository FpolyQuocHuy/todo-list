'use client'


import { AppDispatch, RootState } from '@/redux-store/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../../utils/alert/alert';
import { useRouter } from 'next/navigation';
import { getStatus, loginAsync } from '@/redux-store/login-reducer/loginSlice';

const Login = () => {
    const status = useSelector((state: RootState) => state.authenticationState.status);
    // const status: any = useSelector(getStatus);

    const router = useRouter()
    const dispatch: AppDispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [statusLogin, setStatus] = useState('');



    const handleLogin = async () => {
        const user = {
            userName,
            password
        }
        const response = await dispatch(loginAsync(user))
        if (response) {
            localStorage.setItem("user", response.payload.userName);
            localStorage.setItem("token", response.payload.jwtToken);
            router.push('/')
        } else {
            showAlert('error', 'đăng nhâpkj thất bại')
        }
    };


    // console.log(" status", status);
    return (
        <div className="login-screen row vw-100" style={{ height: '100%', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>

            <div className='box-login col-md-5'>
                <div className="card m-lg-4" style={{ padding: '25px' }}>
                    <div className="header-form" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        <h5 className="login-text">
                            Đăng nhập
                        </h5>
                    </div>

                    <div className="line" style={{ borderBottom: '1px solid #C0C0C0', margin: '15px 0 20px 0' }}></div>

                    <div className="input-group mb-3 mt-2">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Tên đăng nhập"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />

                    </div>
                    <div className="input-group mt-2">
                        <input
                            className="form-control"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>



                    <div className="row">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary btn-block" onClick={() => { handleLogin() }}>
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;