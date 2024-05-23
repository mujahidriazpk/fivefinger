// components/SectionComponent.js

import { useState, useEffect } from 'react';
import Image from "next/image";
import Container from "../components/container";
import SectionTitle from "../components/sectionTitle";
import { useQuery } from '@apollo/client';
import smileImg from "../public/img/smile.png";
import btnsignupImg from "../public/img/btn_signup.png";
import btnreviewImg from "../public/img/btn_review.png";
import { GET_SECTION_BY_TITLE } from '../graphql/query'; //Made the file for graphql queries from which we import whenever we need

const SectionComponent = ({ title }) => {
    const [section, setSection] = useState(null);

    //Made use of useQuery hook of apollo for optimized cliet-end fetch
    const { data, error, loading } = useQuery(GET_SECTION_BY_TITLE, { variables: { title: title } })

    useEffect(() => {
        //Set the data as soon as its fetched
        if (data) {
            setSection(data.sections.nodes.length > 0 ? data.sections.nodes[0] : null);
        }
    }, [data])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!section) return <div>Section not found</div>;
    if (section.sectionsFields.layout === 'full') {
        return (
            <div>
                <div className="flex flex-wrap justify-center h-full">
                    <Container>
                        <div className="text-[#F4660F] text-4xl text-center uppercase">{section.title}</div>
                    </Container>
                    <Image
                        src={section.sectionsFields.mainImage}
                        className="flex justify-end w-full"
                        width="1200"
                        height="500"
                        alt={section.title}
                        loading="eager"
                    />
                </div>
            </div>
        );
    } else if (section.sectionsFields.layout === 'steps') {
        return (
            <div>
                <Container>
                    <div className="text-[#F4660F] text-4xl text-center uppercase">{section.title}</div>
                </Container>
                <SectionTitle pretitle="" title="">
                    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                        <div className="flex flex-col justify-between text-center w-full h-full">
                            <Image
                                src={section.sectionsFields.step1}
                                className="flex m-auto"
                                width="1200"
                                height="500"
                                alt={section.title}
                            />
                        </div>
                        <div className="flex flex-col justify-center text-center w-full h-full">
                            <Image
                                src={section.sectionsFields.step2}
                                className="flex m-auto"
                                width="1200"
                                height="500"
                                alt={section.title}
                            />
                        </div>
                        <div className="flex flex-col justify-between text-center w-full h-full">
                            <Image
                                src={section.sectionsFields.step3}
                                className="flex m-auto"
                                width="1200"
                                height="500"
                                alt={section.title}
                            />
                        </div>
                    </div>
                </SectionTitle>
            </div>
        );
    } else if (section.sectionsFields.layout === 'pricing') {
        return (
            <div>
                <div className="flex flex-wrap bg-[#FFEDE2]">
                    <Container className="flex flex-wrap py-0 justify-center text-centers">
                    <Image
                        src={section.sectionsFields.mainImage}
                        className="flex justify-end w-full"
                        width="1200"
                        height="500"
                        alt={section.title}
                        loading="eager"
                    />
                        <div className="text-[#F4660F] text-4xl text-center uppercase w-full">{section.title}</div>
                        <SectionTitle className="m-0">
                        {section.content}
                        </SectionTitle>
                        <div className="max-w-2xl py-4 text-lg leading-normal">
                            <div className="grid gap-5 grid-cols-3">
                                <Image
                                    src={smileImg}
                                    className="flex m-auto"
                                    alt="Hero Illustration"
                                    loading="eager"
                                    placeholder="blur"
                                />
                                <Image
                                    src={btnsignupImg}
                                    className="flex m-auto"
                                    alt="Hero Illustration"
                                    loading="eager"
                                    placeholder="blur"
                                />
                                <Image
                                    src={smileImg}
                                    className="flex m-auto"
                                    alt="Hero Illustration"
                                    loading="eager"
                                    placeholder="blur"
                                />
                            </div>
                        </div>
                        <Image
                        src={section.sectionsFields.otherImage}
                        className="flex justify-end w-full"
                        width="1200"
                        height="500"
                        alt={section.title}
                        loading="eager"
                    />
                    </Container>
                </div>
            </div>
        );
    } else {

        return (
            <div>

                <Container>
                    <div className="text-[#F4660F] text-4xl text-center">{section.title}</div>
                    {section.content && (<div dangerouslySetInnerHTML={{ __html: section.content }} /> )}
                    <Image
                        src={section.sectionsFields.mainImage}
                        className="flex m-auto mt-20"
                        width="1200"
                        height="500"
                        alt={section.title}
                        loading="lazy"
                    />
                </Container>

                {/*
          <h1>{section.title} {section.sectionsFields.hasBackgroundImage}</h1>
          <img
                  src={section.sectionsFields.mainImage}
                  alt={section.title}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
      */}
            </div>
        );
    }

};

export default SectionComponent;
