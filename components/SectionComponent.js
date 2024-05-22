// components/SectionComponent.js

import { useState, useEffect } from 'react';
import Image from "next/image";
import Container from "../components/container";
import { useQuery } from '@apollo/client';
import { GET_SECTION_BY_TITLE } from '../graphql/query'; //Made the file for graphql queries from which we import whenever we need

const SectionComponent = ({ title }) => {
    const [section, setSection] = useState(null);

    //Made use of useQuery hook of apollo for optimized cliet-end fetch
    const {data, error, loading} = useQuery(GET_SECTION_BY_TITLE, {variables: {title: title}})

    useEffect(() => {
      //Set the data as soon as its fetched
      if(data){
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
    } else {
        return (
            <div>

                <Container>
                    <div className="text-[#F4660F] text-4xl text-center">{section.title}</div>
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
