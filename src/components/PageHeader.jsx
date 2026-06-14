import { Link } from 'react-router-dom';

export default function PageHeader({ title, breadcrumb, children }) {
    const renderBreadcrumb = () => {
        if (Array.isArray(breadcrumb) && breadcrumb.length > 0) {
            return (
                <div id="breadcrumb-links" className="flex flex-wrap items-center gap-2 text-sm text-[#7c4129] mt-2">
                    {breadcrumb.map((item, index) => (
                        <span key={index} className="flex items-center gap-2">
                            {item.path ? (
                                <Link to={item.path} className="text-[#7c4129] hover:text-[#d87d59] transition-colors">
                                    {item.name}
                                </Link>
                            ) : (
                                <span>{item.name}</span>
                            )}
                            {index < breadcrumb.length - 1 && <span className="text-[#d87d59]">/</span>}
                        </span>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div id="pageheader-container" className="flex flex-col gap-4 rounded-[28px] border border-[#e7c3b4] bg-[#fff3ec] p-4 md:flex-row md:items-center md:justify-between">
            <div id="pageheader-left" className="flex flex-col leading-tight">
                <span id="pageheader-title" className="text-3xl font-semibold text-[#5e2f1f]">{title}</span>
                {renderBreadcrumb()}
            </div>
            <div id="action-button">{children}</div>
        </div>
    );
}
