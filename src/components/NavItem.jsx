export function NavItem({ href, label }) {
    return (
        <li>
            <a href={href} className="text-gray-600 font-semibold hover:text-blue-800 transition-colors">
                {label}
            </a>
        </li>
    );
}