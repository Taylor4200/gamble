import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
    <div className="flex min-h-screen bg-gray-950 text-white">
        <Sidebar />

        {/* Main Page Content will display here */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            {children}
        </main>
    </div>
);

export default Layout;