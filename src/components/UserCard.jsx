import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const UserCard = ({ userCount }) => {
  return (
    <Card className="flex-[0.40]">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          User
        </Typography>
        <Typography variant="h1" className="text-center">
          {userCount}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default UserCard;
