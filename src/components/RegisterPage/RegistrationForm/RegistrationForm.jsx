import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useState } from 'react';
import Icon from '../../../shared/Icon/Icon';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const FormSchema = Yup.object({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string().required('Please enter your password'),
  });

  const {
    register,
    handleSubmit,
    reset,
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
    console.log(data);
    reset();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <label className={css.labelWrapper}>
        <input
          type="text"
          {...register('name')}
          placeholder="Name"
          className={clsx(css.input, { [css.inputError]: errors.name })}
        />
        <p className={css.errorMessage}>{errors.name?.message}</p>
      </label>
      <label className={css.labelWrapper}>
        <input
          type="email"
          {...register('email')}
          placeholder="Email"
          className={clsx(css.input, { [css.inputError]: errors.email })}
        />
        <p className={css.errorMessage}>{errors.email?.message}</p>
      </label>
      <label className={css.labelWrapper}>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder="Password"
          autoComplete="on"
          className={clsx(css.input, { [css.inputError]: errors.password })}
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
        <p className={css.errorMessage}>{errors.password?.message}</p>
      </label>
      <button type="submit" className={css.btn}>
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
