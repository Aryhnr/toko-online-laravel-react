import DesignIcon from "../Icons/Design";
import FabricIcon from "../Icons/Fabric";
import LocalIcon from "../Icons/Local";
import PerfectIcon from "../Icons/Perfect";

const values = [
    {
        title: "Premium Fabric",
        desc: "Bahan adem & tahan lama",
        icon: FabricIcon,
    },
    {
        title: "Timeless Design",
        desc: "Gak lekang oleh tren",
        icon: DesignIcon,
    },
    {
        title: "Perfect Fit",
        desc: "Nyaman & proporsional",
        icon: PerfectIcon,
    },
    {
        title: "Proudly Local",
        desc: "Karya anak bangsa",
        icon: LocalIcon,
    },
];

export default function BrandValues() {
    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 mt-10 bg-white shadow-2xs">
            {values.map((item, i) => {
                const Icon = item.icon;
                return (
                    <div
                        key={i}
                        className="flex justify-center items-center gap-3 text-gray-600"
                    >
                        <Icon className="w-10 h-10" />
                        <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm">{item.desc}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
