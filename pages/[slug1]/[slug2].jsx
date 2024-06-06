import Image from 'next/image';
import { GET_ALL_CATEGORIES, GET_SERVICES_BY_LOCATION, GET_SERVICES_BY_SLUG } from '../../graphql/query';
import apolloClient from '../../lib/apollo';
import SideCards from '../../components/SideCards';

const client = apolloClient();

export const dynamic = 'force-dynamic'

export async function getStaticPaths() {
    const { data: locationsData } = await client.query({
        query: GET_ALL_CATEGORIES,
    });

    const paths = [];

    for (const location of locationsData.categories.nodes) {
        const { data: servicesData } = await client.query({
            query: GET_SERVICES_BY_LOCATION,
            variables: {
                location: location.slug,
            },
        });

        servicesData.services.nodes.forEach(service => {
            paths.push({
                params: { slug1: location.slug, slug2: service.slug }
            });
        });
    }

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {

    const { slug2 } = params;

    const { data } = await client.query({
        query: GET_SERVICES_BY_SLUG,
        variables: {
            slug: slug2,
        },
    });

    if (data.services.nodes.length < 1) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            page: data.services,
        },
        revalidate: 60
    };
}


const ServicePage = () => {
    // const [locationServices, setLocationServices] = useState([])
    // const router = useRouter();

    // const { slug1 } = router.query;

    // const { data, error, loading } = useQuery(GET_SERVICES_BY_LOCATION, { variables: { location: slug1 } })

    // useEffect(() => {
    //     setLocationServices(data?.services?.nodes?.length > 0 ? data.services.nodes : []);
    // }, [data])

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    const services = ["Home Cleaning", "Carpet Cleaning", "Deep Cleaning", "Gutter Cleaning", "Trash Can Cleaning", "Window Cleaning", "Drain Cleaning"]

    return (
        <>
            <div className='text-center relative'>
                {/* <HeroImage src="/atlanta-skyline.jpg" alt="Atlanta Skyline" /> */}
                {/* <div className="flex flex-wrap justify-center bg-[url('/img/hero_bg.png')] bg-no-repeat bg-center bg-cover h-full">
                    <Image
                        src={require("../../public/img/nav_bg.png")}
                        className="flex justify-end w-full"
                        alt="Hero Illustration"
                        loading="lazy"
                        placeholder="blur"
                    />
                    <div className="absolute top-0 w-full h-auto text-center mt-10">
                        <div className="text-[#F4660F] text-3xl ">FIVE FINGER DISCOUNT</div>
                        <div className="text-[#F4660F] text-4xl">CLEANING SERVICE</div>
                    </div>
                    <Image
                        src={require("../../public/img/hero_img.png")}
                        className="flex justify-end"
                        alt="Hero Illustration"
                        loading="lazy"
                        placeholder="blur"
                        height={10}
                    />
                </div>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    // left: '50%',
                    // transform: 'translate(-50%, -50%)',
                    background: 'rgba(255, 87, 34, 0.8)',
                    padding: '20px',
                    borderRadius: '5px',
                }}>
                    <h1>HOME CLEANING IN ATLANTA, GA</h1>
                </div> */}

                <div className='w-64 top-[50%] right-[20%] absolute'>
                    <SideCards services={services}/>
                </div>

            </div>
        </>
    )
};

export default ServicePage;