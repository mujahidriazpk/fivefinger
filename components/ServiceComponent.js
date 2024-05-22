// components/ServiceComponent.js

import { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'http://144.217.79.28/~fivefingerdiscou/graphql';
const graphQLClient = new GraphQLClient(endpoint);

const GET_SERVICE_BY_TITLE = gql`
  query GetServiceByTitle($title: String!) {
    services(where: { title: $title }) {
      nodes {
        id
        title
        content
      }
    }
  }
`;

const ServiceComponent = ({ title }) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await graphQLClient.request(GET_SERVICE_BY_TITLE, { title });
        setService(data.services.nodes.length > 0 ? data.services.nodes[0] : null);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [title]);

  if (loading) return <div>Loading...</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <div>
      <h1>{service.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: service.content }} />
    </div>
  );
};

export default ServiceComponent;
