// utils
import {lazy} from 'react';

// hooks
import {useState} from 'react';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import LoginForm from '@layout/login/LoginForm';
const PasswordReminder = lazy(() => import('@layout/login/PasswordReminder'));

const Login = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <>
            <Title title="Login"/>
            <SimplePageHeader title="User login"/>
            <main>
                <div className="section mt-0">
                    <div className="container">
                        <LoginForm setIsModalVisible={setIsModalVisible}/>
                    </div>
                </div>
            </main>
            <PasswordReminder isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
        </>
    );
}

export default Login