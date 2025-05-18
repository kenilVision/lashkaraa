import Link from 'next/link';

const SidebarItem = ({ item, onSelect }) => {
    return (
        <li>
            <Link
                href={item?.path}
                onClick={onSelect}
                className="flex items-center  py-3 text-[#001D3D] border-b border-[#001d3d1c] hover:bg-primary-50 hover:text-primary-700 transition-colors group"
            >
                <span className="font-medium">{item?.name}</span>
            </Link>
        </li>
    );
};

export default SidebarItem;