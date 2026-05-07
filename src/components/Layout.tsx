import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand">
          Quiz Notebook
        </NavLink>
        <nav className="nav-links" aria-label="主导航">
          <NavLink to="/">首页</NavLink>
          <NavLink to="/quiz/random">随机刷题</NavLink>
          <NavLink to="/quiz/sequential">顺序刷题</NavLink>
          <NavLink to="/wrong-book">错题集</NavLink>
        </nav>
      </header>
      <main className="app-container">
        <Outlet />
      </main>
    </div>
  );
}
