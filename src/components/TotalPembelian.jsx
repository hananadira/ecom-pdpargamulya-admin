// TotalPembelian.jsx
import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const TotalPembelianCard = ({ totalPembelian }) => {
  return (
    <Card className="flex-1 mr-4">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Total Pembelian
        </Typography>
        <Typography variant="h1">IDR {totalPembelian.toLocaleString()}</Typography>
        <Typography variant="h6">
          <span color="green">+ IDR 2M</span> last mount
        </Typography>
      </CardBody>
    </Card>
  );
};

export default TotalPembelianCard;
