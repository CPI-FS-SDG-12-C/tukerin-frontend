// BreadcrumbComponent.jsx

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function BreadcrumbComponent() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    // Mendapatkan segmen path dari URL
    const pathSegments = location.pathname.split("/").filter((segment) => segment !== "");
    // Membangun breadcrumb
    const breadcrumbElements = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const isCurrentPage = index === pathSegments.length - 1;
      return (
        <BreadcrumbItem key={index} isCurrentPage={index === pathSegments.length - 1} mb={3}>
          <BreadcrumbLink
            as={Link}
            to={path}
            color={isCurrentPage ? "orange" : "black"} // Warna orange untuk yang aktif, warna lain untuk yang non-aktif
          >
            {segment}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    });

    setBreadcrumbs(breadcrumbElements);
  }, [location]);

  return <Breadcrumb>{breadcrumbs}</Breadcrumb>;
}

export default BreadcrumbComponent;
