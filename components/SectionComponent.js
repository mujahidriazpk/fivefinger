// components/SectionComponent.js

import { useState, useEffect } from 'react';
import Image from "next/image";
import { GraphQLClient, gql } from 'graphql-request';
import Container from "../components/container";

const endpoint = 'http://144.217.79.28/~fivefingerdiscou/graphql';
const graphQLClient = new GraphQLClient(endpoint);

const GET_SECTION_BY_TITLE = gql`
  query GetSectionByTitle($title: String!) {
    sections(where: { title: $title }) {
      nodes {
        id
        title
        content
        sectionsFields{
            layout
            hasBackgroundImage
            mainImage
        }
      }
    }
  }
`;

const SectionComponent = ({ title }) => {
    const [section, setSection] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSection = async () => {
            try {
                const data = await graphQLClient.request(GET_SECTION_BY_TITLE, { title });
                setSection(data.sections.nodes.length > 0 ? data.sections.nodes[0] : null);
            } catch (error) {
                console.error("Error fetching section:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSection();
    }, [title]);

    if (loading) return <div>Loading...</div>;
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
                        loading="eager"
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
