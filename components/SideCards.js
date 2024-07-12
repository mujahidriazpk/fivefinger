import Image from 'next/image';
import ListImage from './ListImage';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SideCards = ({ services, servicesLoading }) => {

    const router = useRouter();
    const { slug1 } = router.query;
    return (
        <>
            {(services && services.length > 0) &&
                <div className='bg-secondary p-5 rounded-lg text-left'>
                    <h1 className='text-primary mb-3 text-lg'>OTHER SERVICES IN {slug1}</h1>
                    {servicesLoading ? <p>Loading...</p> :
                        services.map((service, index) => {
                            return (
                                <li key={index} className="py-1 flex items-center mb-2 font-shadows">
                                    <ListImage key={index} />
                                    <Link href={"/" + slug1 + "/" + service.slug}>
                                        {service.title}
                                    </Link>
                                </li>
                            )
                        })}
                </div>
            }
            <div className='bg-secondary mt-2 text-primary rounded-lg p-5'>
                <h1>MY top 10 service areas</h1>
                <Image
                    src={require("../public/img/map.png")}
                    className="mt-2"
                    alt="Hero Illustration"
                    loading="lazy"
                    placeholder="blur"
                />
            </div>

            <div className='bg-secondary mt-2 text-primary rounded-lg p-5 flex flex-col justify-center items-center'>
                <h1>Shop Cleaning Supplies</h1>
                <Image
                    src={require("../public/img/smile2.png")}
                    className="mt-2"
                    alt="Smile"
                    loading="lazy"
                    placeholder="blur"
                />
                <li className="py-1 flex items-center mb-2 font-shadows text-black">
                    My cleaning supplies are the best. Extremely good in removing finger prints
                </li>
            </div>
        </>
    )
}

export default SideCards;