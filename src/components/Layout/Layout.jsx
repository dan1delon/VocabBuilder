import css from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={css.container}>
      <main className={css.content}>{children}</main>
    </div>
  );
};

export default Layout;
