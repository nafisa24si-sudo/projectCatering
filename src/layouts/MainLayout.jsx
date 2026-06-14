import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#fff1e6]">
      <Sidebar />
      <div className="lg:ml-[280px] flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-24 px-4 pb-10 sm:px-6 lg:px-8 bg-[#fff4eb]">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
