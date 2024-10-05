import AppBar from '../AppBar/AppBar';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={css.container}>
      <AppBar />
      <main className={css.content}>{children}</main>
    </div>
  );
};

export default Layout;
