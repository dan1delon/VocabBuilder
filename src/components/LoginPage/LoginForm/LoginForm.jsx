import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useState } from 'react';
import Icon from '../../../shared/Icon/Icon';
import { NavLink } from 'react-router-dom';
import css from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { loginAPI } from '../../../redux/auth/operations';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const dispatch = useDispatch();

  const FormSchema = Yup.object({
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
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    dispatch(loginAPI(data));
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
          <h2 className={css.headline}>Login</h2>
          <p className={css.text}>
            Please enter your login details to continue using our service:
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
            Login
          </button>
          <NavLink to="/register" className={css.linkLogin}>
            Register
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
