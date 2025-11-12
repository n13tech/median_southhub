'use client';

import { Button, Input, Modal } from 'antd';

import './modal-with-form.css';
import { FONT_MONT_BOOK } from '@/app/fonts';
import { useState } from 'react';

type Props = {
    open: boolean;
    onClose: () => void;
}

export const ModalWithForm = ({ open, onClose }: Props) => {
    const [isValid, setValid] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [job, setJob] = useState('');
    const [telega, setTelega] = useState('');

    const validateEmail = () => /^([a-zA-Z0-9-._])+@([a-zA-Z0-9-_.])+\.([a-zA-Z]{2,30})$/i.test(email.trim());
    const validateText = (text: string) => text.trim().length !== 0;

    const handleClick = () => {
        setValid(true);
    }

    return (
        <Modal
            title={<p className={`${FONT_MONT_BOOK.className}`}>Заявка на участие</p>}
            open={open}
            onCancel={onClose}
            centered
            closable={false}
            className='modal-with-form'
            rootClassName='modal-with-form-root'
            wrapClassName='modal-with-form-wrapp'
            footer={null}
        >
            <div className='modal-with-form-block-wrapper'>
                <div>
                    <Input
                        className={`${FONT_MONT_BOOK.className} modal-with-form-input`}
                        placeholder='Ваше имя и фамилия'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        status={isValid && !validateText(name) ? 'error' : ''}
                    />
                    {isValid && !validateText(name) && <p className={`${FONT_MONT_BOOK.className} modal-with-form-input-hint-error`}>Пожалуйста, введите имя и фамилию</p>}
                </div>

                <div>
                    <Input
                        className={`${FONT_MONT_BOOK.className} modal-with-form-input`}
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        status={isValid && !validateEmail() ? 'error' : ''}
                    />
                    {isValid && !validateEmail() && <p className={`${FONT_MONT_BOOK.className} modal-with-form-input-hint-error`}>Пожалуйста, введите email в формате example@email.com</p>}
                </div>

                <div>
                    <Input
                        className={`${FONT_MONT_BOOK.className} modal-with-form-input`}
                        placeholder='Компания'
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        status={isValid && !validateText(company) ? 'error' : ''}
                    />
                    {isValid && !validateText(company) && <p className={`${FONT_MONT_BOOK.className} modal-with-form-input-hint-error`}>Пожалуйста, введите название компании</p>}
                </div>

                <div>
                    <Input
                        className={`${FONT_MONT_BOOK.className} modal-with-form-input`}
                        placeholder='Должность'
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        status={isValid && !validateText(job) ? 'error' : ''}
                    />
                    {isValid && !validateText(job) && <p className={`${FONT_MONT_BOOK.className} modal-with-form-input-hint-error`}>Пожалуйста, введите вашу должность</p>}
                </div>

                <div>
                    <Input
                        className={`${FONT_MONT_BOOK.className} modal-with-form-input`}
                        placeholder='Телеграм'
                        value={telega}
                        onChange={(e) => setTelega(e.target.value)}
                        status={isValid && !validateText(telega) ? 'error' : ''}
                    />
                    {isValid && !validateText(telega) && <p className={`${FONT_MONT_BOOK.className} modal-with-form-input-hint-error`}>Пожалуйста, введите @username или ссылку</p>}
                    {!isValid || validateText(telega) && <p className={`${FONT_MONT_BOOK.className} modal-with-form-input-hint`}>@username или ссылка</p>}
                </div>
            </div>

            <div className='modal-with-form-block-button-wrapper'>
                <Button
                    variant='outlined'
                    color='default'
                    onClick={handleClick}
                    className={`${FONT_MONT_BOOK.className} modal-with-form-submit`}
                >
                    Связаться с нами
                </Button>
                
                <p className={`${FONT_MONT_BOOK.className} modal-with-form-block-button-text`}>
                    {`Нажимая кнопку Подать заявку, вы даёте\nСогласие на обработку персональных данных, и принимаете\nПолитику конфеденциальности`}
                </p>
            </div>
        </Modal>
    );
};
