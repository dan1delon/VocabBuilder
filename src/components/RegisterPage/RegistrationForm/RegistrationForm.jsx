import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useState } from 'react';
import Icon from '../../../shared/Icon/Icon';
import css from './RegistrationForm.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAPI } from '../../../redux/auth/operations';
import GoogleOAuthButton from '../../LoginPage/GoogleOAuthButton/GoogleOAuthButton';

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const dispatch = useDispatch();

  const FormSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be less than 30 characters')
      .required('Name is required'),

    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

    password: Yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    dispatch(registerAPI(data));
    reset();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordFocus = () => {
    setIsPasswordTouched(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(false);
  };

  return (
    <div className={css.mainWrapper}>
      <div className={css.secondWrapper}>
        <div className={css.headlineWrapper}>
          <h2 className={css.headline}>Register</h2>
          <p className={css.text}>
            To start using our services, please fill out the registration form
            below. All fields are mandatory:
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <label className={css.labelWrapper}>
            <input
              type="text"
              {...register('name')}
              placeholder="Name"
              className={clsx(css.input, { [css.inputError]: errors.name })}
            />
            {errors.name && (
              <div className={css.messageWrapper}>
                <Icon className={css.iconMessage} iconId="icon-error" />
                <p className={css.errorMessage}>{errors.name?.message}</p>
              </div>
            )}
          </label>
          <label className={css.labelWrapper}>
            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className={clsx(css.input, { [css.inputError]: errors.email })}
            />
            {errors.email && (
              <div className={css.messageWrapper}>
                <Icon className={css.iconMessage} iconId="icon-error" />
                <p className={css.errorMessage}>{errors.email?.message}</p>
              </div>
            )}
          </label>
          <label className={css.labelWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Password"
              autoComplete="on"
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className={clsx(css.input, {
                [css.inputError]: errors.password,
                [css.inputSuccess]: !errors.password && getValues('password'),
              })}
            />
            <button
              className={css.showPasswordBtn}
              type="button"
              onClick={handleClickShowPassword}
            >
              {showPassword ? (
                <Icon className={css.icon} iconId="icon-eye-off" />
              ) : (
                <Icon className={css.icon} iconId="icon-eye" />
              )}
            </button>
            <div className={css.messageWrapper}>
              {!errors.password &&
                isPasswordTouched &&
                getValues('password') && (
                  <>
                    <Icon className={css.iconMessage} iconId="icon-success" />
                    <p className={clsx(css.errorMessage, css.successMessage)}>
                      Password is valid!
                    </p>
                  </>
                )}
              {errors.password && (
                <>
                  <Icon className={css.iconMessage} iconId="icon-error" />
                  <p className={css.errorMessage}>{errors.password.message}</p>
                </>
              )}
            </div>
          </label>
          <button type="submit" className={css.btn}>
            Register
          </button>
          <GoogleOAuthButton />
          <NavLink to="/login" className={css.linkLogin}>
            Login
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
