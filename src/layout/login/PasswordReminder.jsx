// styling
import styled from 'styled-components/macro';

// components
import StyledModal from '@ui/StyledModal';
import {toast} from 'react-toastify';
import GradientBtn from '@ui/GradientBtn';

// hooks
import {useForm} from 'react-hook-form';

// utils
import classNames from 'classnames';

const StyledPasswordReminder = styled(StyledModal)`
  text-align: center;
  
  .content {
    max-width: 400px;
    
    &_title {
      margin-bottom: 20px;
    }
  }
`;

const ModalWindow = ({isModalVisible, setIsModalVisible}) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const onSubmit = () => {
        reset();
        setIsModalVisible(false);
        toast.success('New password was sent to your email');
    }

    const handleCancel = () => {
        reset();
        setIsModalVisible(false);
    }

    return (
        <StyledPasswordReminder open={isModalVisible} onClose={handleCancel}>
            <h6 className="content_title">Your Email address</h6>
            <form className="d-flex flex-column g-20">
                <input className={classNames('field field--outline', {'field--error': errors.email})}
                       type="text"
                       placeholder="Email"
                       {...register('email', {required: true, pattern: /^\S+@\S+$/i})} />
                <GradientBtn tag="button" type="submit" onClick={handleSubmit(onSubmit)}>Send</GradientBtn>
            </form>
        </StyledPasswordReminder>
    )
}

export default ModalWindow