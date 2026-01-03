import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import AccountIcon from "@/Icons/Account";

export default function UserMenu() {
    return (
        <Dropdown
            align="right"
            trigger={
                <div className="icon-button cursor-pointer">
                    <AccountIcon className="w-5 h-5" />
                </div>
            }
        >
            <Link href="/profile" className="dropdown-item">
                Profil
            </Link>
            <Link href="/orders" className="dropdown-item">
                Pesanan
            </Link>
            <Link
                href="/logout"
                method="post"
                as="button"
                className="dropdown-item text-red-600"
            >
                Logout
            </Link>
        </Dropdown>
    );
}
